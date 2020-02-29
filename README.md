# rpi.web.api

## A simple web api starting point for raspberry iot related projects

### The project use [zeit/micro](https://github.com/zeit/micro) for the http server and [fs-router](https://github.com/jesseditson/fs-router), see related documentations for more information

## Default routes:

- `/echo` can be used for testing purposes. It returns

```
{
  "params": {}, // body params from the call
  "query": {} // querystring from the call
}
```

- `/ping` can be used for healthcheck. It returns

```
{
  "date": {
    "time": 1582975572828, // milliseconds since Unix Epoch (UTC)
    "readable": "Sat, 29 Feb 2020 11:26:12 GMT" // UTC date
  }
}
```

## Additional routes

More routes can be added to the `/routes` directory.  
See [fs-router](https://github.com/jesseditson/fs-router) for more informations
