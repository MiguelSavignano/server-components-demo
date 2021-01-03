/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, useContext, unstable_useTransition} from 'react';

export const ServerContext = createContext();

export function useServerContext() {
  const [startStateTransition, isWaiting] = unstable_useTransition(false);
  const [remoteState, setRemoteStateOriginal] = useContext(ServerContext)
  const setRemoteState = (newState) => startStateTransition(() => setRemoteStateOriginal(newState))

  return [remoteState, setRemoteState, isWaiting, startStateTransition]
}
