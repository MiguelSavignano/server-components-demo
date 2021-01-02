/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_createRoot} from 'react-dom';
import {useState, Suspense, useEffect} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {unstable_getCacheForType, unstable_useCacheRefresh} from 'react';
import {createFromFetch} from 'react-server-dom-webpack';
import {createContext, useContext} from 'react';

import {useServerResponse} from './Cache.client';

export const LocationContext = createContext();
export function useLocation() {
  return useContext(LocationContext);
}


function Root({initialCache}) {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary FallbackComponent={Error}>
        <Content />
        {/* <Content2 /> */}
      </ErrorBoundary>
    </Suspense>
  );
}

function Content2() {
  const [location, setLocation] = useState({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });

  const cache = unstable_getCacheForType(() => new Map());
  const key = JSON.stringify(location);
  const [response, setResponse] = useState(cache.get(key));

  useEffect(() => {
    const response = createFromFetch(fetch('/react?location=' + encodeURIComponent(key)).then((r) =>
      r.text()
    ))
    console.log({ response });
    cache.set(key, response);
      setResponse(response);
  }, []);

  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {console.log("HELLO", response && response.readRoot())}
      {response ? response.readRoot() : null}
    </LocationContext.Provider>
  );
}
function Content() {
  const [location, setLocation] = useState({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });
  const response = useServerResponse(location);
  console.log({
    data: response.readRoot()
  })
  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {response.readRoot()}
    </LocationContext.Provider>
  );
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
