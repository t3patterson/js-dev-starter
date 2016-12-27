let apiConfig = {
   productionBaseUrl: "/",
   developmentBaseUrl: "http://localhost:4000/"
}

export function getBaseUrl(){
   let inDevEnvironment = window.location.hostname === 'localhost'
   return inDevEnvironment ? apiConfig.developmentBaseUrl : apiConfig.productionBaseUrl
}
