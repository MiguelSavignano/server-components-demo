/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState} from 'react';
import {useServerContext} from './ServerContext.client';

export function SearchField() {
  const [text, setText] = useState('');
  const [remoteState, setRemoteState] = useServerContext();

  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        value={text}
        onChange={(e) => {
          const newText = e.target.value;
          setText(newText);
          setRemoteState({
            ...remoteState,
            searchText: newText,
          });
        }}
      />
    </form>
  );
}
