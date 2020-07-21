![Slate](https://user-images.githubusercontent.com/310223/88096926-48f21880-cb4c-11ea-803f-1984f4515651.png)

# Slate (WIP)

- (WIP) A wonderful experience for creating mood boards, hosting assets, and making connections between topics you are researching
- (WIP) With a Developer API and API Keys, a replacement for Amazon S3.
- (WIP) Aims to have every feature the [Filecoin Network](https://filecoin.io) supports.
- (WIP) Great for storing images and sharing high resolution photos with friends.
- [Design system](https://slate.host/system) -> [Release repository](https://github.com/filecoin-project/slate-react-system).

#### Current prototype (June 15th, 2020)

![screenshot](https://user-images.githubusercontent.com/310223/84873452-1c704b80-b038-11ea-8398-4a73c4d9850e.png)

## Developer Introduction

Working on Slate requires an internet connection because we are using a hosted Powergate and a hosted Postgres. That means there is no offline mode in the short term.

### .env

- We use a `dotenv` file to manage sensitive values and secrets.
- You must create this file to work on the application.
- You don't need to create a `.env` file if you're only working on the design system.
- There will be no local data in the short term.

```
POSTGRES_ADMIN_PASSWORD=XXX
POSTGRES_ADMIN_USERNAME=XXX
POSTGRES_HOSTNAME=XXX
POSTGRES_DATABASE=XXX
JWT_SECRET=XXX
LOCAL_PASSWORD_SECRET=XXX
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
```

### Install and run

Run these commands to start the client locally.

```sh
git clone git@github.com:filecoin-project/slate.git
cd slate
npm install

# Run using existing .data folder
npm run dev
```

![screenshot](https://user-images.githubusercontent.com/310223/84878302-7d028700-b03e-11ea-82c4-c53dca9d7e65.png)

- Visit `localhost:1337` in your browser.

### BROKEN: Run electron (MacOS)

@jimmylee recently broke the current version of the client.

While you have `npm run dev` running, in another terminal screen run:

```sh
rm -rf .next
npm run build-electron
npm run electron-pack
```

And then open **Slate.app** in `dist/mac/slate.app`.

# Get involved.

Do you want to...

- Help us build a design system for internal use?
- Help us build out this example so every partner in the ecosystem can have example code to work with?

Then...

- If you see things you want to work on, [file an issue](https://github.com/filecoin-project/slate/issues)!
- If you see something you want to fix, **submit a PR**!
- I'm always available on Twitter to answer your questions: [@wwwjim](https://www.twitter.com/wwwjim).
- For any build questions feel free to reach out to Colin: <cs.mccaleb@gmail.com>
