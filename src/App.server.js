/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense} from 'react';
import NoteList from './NoteList.server';

export default function App({selectedId, isEditing, searchText}) {
  return (
    <div className="main">
      <section key={selectedId} className="col note-viewer">
          <Suspense fallback={null}>
            <NoteList searchText={searchText} />
          </Suspense>
      </section>
    </div>
  );
}
