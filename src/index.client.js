/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_createRoot} from 'react-dom';
import {useState, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {ServerContext} from './ServerContext.client';
import {concurrentCreateFromFetch} from './lib';

function ClientApp({initialCache}) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary FallbackComponent={Error}>
        <Content />
      </ErrorBoundary>
    </Suspense>
  );
}

function Content() {
  const [remoteState, setRemoteState] = useState({searchText: ''});
  const key = JSON.stringify(remoteState);
  // only works with Suspense
  const response = concurrentCreateFromFetch(key, fetch('/react?location=' + encodeURIComponent(key)))

  return (
    <ServerContext.Provider value={[remoteState, setRemoteState]}>
      {response.readRoot()}
    </ServerContext.Provider>
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
root.render(<ClientApp initialCache={initialCache} />);
