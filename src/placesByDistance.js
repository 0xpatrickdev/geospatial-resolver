const geolib = require('geolib')
const fromEvent = require('graphcool-lib').fromEvent

function getPlaces(api, limit) {
  return api.request(`
    query{
      allPlaces{
        id
        name
        geoloc
        location {
          id
          lat
          lng
        }
      }
    }`)
    .then(placesQueryResult => {
      console.log(placesQueryResult)
      return placesQueryResult.allPlaces
    })
    .catch(error => {
      console.log(error)
      return { error: `An unexpected error occured` }
    })
}

module.exports = function (event) {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return { error: 'Email Authentication not configured correctly.'}
  }

  const limit = event.data.limit
  const lat = event.data.lat
  const lng = event.data.lng
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getPlaces(api, limit)
    .then(allPlaces => {
      if (!allPlaces) {
        return { error: `There are no places in the database.` }
      }
      const formatted = allPlaces.map((d,i) => {
        let o = {};
        o.latitude = d.geoloc.lat;
        o.longitude = d.geoloc.lng;
        let p = {};
        let id = d.id;
        p[id] = o;
        return p 
      })
      return formatted
    })
  	.then(formatted => {
      console.log("FORMATTED", formatted)
    	return Object.assign(...formatted)
  	})
    .then(flattened => {
      return geolib.orderByDistance({lat: lat, lng: lng}, flattened)
  	})
    .then(ordered => {
      const geoResults = ordered.map(x => Object.assign(x, allPlaces.find(y => y.id == x.key)));
    	return { data: { geoResults } }
  	})
    .catch(error => {
      console.log(error)
      return { error: `An unexpected error occured` }
    })
}