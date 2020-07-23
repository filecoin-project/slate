![Slate](https://user-images.githubusercontent.com/310223/88096926-48f21880-cb4c-11ea-803f-1984f4515651.png)

# Slate (WIP)

- (WIP) A wonderful experience for creating mood boards, hosting assets, and making connections between topics you are researching
- (WIP) With a Developer API and API Keys, a replacement for Amazon S3.
- (WIP) Aims to have every feature the [Filecoin Network](https://filecoin.io) supports.
- (WIP) Great for storing images and sharing high resolution photos with friends.
- [Design system](https://slate.host/system) -> [Release repository](https://github.com/filecoin-project/slate-react-system).

#### Current prototype (July 22nd, 2020)

![screenshot](https://user-images.githubusercontent.com/310223/88253285-3a981f80-cc66-11ea-884b-e3b055f6bf46.png)

#### Current prototype (June 15th, 2020)

![screenshot](https://user-images.githubusercontent.com/310223/84873452-1c704b80-b038-11ea-8398-4a73c4d9850e.png)

## Developer Introduction

* To work on Slate you must have an internet connection.
* We don't have windows support at the moment.

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

### BROKEN: Run electron (MacOS)

@jimmylee broke the current version of the client.

```sh
rm -rf .next
npm run build-electron
npm run electron-pack
```

Open **Slate.app** in `dist/mac/slate.app`.

# Get involved.

Do you want to...

- Help us build a design system for everyone to use?
- Help us build examples?
- Get mentorship and help with learning how to do front-end code?

Then...

- If you see things you want to work on, [file an issue](https://github.com/filecoin-project/slate/issues)!
- If you see something you want to fix, **submit a PR**!
- I'm always available on Twitter to answer your questions: [@wwwjim](https://www.twitter.com/wwwjim).
- For any build questions feel free to reach out to Colin: <cs.mccaleb@gmail.com>
