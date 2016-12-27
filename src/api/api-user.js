import 'whatwg-fetch'

export function getUsers(){
   return fetch('users').then(handleSuccess, handleError)
}

function handleSuccess(serverRes){
   return serverRes.json()
}

function handleError(errorMsg){
   console.log(errorMsg) // eslint-disable-line no-console
}
