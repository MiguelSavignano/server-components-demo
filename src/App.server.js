/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Pool} from 'react-pg';
import credentials from '../credentials.json';
import {Button} from './SearchField.client';

export const db = new Pool(credentials);

export default function App({searchText}) {
  return (
    <div className="main">
      <Button>Button</Button>
      <section className="col note-viewer">
        <NoteList searchText={searchText} />
      </section>
    </div>
  );
}

function NoteList({searchText}) {
  const notes = db.query(
    `select * from notes where title ilike $1 order by id desc`,
    ['%' + searchText + '%']
  ).rows;

  if (notes.length < 0) return null;

  return (
    <div>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
