# React Server Components Demo

* [What is this?](#what-is-this)
* [When will I be able to use this?](#when-will-i-be-able-to-use-this)
* [Setup](#setup)
* [DB Setup](#db-setup)
  + [Step 1. Start the Database server](#step-1-start-the-database-server)
  + [Step 2. Create the Database and tables](#step-2-create-the-database-and-tables)
  + [Step 3. Run the seed script](#step-3-run-the-seed-script)
* [Notes about this app](#notes-about-this-app)
  + [Interesting things to try](#interesting-things-to-try)
* [Built by (A-Z)](#built-by-a-z)
* [Code of Conduct](#code-of-conduct)
* [License](#license)

## What is this?

This is a demo app built with Server Components, an experimental React feature. **We strongly recommend [watching our talk introducing Server Components](https://reactjs.org/server-components) before exploring this demo.** The talk includes a walkthrough of the demo code and highlights key points of how Server Components work and what features they provide.

## When will I be able to use this?

Server Components are an experimental feature and **are not ready for adoption**. For now, we recommend experimenting w Server Components via this demo app. **Use this in your own projects at your own risk.**

## Setup

You will need to have nodejs >=14.9.0 in order to run this demo. [Node 14 LTS](https://nodejs.org/en/about/releases/) is a good choice!

  ```
  npm install
  npm start
  ```

(Or `npm run start:prod` for a production build.)

Then open http://localhost:4000.

The app won't work until you set up the database, as described below.

## DB Setup

This demo uses Postgres. If you don't have Postgres already installed, you can use docker-compose.

Alternatively you can check out this [fork](https://github.com/pomber/server-components-demo/) which will let you run the demo app without needing a database. However you won't be able to execute SQL queries, but fetch should still work.


### Step 1. Start the Database server

Start the Postgres server with notesadmin user.

```
docker-compose up -d
```
**Note**: To stop the postgres server use `docker-compose down` or clear all data with `docker-compose down -v`



### Step 2. Create the Database and tables

```
docker-compose exec postgresql psql -d postgres -U notesadmin -f database-setup.sql
```

### Step 3. Run the seed script

Finally, run `npm run seed` to populate some data.

And you're done!

## Notes about this app

The demo is a note taking app called **React Notes**. It consists of a few major parts:

- It uses a Webpack plugin (not defined in this repo) that allows us to only include client components in build artifacts
- An Express server that:
  - Serves API endpoints used in the app
  - Renders Server Components into a special format that we can read on the client
- A React app containing Server and Client components used to build React Notes

This demo is built on top of our Webpack plugin, but this is not how we envision using Server Components when they are stable. They are intended to be used in a framework that supports server rendering — for example, in Next.js. This is an early demo -- the real integration will be developed in the coming months. Learn more in the [announcement post](https://reactjs.org/server-components).

### Interesting things to try

- Expand note(s) by hovering over the note in the sidebar, and clicking the expand/collapse toggle. Next create or delete a note. What happens to the expanded notes?
- Change a note's title while editing, and notice how editing an existing item animates in the sidebar. What happens if you edit a note in the middle of the list?
- Search for any title. With the search text still in the search input, create a new note with a title matching the search text. What happens?
- Search while on Slow 3G, observe the inline loading indicator.
- Switch between two notes back and forth. Observe we don't send new responses next time we switch them again.
- Uncomment the `fetch('http://localhost:4000/sleep/....')` calls in `NoteServer.js` and/or `NoteList.server.js` to introduce an artificial delay and trigger Suspense.

## Built by (A-Z)

- [Andrew Clark](https://twitter.com/acdlite)
- [Dan Abramov](https://twitter.com/dan_abramov)
- [Joe Savona](https://twitter.com/en_JS)
- [Lauren Tan](https://twitter.com/sugarpirate_)
- [Sebastian Markbåge](https://twitter.com/sebmarkbage)
- [Tate Strickland](http://www.tatestrickland.com/) (Design)

## [Code of Conduct](https://engineering.fb.com/codeofconduct/)
Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://engineering.fb.com/codeofconduct/) so that you can understand what actions will and will not be tolerated.

## License
This demo is MIT licensed.
