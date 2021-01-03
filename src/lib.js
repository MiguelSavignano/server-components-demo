import {createFromFetch} from 'react-server-dom-webpack';
// import {processBinaryChunkFromResponse} from './react-server-dom-webpack';
import {unstable_getCacheForType } from 'react';

function createResponseCache() {
  return new Map();
}

export function concurrentCreateFromFetch(key, fetchRequest) {
  const cache = unstable_getCacheForType(createResponseCache);
  let response = cache.get(key);
  if (response) return response;

  response = createFromFetch(fetchRequest);
  cache.set(key, response);
  return response;
}

// function Content() {
//   const [location, setLocation] = useState({searchText: ''});
//   const [response, setResponse] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(
//         `/react?location=${encodeURIComponent(JSON.stringify(location))}`
//       );
//       const reactTree = await processBinaryChunkFromResponse(response.body);
//       setResponse(reactTree);
//     }

//     fetchData();
//   }, []);

//   return response;
// }
