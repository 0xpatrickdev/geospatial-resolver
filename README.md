# Geospatial Resolver  🌎

A geospatial resolver function for Graphcool.

## About

Uses the popular [geolib](https://github.com/manuelbieh/geolib) to sort a collection of places by distance.


## Example Usage

```graphql
query {
  # replace __LNG__ and __LNG__
  placesByDistance(lat: __LAT__, lng: __LNG__) {
    geoResults
  }
}
```
```graphql
{
  placesByDistance(lat: 51.515, lng: 7.453619) {
    geoResults
  }
}
```

## CLI Demo 

```bash
cd cli-example
yarn install 
yarn start
```

## Credits

This module was made by [@pcooney10](https://github.com/pcooney10) with inspiration from the wonderful Grahpcool community.