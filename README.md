![Slate](https://user-images.githubusercontent.com/310223/90989634-2048ae80-e550-11ea-938f-302a35ee1174.png)

# Slate

### An open source storage system for your files and data that makes it easy to collect, organize, and share them anywhere on the web.

- [Design System](https://slate.host/_/system)
- [Release Repository](https://github.com/filecoin-project/slate-react-system)
- [Live Application Release Candidate](https://slate.host/_)
- [Powered by Filecoin](https://filecoin.io)
- [Powered by Textile](https://textile.io)
- [Follow us on Twitter](https://twitter.com/_slate)

### Introduction

Slate is the first open source file storage application designed to encourage collaboration and research across a distributed network. It is a first step towards enabling a thriving network for data storage and transactions powered by IPFS, Filecoin and Textile that is open and usable for everyone. Our goal is to provide a meaningful story for every feature the protocol provides today and in the future. The Slate Project is the byproduct of a growing community of contributors from around the world.

Slate is tightly scoped for the present and more broadly thought out for the future. Our primary objective is to create a best-in-class experience for uploading, collecting, and sharing media. Additional filetypes will be supported, but our focus is to start with the pieces that apply to everyone and then dial into more specific formats.

- Example Slate: https://slate.host/tara/loom
- Example User Profile: https://slate.host/gndclouds
- Our New Brand: https://slate.host/narative/slate-brand-identity
- Monet on Filecoin: https://slate.host/slate/monet

### Developer API

Slate has a Developer API that allows you upload files using code. Every user who creates an account on Slate can use the API today. Here is an example of how simple it is:

```js
const response = await fetch('https://slate.host/api/v1/get', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic XXX-YOUR-SLATE-KEY-XXX',
  }
});
```

Create an account today and let us know what you think!

# Get involved.

Slate is built by a growing community of collaborators and contributors. We’d love for you to join us! 

Getting involved is simple:

- Find something cool you to work on and [file an issue](https://github.com/filecoin-project/slate/issues)
- If you see something you want to fix or change, **submit a PR**
- Reach out to us any time. We're always available on Twitter to answer your questions: [@\_slate](https://www.twitter.com/_slate)

## Developer Introduction

- To work on Slate you must have an internet connection.
- We don't have windows support at the moment.

### .env

- You must create a `.env` file if you want to work on the service.
- You don't need one if you work on the system.

```
POSTGRES_ADMIN_PASSWORD=XXX
POSTGRES_ADMIN_USERNAME=XXX
POSTGRES_HOSTNAME=XXX
POSTGRES_DATABASE=XXX
JWT_SECRET=XXX
LOCAL_PASSWORD_SECRET=XXX
LOCAL_PASSWORD_ROUNDS_MANUAL=5
LOCAL_PASSWORD_ROUNDS=14
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
```

### Install and run

```sh
git clone https://github.com/filecoin-project/slate.git
cd slate
npm install

# Run using existing .data folder
npm run dev
```

![screenshot](https://user-images.githubusercontent.com/310223/84878302-7d028700-b03e-11ea-82c4-c53dca9d7e65.png)

- Visit `localhost:1337` in a browser.

### Run electron (MacOS)

```sh
npm run electron-dev
```
