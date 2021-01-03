/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Pool} from 'react-pg';
import {fetch} from 'react-fetch';
import credentials from '../credentials.json';
import {SearchField} from './SearchField.client';
import { titlesWithRating } from './movies-service.server';

export const db = new Pool(credentials);

export default function App({searchText}) {
  return (
    <div className="main">
      <section className="col note-viewer">
        <SearchField />
        <NoteList searchText={searchText} />
        <MoviesList />
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

function MoviesList() {
  const {cartelera} = fetch(
    'https://www.cinesa.es/Cines/Horarios/196/28000.json',
    {insecureHTTPParser: true}
  ).json();
  const movies = cartelera[0].peliculas.map(it => ({title: it.titulo}))
  // const movies = titlesWithRating()

  return (
    <div>
      <ul className="notes-list">
        { movies.map((movie) => (
          <li key={movie.title}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
