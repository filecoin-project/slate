![Slate](https://user-images.githubusercontent.com/310223/92346209-e368d580-f080-11ea-8693-0fb64f8d3b97.jpg)

# Slate

### An open source storage system for your data that makes it easy to collect, organize, and share them anywhere on the web.

- [Create an account and try it out!](https://slate.host)
- [Filecoin](https://filecoin.io)
- [Textile](https://textile.io)
- [Twitter](https://twitter.com/_slate)

### Introduction

![Slate Preview](https://user-images.githubusercontent.com/310223/92346093-94bb3b80-f080-11ea-8ac6-c4cce3cd1aec.gif)

Slate is the first open source file storage application designed to encourage collaboration and research across a distributed network. It is a first step towards enabling a thriving network for data storage and transactions powered by IPFS, Filecoin and Textile that is open and usable for everyone. Our goal is to provide a meaningful story for every feature the protocol provides today and in the future. The Slate Project is the byproduct of a growing community of contributors from around the world.

Slate is tightly scoped for the present and more broadly thought out for the future. Our primary objective is to create a best-in-class experience for uploading, collecting, and sharing media. Additional filetypes will be supported, but our focus is to start with the pieces that apply to everyone and then dial into more specific formats.

- Example slate: https://slate.host/tara/loom
- Example user profile: https://slate.host/gndclouds
- New brand: https://slate.host/narative/slate-brand-identity
- Monet on Filecoin: https://slate.host/slate/monet

### Developer API

Slate has a Developer API that allows you upload files using code and HTTP.

Every user who creates an account on Slate can use the API. Here is an example:

```js
const response = await fetch("https://slate.host/api/v1/get", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic XXX-YOUR-SLATE-KEY-XXX",
  },
});
```

[Create an account and try it out!](https://slate.host/_)

# Get involved

Slate is built by a growing community of collaborators and contributors. We’d love for you to join us!

How?

- Find something you want to work on and [file an issue](https://github.com/filecoin-project/slate/issues).
- If you see something you want to fix or change, **submit a PR**.
- Reach out at any time. We're always available on Twitter to answer your questions: [@\_slate](https://www.twitter.com/_slate).

## Slate Development Guide

- To work on Slate you must have an internet connection.
- We don't have windows support at the moment.

### .env

- You must create a `.env` file if you want to work on the service.
- You don't need one if you work on the system.
- Resource URIs are optional if you want to use another server for uploads.

```
POSTGRES_ADMIN_PASSWORD=XXX
POSTGRES_ADMIN_USERNAME=XXX
POSTGRES_HOSTNAME=XXX
POSTGRES_DATABASE=XXX
LOCAL_PASSWORD_SECRET=XXX
LOCAL_PASSWORD_ROUNDS_MANUAL=5
LOCAL_PASSWORD_ROUNDS=14
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
JWT_SECRET=XXX
PUBSUB_SECRET=pKLO4lbzdMrhAFKwPo9bnmq03bxQrtu3
RESOURCE_URI_UPLOAD=http://localhost:4242
RESOURCE_URI_STORAGE_UPLOAD=http://localhost:4242
RESOURCE_URI_PUBSUB=ws://localhost:6464
```

### Setup pubsub server

- In another terminal window, clone https://github.com/slate-engineering/fiji
- You can use the same secrets

### Setup file upload server

- In another terminal window, clone https://github.com/slate-engineering/shovel
- You can use the same secrets

### Install and run

```sh
git clone https://github.com/filecoin-project/slate.git
cd slate
npm install

# Run using existing .data folder
npm run dev
```

- Visit `localhost:1337` in a browser.
- You should have 3 terminal screens open unless you don't want real time updates and file upload support.

## Design System

Our design system is out of date and could use an update.

- [Use our components](https://slate.host/_/system)
- [Design System Release Repository](https://github.com/filecoin-project/slate-react-system)
