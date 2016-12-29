import 'whatwg-fetch'

import {getBaseUrl} from './api-config.js'

export function getUsers(){
   return fetch(getBaseUrl() + 'users').then(handleSuccess, handleError)
}

export function deleteUser(id){
   const request = new Request(getBaseUrl() + 'users/' + id, {method: 'DELETE'});
   return fetch(request).then(handleSuccess, handleError)
}

function handleSuccess(serverRes){
   return serverRes.json()
}

function handleError(errorMsg){
   console.log(errorMsg) // eslint-disable-line no-console
}
