/* eslint-disable no-console */

var exec = require('child_process').exec;
var path = require('path');

var chalk = require('chalk');
var fs = require('fs');


function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);
    stdin.once('data', function (data) {
        let urlPattern = new RegExp(/^[a-zA-Z0-9\-]+$/)
        let userInput = data.toString().trim()
        console.log( urlPattern.test(userInput) )
        if( urlPattern.test(userInput) ){
           callback(userInput);
        } else {
           console.log(chalk.red.bold.underline(data) + chalk.red(' - is not a valid surge url-name'))
           process.exit()
        }
    });
}

function writeCnameFile(){
   prompt('What is your site subdomain? > ', function(userInput){
      let fullSiteName = `${userInput}.surge.sh`
      console.log(chalk.cyan(`site will be: ${fullSiteName}`));
      fs.writeFileSync(`${__dirname}/../dist/CNAME`, fullSiteName ,'utf8')
      deployToSurge()

   })
}

function deployToSurge(){
   exec('surge ./dist', function(error, stdout, stderr){
      if(stdout)console.log(`${stdout}`)
      if(stderr)console.log(`${stderr}`)
   })
   process.exit()
}


if (!fs.existsSync(`${__dirname}/../dist/CNAME`)) {
  writeCnameFile()
} else {
  deployToSurge()
}
