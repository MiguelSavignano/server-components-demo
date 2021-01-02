/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_getCacheForType, unstable_useCacheRefresh} from 'react';
import {createFromFetch} from 'react-server-dom-webpack';

function createResponseCache() {
  return new Map();
}

export function useRefresh() {
  const refreshCache = unstable_useCacheRefresh();
  return function refresh(key, seededResponse) {
    refreshCache(createResponseCache, new Map([[key, seededResponse]]));
  };
}

export function useServerResponse(location) {
  const key = JSON.stringify(location);
  const cache = unstable_getCacheForType(createResponseCache);
  let response = cache.get(key);
  if (response) {
    return response;
  }
  response = createFromFetch(
    fetch('/react?location=' + encodeURIComponent(key))
  );
  console.log({response})
  cache.set(key, response);
  return response;
}


// fetch("http://localhost:4000/react?location=%7B%22selectedId%22%3Anull%2C%22isEditing%22%3Afalse%2C%22searchText%22%3A%22%22%7D", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "es-ES,es;q=0.9,en;q=0.8,it-IT;q=0.7,it;q=0.6",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "http://localhost:4000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// }).then(r => r.text().then(console.log))
