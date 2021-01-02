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
import {unstable_getCacheForType} from 'react';
import {processBinaryChunkFromResponse} from './react-server-dom-webpack';

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
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        '/react?location=' + encodeURIComponent(key)
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

// `J0:["$","div",null,{"className":"main","children":["$","section","null",{"className":"col note-viewer","children":"@1"}]}]
// J1:["$","ul",null,{"className":"notes-list","children":[["$","li","4",{"children":"Make a thing"}],["$","li","3",{"children":"A note with a very long title because sometimes you need more words"}],["$","li","2",{"children":"I wrote this note today"}],["$","li","1",{"children":"Meeting Notes"}]]}]`
