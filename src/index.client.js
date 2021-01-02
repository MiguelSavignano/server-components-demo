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
import {createFromFetch} from './react-server-dom-webpack';

function Root({initialCache}) {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary FallbackComponent={Error}>
        <Content />
      </ErrorBoundary>
    </Suspense>
  );
}

function Content() {
  const [location, setLocation] = useState({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });
  const cache = unstable_getCacheForType(() => new Map());
  const key = JSON.stringify(location);
  const [response, setResponse] = useState(cache.get(key));

  useEffect(async () => {
    const reactTree = await createFromFetch(fetch('/react?location=' + encodeURIComponent(key)));
    setResponse(reactTree)
  }, []);

  return response ? response.readRoot() : null;
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
