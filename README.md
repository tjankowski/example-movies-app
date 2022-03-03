## Summary

Example project of movie app using React.
Demo allows user to browse through list of movies, see details about movie and like or dislike it.
This demo doesn't cover all edge cases but it gives quite good overview of code structure for React project.

[Live version](https://example-movies-app.vercel.app/)

### Decisions

- I decided to use React hooks to encapsulate logic instead of Redux or other state management library because project is really small and it creates similar layer to separate concerns.
- For the same reason I decide to use `fetch` function instead of `axios` library or any other to fetch data.

### Project structure:

- `/application` - contains main application logic and connects all domain specific components to create one application
- `/application/pages` - contains components that handles logic in specific part of application
- `/domain` - contains different domain specific (movies, authentication) parts of application, for bigger application this could be a good part to extract to separate package
- `/domain/<name>/api` - contains logic to fetch data from API for specific domain
- `/domain/<name>/hooks` - directory for React hooks that are responsible for data fetching or other domain logic for components
- `/domain/<name>/ui` - directory for stateles UI compoents specific for domain
- `/infrastructure`- contains tooling that is used across whole application
- `/ui` - directory for stateles reusable and more generic UI compoents
- `/utils`- helper functions used across application

3rd party libraries used for project:

- `tailwind` - to style UI
- `jest` - for unit testing

### To improve:

Here are things that I didn't manage to complete because of the limited time

- add more unit tests - I created example unit test for almost every type of component or function
- add integration tests with API
- handle errors from API, wrap code into try/catch and create common structure for errors
- move configuration to environment variables
- animations between views
- maybe use infinite scroll instead of paging
- API doesn't provide information if user already liked/disliked movie so it creates some kind of inconsistency in UX

## Usage

### `Setup`

Requirements to run:

- one of latest NodeJS versions - created using `16.14.0`
- `yarn` download dependecies and run scripts

### Quick start

1. Install dependecies using `yarn` command
2. Run in development mode using start script `yarn start` or `npm run start`

### Commands

```
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
yarn test
```

Launches the test runner.<br />

```
yarn build
```

Builds the application for production usage.
