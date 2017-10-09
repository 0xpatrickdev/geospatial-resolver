const geolib = require('geolib')
const fs = require('fs')

const startImport = async () => {
  // import the list of places
  const places = require('./places.json');
  console.log(`Sorting ${places.length} places...`)

  // return data in a format that is readable by geolib
  const fPlaces = places.reduce((result, place) => {
    result[place.id] = { latitude: place.geoloc.lat, longitude: place.geoloc.lng } 
    return result
  }, {})

  // order places by distance with geolib
  const results = await geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, fPlaces );
  
  // merge original data with distance results
  const fullResults = await results.map(x => Object.assign(x, places.find(y => y.id == x.key)));
  
  // write the results to json file 
  fs.writeFile('./sample-results.json', JSON.stringify(fullResults, null, '\t'), (err) => {
    if (err) throw err;
  })

  return fullResults
};

startImport()
  .catch(err => console.log('Error while importing data:', err))
  .then((res) => console.log(`Sorted ${res.length} places.`))
  .then(() => console.log(`
View the results here:

  file://${__dirname}/sample-results.json

(cmd + double click file link to open)
  `))