---
title: "Firebase Auth with React Hooks in Typescript"
description: "Overview for a simple react project setup using Typescript, functional components, hooks and Firebase"
publishDate: "August 12 2021"
author: "@bmpickford"
heroImage: "/assets/blog/firebase_react.webp"
alt: "Firebase plus React"
layout: "../../layouts/BlogPost.astro"
tags: ["react", "firebase", "typescript"]
---

### tldr;

Example can be found [here](https://github.com/bmpickford/firebase-auth-example)

### Overview

Firebase is a great provider for hooking up easy and simple authentication to a new or existing project, and can easily be integrated with other features of Google Cloud Platform. Adding it to your application can be simple, but a lot of tutorials don't cater for larger scale applications, and how it could be implemented cleanly and with quality assurance in mind.

### Assumed Knowledge

- Firebase
- Typescript
- React
- React Hooks (specifically useContext)

### Setting Up

#### GCP and Firebase

To start, you'll need to setup a GCP account and login to the Firebase console at https://console.firebase.google.com/. You'll then need to setup a project for us to use in this run through. For this walkthrough, I've named my project "HooksAuth"

I'm then going to enable email/password and Google Authentication by navigating to the "Authentication" page from the left menu and enabling them there

#### App

```bash
npx create-react-app hooksAuth --template typescript
```

#### Setting up the hooks

We are going to abstract our firebase app away through useContext so it's state can be shared through the app, and any abstractions and access can easily be updated and refactored.<br />

Add your config to a newly created file (e.g. `FirebaseProvider.tsx`). This can be retrieved by registering a web app in the firebase console

```typescript
// file: FirebaseProvider.tsx
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "KEY",
  authDomain: "somedomain.firebaseapp.com",
  databaseURL: "https://somedomain.firebaseio.com",
  projectId: "hooksauth-ID_HERE",
  storageBucket: "hooksauth-ID_HERE.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

<br/>Next pull out the values to .env, and add it to your .gitignore

```bash
# file: .env
REACT_APP_API_KEY=KEY
REACT_APP_AUTH_DOMAIN=somedomain.firebaseapp.com
REACT_APP_DB_URL=https://somedomain.firebaseio.com
REACT_APP_PROJECT_ID=hooksauth-ID_HERE
REACT_APP_STORAGE_BUCKET=hooksauth-ID_HERE.appspot.com
REACT_APP_MESSAGING_SENDER_ID=SENDER_ID
REACT_APP_APP_ID=APP_ID
```

<br/>and update your config

```typescript
// file: FirebaseProvider.tsx
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
```

<br/>To stop the firebase initialisation happening multiple times, check if it already exists in the context

```typescript
// file: FirebaseProvider.tsx
import firebase from 'firebase/app'

const firebaseConfig = {...}

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
```

<br/>Now we want to create our context, and provider

```jsx
// file: FirebaseProvider.tsx
import firebase from 'firebase/app'
import { createContext } from 'react';

export interface IFirebaseContext {
    firebase: firebase.app.App,
}

// Context
export const FirebaseContext = createContext({} as IFirebaseContext)

const config = {...}

const initFirebase = () => {...}

// Provider
export const FirebaseProvider = ({ children }: any) => {
    initFirebase();
    return (
        <div>
            <FirebaseContext.Provider value={{ firebase: firebase.app() } as IFirebaseContext}>
                {children}
            </FirebaseContext.Provider>
        </div>
    );
}
```

### Usage

Implement in provider in your app

```jsx
// file: index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseProvider } from "./auth/FirebaseProvider";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      // Anything in here will have access to firebase through useContext
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

<br/>Use firebase

```typescript
// file: anywhere inside FirebaseProvider
const { firebase } = useContext(FirebaseContext);
```

<br/><br/>For a more complete example of usage with the react-firebaseui package and saving user data see my github repo: https://github.com/bmpickford/firebase-auth-example<br /><br />

Open to any improvements so feel free to submit a PR or an issue
