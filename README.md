##Starter Kit
living, automated, and interactive checklist

+ Package management
+ Bundling
+ Minification
+ Sourcemaps
+ Transpiling
+ Dynamic HTML Generation
+ Centralized HTTP
+ Mock API Framework
+ Development Webserver
+ Linting
+ Automated Testing
+ Continuous Integration
+ Automated Build
+ Automated Deployment
+ Working Example Application



### `.editorconfig`
+ automated consistency

```
root = true

[*]
indent_style = space
indent_size = 3
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
indent_size = 2
```

### package manager: *npm*
- npm allows for build-step (linting, transpiling, minifying)
- npm package manifest: `package.json`
- security vulnerabilities: 
  - `npm install -g nsp` 
  - $: `nsp check`


### dev webserver
- express
- sharring devserver with **localtunnel**
  + `npm install -g localtunnel`
  + $: `lt --port 3000`
- deploying
  + static files: **surge**
    + `npm install -g now`
    + $: `surge`
  + node projects: **now**
    + `npm install -g now`
    + $: `now`
    
    
### automation: *npm*
  + use tools directly
  + no need for separate plugins
  ```
  scripts: {
    "start": "npm-run-all --parallel security-check share open:src",
    "security-check" : "nsp check",
    "share" : "lt --port 3000",
    "open:src" : "node ./build-scripts/src-server.js"
  } 
  ```
  
### transpilation: *babel*
babel, typescript, elm
+ easier to read
+ no waiting for tras 


### bundling: *webpack*
+ commonjs doesn't work in web browsers
+ package project into files
+ improve node perf
+ should use es6 modules (named imports, default exports )
  + statically analyzable
+ webpack
  + bundles css, images, fonts, html
  + bundle splitting 
  + hot module reloading
  + creates source maps

(1)`webpack.config.dev.js`
```
import path from 'path';

export default {
   debug: true,
   devtool: 'inline-source-map',
   noInfo: true,
   entry: [
      path.resolve(__dirname, 'src/index')
   ],
   target: 'web',
   output: {
      path: path.resolve(__dirname, 'src'),
      publicPath: '/',
      filename: 'bundle.js'
   },
   plugins: [],
   module: {
      loaders: [
         {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
         {test: /\.css$/, loaders: ['style', 'css']}
      ]
   }
}
```

### linting: *ESLint*
+ Enforce consistency
  - Curly brace position
  - trailing commas
  - global vars

+ Avoid mistakes
  - adding parens
  - overwriting funcs
  - assignments in conditional
  - missing default case in switch
  - debugger / console.log

JSLint --> JSHint --> ESLint (current standard)

+ Linter decisions
  - config format?
    + package.json v .eslintrc
  - which lint rules?
    + 
  - warnings or errors? 
    + warnings allow continue dev; error breaks the build
  - plugins? 
    + enhance for react/angular/node?
  - use preset instead?
    + recommended-default standard vs. airbnb vs. xo 

####(1) Configuration : `eslint.json`
``` 
{
  "root" : true,
  "extends" : [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions" : {
    "ecmaVersion" : 7,
    "sourceType" : "module"
  },
  "env" : {
    "browser" : true,
    "node" : true,
    "mocha" : true
  },
  "rules" : {
    
  }
}
```

####(2) Watching w/ eslint-watch
in `package.json` scripts:     
```
"lint" : "esw webpack.config.* src buildScripts"
```

### Testing
1. Unit Testing (mocha, jasmine)
  + tests a small unit of code
  + run upon save
2. Integration : (nightwatch)
  + tests units of code that interact (browser interactions, api reqs, etc)
  + run on demand
3. Automated UI : (selenium)

Testing Decisions

| | | |
|-------|-----|-----|
| Testing framework | **mocha** |  
| Assertion Library | **chai** |
| Browser Library | **Karma** |    
| DOM simulation Library | **jsDOM**| 
| Headless Browser Library | **PhantomJS**| 
| Testing engine | **node** |  


Recommended
- Write tests in same files as source-code
- Unit tests should be automated on save

#### Continuous Integration
CI Server Options: 
+ Travis (linux, hosted)
+ Jenkins (linux, local)
+ Appveyor (windows)

Why?

- Run automated build
- Run your tests
- Check code coverage
- Automate deployment

#### (1)Configure `.travis.yml` 
```
language: node_js
node_js: 
  - "6"
```

### HTTP Calls
- Node : http, request
- Browser : XMLHttpRequest, jQuery, Fetch
- Node + Browser : isomorphic-fetch,  xhr, Axios

####Centralizing API Calls
- Configure all calls
- Handle preloader logic
- Handle errors
- Single seam for mocking

### Mock HTTP for Fake Data
####Why Fake Data?
  - empty lists
  - long lists
  - long values
  - testing
  - filtering
  - sorting

#### Fake Data Schema
  - JSON Schema faker (jsf)

#### Fake Values
  - faker.js

#### (real) Fake Server
  - json-server

