# NestJS + Firebase Auth Template

NestJS backend API auth template using [Firebase Authentication](https://firebase.google.com/docs/auth).

Can be combined with the frontend [Next.js + Firebase Auth](https://github.com/alexp3y/next-auth-template) template for fullstack auth.

## Installation

```bash
npm install
```

## Usage

A Firebase project must be created and connected to the app using the [Firebase Admin SDK](https://firebase.google.com/docs/auth/admin/).

To configure the connection, download a private key for your project from the Firebase console (Project Settings -> Service Accounts -> "Generate new private key") and add the JSON key file here:
`src/auth/strategies/service-account-key.json`

This project is set-up to utilize [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) during local development.

Ensure that the Firebase Admin SDK is connected to the Authentication emulator by setting the environment variable `FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099` as mentioned [here](https://firebase.google.com/docs/emulator-suite/connect_auth#admin_sdks).

Run NestJS locally:

```bash
npm run start:debug
```

Start Auth Emulator (requires [Firebase CLI](https://firebase.google.com/docs/cli)):

```bash
firebase emulators:start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
