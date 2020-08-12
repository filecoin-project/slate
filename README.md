![Slate](https://user-images.githubusercontent.com/310223/88096926-48f21880-cb4c-11ea-803f-1984f4515651.png)

# Slate

### An open source storage system for your files and data that makes it easy to collect, organize, and share them anywhere on the web.

- [Design System](https://slate.host/_/system)
- [Release Repository](https://github.com/filecoin-project/slate-react-system)
- [Live Application Prototype](https://slate.host/_)

![screenshot](https://user-images.githubusercontent.com/310223/88253285-3a981f80-cc66-11ea-884b-e3b055f6bf46.png)

#### Current prototype (July 22nd, 2020)

Our goal is to create a new kind of storage solution that encourages collaboration and research, while also building it on a completely transparent and open source foundation. Over time, we hope to grow Slate into an elegant experience for:

- Creating mood boards, hosting data, and making connections between topics you are researching
- Replacing S3 with a Developer API and API keys
- Every feature supported by [Filecoin](https://filecoin.io)
- Storing images and sharing them with friends :)

Slate is a client for [Filecoin](https://filecoin.io), Powered by [Textile's](https://textile.io) Powergate and Buckets.

# Get involved.

Slate is built by a growing community of collaborators and contributors. If you’re interested in…

- Creating an open source design system
- Building a dynamic component library for open source projects
- Learning how to write front-end code

We’d love for you to join us! Getting involved is simple:

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
git clone git@github.com:filecoin-project/slate.git
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
