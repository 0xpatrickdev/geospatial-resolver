# Geospatial Resolver  🌎

A geospatial resolver function for Graphcool.

## About

Uses the popular [geolib](https://github.com/manuelbieh/geolib) to sort a collection of places by distance.


## Example Usage

```graphql
query {
  # replace __LNG__ and __LNG__
  # with something like 51.515 and 7.453619
  placesByDistance(lat: "__LAT__", lng: "__LNG__") {
    token
  }
}
```

## Credits

This module was made by [@pcooney10](https://github.com/pcooney10)