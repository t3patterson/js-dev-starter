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
