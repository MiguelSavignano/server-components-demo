import {createFromFetch} from 'react-server-dom-webpack';
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

import {createContext, useContext, unstable_useTransition} from 'react';

export const ServerContext = createContext();

export function useServerContext() {
  const [startStateTransition, isWaiting] = unstable_useTransition(false);
  const [remoteState, setRemoteStateOriginal] = useContext(ServerContext)
  const setRemoteState = (newState) => startStateTransition(() => setRemoteStateOriginal(newState))

  return [remoteState, setRemoteState, isWaiting, startStateTransition]
}
