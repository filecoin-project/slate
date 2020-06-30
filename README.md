# Filecoin Client Project (WIP)

#### High fidelity concept (May 23rd, 2020)

![original_5ab368196245f0603c2a0c20b63c0339](https://user-images.githubusercontent.com/310223/84869134-8128a780-b032-11ea-9c4f-7b28f0870feb.png)

#### Current prototype (June 15th, 2020)

![screenshot](https://user-images.githubusercontent.com/310223/84873452-1c704b80-b038-11ea-8398-4a73c4d9850e.png)

## Introduction

This is an example of how to use the [Filecoin Network](https://filecoin.io) on a [Lotus DevNet](https://lotu.sh). It uses
[Textile's Powergate](https://github.com/textileio/powergate/) and [Aaron Sutula](https://github.com/asutula)'s work with the [JavaScript/TypeScript Powergate Client](https://github.com/textileio/js-powergate-client).

Also included:

- DevNet storage deals with miners.
- Local library management, you can share it with others too.
- Local powergate authentication token management.
- Image file preview.
- Send filecoin between wallet addresses, create new addresses.
- Update your default settings.
- The beginning of an [open source design system](https://filecoin.onrender.com/system).
- A [kitchen sink example](https://github.com/filecoin-project/slate/blob/master/server.js) for most JavaScript Powergate calls using `async` and `await`. If you need to see all of the possible functions, [look here](https://github.com/textileio/js-powergate-client/blob/master/src/ffs/index.ts).
- An example of using [Inter](https://rsms.me/inter/).

Coming soon:

- **Many more features**.
- Electron wrapper and binaries.
- New brand! Help us decide [here](https://filecoin.onrender.com/logo-name-test). Example logos are from the [Logo Archive](https://logo-archive.org/).

# Run locally (Mac OS)

These steps will guide you through running the client.

## Satisfy dependency requirements

- Make sure you have [homebrew](https://brew.sh/).
- Make sure you run `xcode-select -p`, if the command does not return a response, run `xcode-select --install`.
- Make sure you run `brew install node`.
- Make sure you run `brew install go`.

## Setup Docker

- `brew install docker`.
- Install [Docker for Desktop](https://www.docker.com/products/docker-desktop) if you are running MacOS.

## Setup Lotus DevNet and Powergate

- Clone the [Lotus DevNet](https://github.com/textileio/lotus-devnet) repository.
- Run `docker run --name texdevnet -e TEXLOTUSDEVNESPEED=1500 -p 1234:7777 textile/lotus-devnet`.
- Clone [Powergate](https://github.com/textileio/powergate/).
- Follow the instructions and run the commands in the README.md file:

```sh
cd docker
make devnet
```

## Install and run

Run these commands to start the client locally. You may need to wait a small period of time for both of the Docker instances to complete running first.

```sh
git clone git@github.com:filecoin-project/slate.git
cd slate
npm install
npm run dev
```

#### Example of what to expect

![screenshot](https://user-images.githubusercontent.com/310223/84878302-7d028700-b03e-11ea-82c4-c53dca9d7e65.png)

- Visit `localhost:1337` in the browser.
- If you see the design system page instead, that means a token was not properly generated in the `.data` folder. Run `npm run dev` again.
- **Note** — If you restart the server, it clears all your local files. You can disable this by modifying the code in `server.js`.
- **Note** — There will be new commands in the future for different contexts, like `electron`.

# Get involed.

Do you want to...

- Help us build a design system for internal use?
- Help us build out this example so every partner in the ecosystem can have example code to work with?

Then...

- If you see things you want to work on, [file an issue](https://github.com/filecoin-project/slate/issues)!
- If you see something you want to fix, **submit a PR**!
- I'm always available on Twitter to answer your questions: [@wwwjim](https://www.twitter.com/wwwjim).
- For any build questions feel free to reach out to Colin: <cs.mccaleb@gmail.com>
