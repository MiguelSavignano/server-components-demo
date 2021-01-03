import {createFromFetch} from 'react-server-dom-webpack';
import {createContext, useContext, unstable_useTransition, unstable_getCacheForType } from 'react';

function createResponseCache() {
  return new Map();
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
  cache.set(key, response);
  return response;
}


export function concurrentCreateFromFetch(key, fetchRequestFnc) {
  const cache = unstable_getCacheForType(createResponseCache);
  let response = cache.get(key);
  if (response) {
    console.log("CACHE response")
    return response;
  }

  response = createFromFetch(fetchRequestFnc());
  console.log("NO CACHE response")

  cache.set(key, response);
  return response;
}

export const ServerContext = createContext();

export function useServerContext() {
  const [startStateTransition, isWaiting] = unstable_useTransition(false);
  const [remoteState, setRemoteStateOriginal] = useContext(ServerContext)
  const setRemoteState = (newState) => startStateTransition(() => setRemoteStateOriginal(newState))

  return [remoteState, setRemoteState, isWaiting, startStateTransition]
}
