const geolib = require('geolib')

const startImport = async () => {
  // import the list of places
  const places = require('./places.json');
  console.log(`Sorting ${places.length} places...`)

  // create an object that is accepted by geolib
  const fPlaces = await places.map((d,i) => {
    let o = {};
    o.latitude = d.geoloc.lat;
    o.longitude = d.geoloc.lng;
    let p = {};
    let id = d.id
    p[id] = o
    return p
  })
  // flatten the array to an object
  let merged = Object.assign(...fPlaces)

  // order places by distance with geolib
  const results = await geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, merged );
  
  // merge original data with distance results
  const fullResults = await results.map(x => Object.assign(x, places.find(y => y.id == x.key)));
  
  return fullResults
};

startImport()
  .catch(err => console.log('Error while importing data:', err))
  .then(res => console.log('Results:', res))