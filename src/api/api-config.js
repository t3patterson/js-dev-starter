let apiConfig = {
   productionBaseUrl: "/", //e.g.: http://t3-simple-api.herokuapp.com/
   developmentBaseUrl: "http://localhost:4000/"
}

function getQueryStringParamaterByName(name, url){
   if(!url) url = window.location.href
   name = name.replace(/[\][\]]/g, "\\$&");
   let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
   let results = regex.exec(url)
   if(!results) return null
   if(!results[2]) return ''
   return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export function getBaseUrl(){
   return getQueryStringParamaterByName('mockapi') ? apiConfig.developmentBaseUrl : apiConfig.productionBaseUrl
}
