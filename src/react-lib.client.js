import {createFromFetch} from 'react-server-dom-webpack';
import {createContext, useContext, unstable_useTransition, unstable_getCacheForType } from 'react';

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

export const ServerContext = createContext();

export function useServerContext() {
  const [startStateTransition, isWaiting] = unstable_useTransition(false);
  const [remoteState, setRemoteStateOriginal] = useContext(ServerContext)
  const setRemoteState = (newState) => startStateTransition(() => setRemoteStateOriginal(newState))

  return [remoteState, setRemoteState, isWaiting, startStateTransition]
}
