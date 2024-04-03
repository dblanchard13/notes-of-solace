# Notes of Solace

## Setup

### Setting up the codebase

1. Clone the repository:

```bash
git clone https://github.com/dblanchard13/notes-of-solace
```

2. Navigate to the project directory:

```bash
cd notes-of-solace
```

3. Install the dependencies:

```bash
npm install
```

### Setting up the PostgreSQL Database

You can either setup postgres locally or you can use a hosted solution. I personally run it locally since I find it to be the most straightforward. Feel free to go with whatever works best for you, just make sure to grab the `DATABASE_URL`.

#### Local installation

1. If you don't yet have it installed locally, then head on over here: https://www.postgresql.org/download/macosx/ and come back once you've got it installed (I'm assuming you're on a mac 🐒 -- if not you can head to https://www.postgresql.org/download/ and select the appropriate OS)

2. If you have postgres installed locally you can create a new db with the following command:

```bash
createdb <DB_NAME>
```

3. Now you'll want to build your `DATABASE_URL` which is in the format of: `postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]`

Note:

- `PORT` defaults to `5432`
- `PASSWORD` is an empty string for local installs unless you explicitly specified one.
- `USER` can be found by connecting to your db with `psql <DB_NAME>` and then running `\du` will show you all available users. Your user will likely be whatever your username is for your laptop though it may also be `postgres` depending on how you installed things.

### Setting up your environment

1. Create a `.env` file in the root directory of the project. You'll want it to mirror the what's in `.env.example` so you can just run:

```bash
cp .env.example .env
```

2. Add/update the following line to the `.env` file, replacing `postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]` with your PostgreSQL `DATABASE_URL`:

```bash
DATABASE_URL=postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
```

### Running the project for development

```bash
npm run dev
```

### Running tests

```bash
npm run test
```

## Assumptions & Next Steps

### Assumptions

- The assignment mentioned an app that would be able to allow a user to 'index' notes. I originally took this to mean that I should make the notes easily/efficiently searchable/sortable by having an index on the columns that the user my search/sort on. While re-reading the requirement I realized that it could also mean allowing the user to set the order of their notes (via drag and drop or some other functionality), but I decided not to implement that for this iteration.

### Next Steps

- Real authentication. For this version I went with a simple approach of storing a generated userId in localStorage, but to make this a production ready product that would need to become something more durable and secure.

- More exhaustive tests. I added a simple test to show what that setuyp would look like, but in reality that folder of tests should be much more thorough & wide-reaching.

- Patient association. Be able to associate notes with specific clients so that an Advocate can easily see all of their notes for each of their individual clients.

- Tagging. Allow advocates to add `#tags` anywhere within the content of their notes that will automatically tie that note to all other notes that share the same tag

- Rich text editor. I assume Advocates would like the ability to add more expressive formatting to their notes (bold, strikethrough, bullet points, etc.).

- Version history. Be able to see past versions of note just in case an Advocate accidentally saves changes that they don't want.