##### in `mock-data-schema.js`
```
  export const schema = {
  	"type": "object",
  	"properties": {
  		"users" : {
  			"type" : "array",
  			"minItems" : 3,
  			"maxItems" : 5,
  			"items": {
  				"type" : "object",
  				"properties" : {
  					"id" : {"type": "number", "unique" : true , "minimum" : 1 },
  					"firstName" : {"type": "string", "faker" : "name.firstName" },
  					"lastName" : {"type": "string", "faker" : "name.lastName" },
  					"email" : {"type": "string", "faker" : "internet.email" },
  				}
  			}
  		},
  		required: ['id', 'firstName', 'lastName', 'email']
  	},
  	required: ['users']
  }
  ```


##### in `mock-data-generate-data.js` 

```
import fs from 'fs';
import chalk from 'chalk';
import jsf from 'json-schema-faker';
import {schema} from './mock-data-schema.js';

const jsonStr = JSON.stringify( jsf(schema) )


/* eslint-disable no-console */

fs.writeFile("./src/api/db.json", jsonStr, function(err){
   if(err){
      return console.log(chalk.red(err))
   } else {
      console.log(chalk.green("√ Mock data generated"))
   }
})
```

##### in the scripts of `package.json`
```
...
"generate-mock-data" : "babel-node /path/to/mock-data-generate-data.js",
"json-server" : "json-server --watch /path/to/api/db.json --port 4000"
...
```

##### create `apiConfig` to point to server-json in dev environment
```
let apiConfig = {
   productionBaseUrl: "/",
   developmentBaseUrl: "http://localhost:4000"
}

export function getBaseURL(){
   let inDevEnvironment = window.location.hostname === 'localhost'
   return inDevEnvironment ? apiConfig.developmentBaseUrl : apiConfig.productionBaseUrl
}
```

### The Demo App
Contains Examples of :
+ Directory structure + filenaming
+ Framework usage
+ Testing
+ Mock API
+ Automated deployment 
+ Reflects coding standards
+ Interactive example of working with starter-kit

#### Tips
- put js in a `.js` file (never `<script>`)
- organize by feature, not file-type
- extract logic to javascript objects

### Minification
- speed page loads by removing comments, newlines, whitespace, shortening function/var names
- occasionally dead code elimination


### Production Server
+ create `dist-server.js`
  - eliminate webpack setup
  - add `compression()` middleware to gzip
    - `app.use( compression() )`
  - serve static files from `/dist`
    - `app.use( express.static('/dist') )`

+ configure `wepback.config.prod.js`
  ```
   ...
   devtool: 'source-map',
   plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
   ]
  ...
  ```

+ create `build.js`
  ```
  import webpack from 'webpack';
  import webpackProdConfig from '../webpack.config.prod.js';
  import chalk from 'chalk'


  process.env.NODE_ENV = 'production'

  console.log(chalk.blue('Generating minified bundle for production. This will take a moment.'))

  webpack(webpackProdConfig).run( (err)=> {
     if(err){
        console.log(chalk.red(err))
        return 1;
     }

     console.log(chalk.green('You app has been built for production and written to /dist'))

     return 0;
  })

  ``` 

### Dynamic HTML
+ in `webpack.config.prod.js` and `webpack.config.dev.js`
```
  import HtmlWebpackPlugin from 'html-webpack-plugin'
  ...
  plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true,
        minify: {
           removeComments: true,
           collapseWhitespace: true
        }
     })
  ...
  ]
```

### Bundle Splitting
+ in `src`, create `vendor.js` and list vendor libs
```
import fetch from 'whatwg-fetch';
import react from 'react';
...

``` 

+ in `webpack.config.dev.js`
```
  entry: {
     main: path.resolve(__dirname, 'src/index'),
     vendor: path.resolve(__dirname, 'src/vendor'),
  },
  ...
  output: {
     path: path.resolve(__dirname, 'dist'),
     publicPath: '/',
     filename: '[name].js'
  },
 ...
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor' // syncs with entry: 'vendor' prop-name
      })
  ]
```

### Cache Busting
- create a hash as a filename that changes when the code changes. this tells the browser to update the cache
.

- in `webpack.config.prod.js`

```
  import WebpackMd5Hash from 'html-md5-hash'

  ...
  output: {
     path: path.resolve(__dirname, 'dist'),
     publicPath: '/',
     filename: '[name].[chunkhash].js'
  },
  ...
  plugins: [
    new WebpackMd5Hash()
  ]
```
### Extract + Minify CSS
  ```
  import ExtractTextPlugin from 'extract-text-webpack-plugin';

  ...
  plugins[
    ...
    new ExtractTextPlugin('[name].[contenthash].css')

  ]
  ...
  module: {
    loaders: [
       ...
       {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }   
  ```

### Production Error Logging
- Examples: TrackJS, Sentry, New Relic, Raygun
- Considerations:
  + Browser
  + Stack Traces
  + Previous Actions
  + Custom API for enhanced tracking
  + Notifications
  + Integrations



### Production Error Logging
- Examples: TrackJS, Sentry, New Relic, Raygun
- Considerations:
  + Browser
  + Stack Traces
  + Previous Actions
  + Custom API for enhanced tracking
  + Notifications
  + Integrations
