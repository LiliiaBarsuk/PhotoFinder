
   
export function fetchData(name, page, key) {
   const URL = `https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=15`;
   return fetch(URL)
          .then(response =>  response.json()).then(data => data.hits)
       
                        
}

