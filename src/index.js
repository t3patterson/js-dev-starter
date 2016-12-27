import './index.css';

import numeral from 'numeral';
import {getUsers} from './api/api-user.js'

const courseValue = numeral(1000).format('$0,0.00');
console.log(`I would pay ${courseValue} for this awesome course!`) // eslint-disable-line no-console


let tableHTML = function(data){
   console.log(data)
   return `
      <table>
         <thead>
            <tr>
               <th>&nbsp;</th>
               <th>Id</th>
               <th>First</th>
               <th>Last</th>
               <th>Email</th>

            </tr>
         </thead>
         <tbody>
               ${data.map((userRecord)=>{
                  return `
                  <tr>
                     <td>&nbsp;</td>
                     <td>${userRecord.id}</td>
                     <td>${userRecord.firstName}</td>
                     <td>${userRecord.lastName}</td>
                     <td>${userRecord.email}</td>
                  </tr>
                  `
               }).join('')}
            </tr>
         </tbody>
      </table>
   `
}

getUsers().then(function(data){
   let userList = data
   global.document.getElementById('table').innerHTML =  tableHTML(userList)
})
