/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, useContext} from 'react';

export const ServerContext = createContext();

export function useServerContext() {
  return useContext(ServerContext);
}
