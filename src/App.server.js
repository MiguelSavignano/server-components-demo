/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense} from 'react';

import {Pool} from 'react-pg';
import credentials from '../credentials.json';

export const db = new Pool(credentials);

export default function App({selectedId, isEditing, searchText}) {
  console.log("First App.server ")
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

function NoteList({searchText}) {
  const notes = db.query(
    `select * from notes where title ilike $1 order by id desc`,
    ['%' + searchText + '%']
  ).rows;

  if (notes.length < 0)  return null

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          {note.title}
        </li>
      ))}
    </ul>
  )
}
