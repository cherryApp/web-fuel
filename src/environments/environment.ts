// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Kapcsolati beállítsok a távoli firebase adatbázishoz.
  FirebaseSettings: {
    apiKey: "AIzaSyAKddTzM8ZzIIdzngqEk59pq7U-_IciQ5g",
    authDomain: "webfuel-dadff.firebaseapp.com",
    databaseURL: "https://webfuel-dadff.firebaseio.com",
    projectId: "webfuel-dadff",
    storageBucket: "webfuel-dadff.appspot.com",
    messagingSenderId: "79761320529"
  }
};
