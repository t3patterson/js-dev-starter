/* eslint-disable no-console */

import webpack from 'webpack';
import webpackProdConfig from '../webpack.config.prod.js';
import chalk from 'chalk'


process.env.NODE_ENV = 'production'

console.log(chalk.blue('Generating minified bundle for production. This will take a moment.'))

webpack(webpackProdConfig).run( (err, stats)=> {
   if(err){
      console.log(chalk.red(err));
      return 1;
   }

   const jsonStats = stats.toJson();

   if(jsonStats.hasErrors){
      return jsonStats.errors.map( err => console.log(chalk.red(err)));
   }

   if(jsonStats.hasWarnings){
      return jsonStats.errors.map( warning => console.log(chalk.yellow(warning)));
   }

   console.log(`Build Stats: ${stats}`)

   console.log(chalk.green('You app has been built for production and written to /dist'));

   return 0;
})
