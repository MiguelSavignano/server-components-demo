/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_createRoot} from 'react-dom';
import {useState, useEffect, Suspense} from 'react';
import {unstable_getCacheForType, unstable_useCacheRefresh} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {createFromFetch} from 'react-server-dom-webpack';
// import {processBinaryChunkFromResponse} from './react-server-dom-webpack';
function createResponseCache() {
  return new Map();
}

export function useCreateFromFetch(key, fetchRequest) {
  const cache = unstable_getCacheForType(createResponseCache);
  let response = cache.get(key);
  if (response) return response;

  response = createFromFetch(fetchRequest);
  cache.set(key, response);
  return response;
}

function Root({initialCache}) {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ErrorBoundary FallbackComponent={Error}>
        <Content2 />
      </ErrorBoundary>
    </Suspense>
  );
}

function Content() {
  const [location, setLocation] = useState({searchText: ''});
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/react?location=${encodeURIComponent(JSON.stringify(location))}`
      );
      const reactTree = await processBinaryChunkFromResponse(response.body);
      setResponse(reactTree);
    }

    fetchData();
  }, []);

  return response;
}

function Content2() {
  const [location, setLocation] = useState({searchText: ''});
  const key = JSON.stringify(location);
  const response = useCreateFromFetch(key, fetch('/react?location=' + encodeURIComponent(key)))
  // const response = createFromFetch(
      // fetch(`/react?location=${encodeURIComponent(JSON.stringify(location))}`)
    // );

  return response.readRoot();
}

function Error({error}) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
    </div>
  );
}

const initialCache = new Map();
const root = unstable_createRoot(document.getElementById('root'));
root.render(<Root initialCache={initialCache} />);
