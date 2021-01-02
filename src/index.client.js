/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_createRoot} from 'react-dom';
import {useState, useEffect} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {processBinaryChunkFromResponse} from './react-server-dom-webpack';

function Root({initialCache}) {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Content />
    </ErrorBoundary>
  );
}

function Content() {
  const [location, setLocation] = useState({ searchText: '' });
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
