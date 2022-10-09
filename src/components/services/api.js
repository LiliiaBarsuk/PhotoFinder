
export function fetchData(url) {
   return fetch(url)
          .then(response =>  response.json()).then(data => data.hits)
       
                        
}

