import 'whatwg-fetch'

import {getBaseUrl} from './api-config.js'

export function getUsers(){
   return fetch(getBaseUrl() + 'users').then(handleSuccess, handleError)
}

function handleSuccess(serverRes){
   return serverRes.json()
}

function handleError(errorMsg){
   console.log(errorMsg) // eslint-disable-line no-console
}
