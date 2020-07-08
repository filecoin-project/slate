# Slate (WIP)

- (WIP) Cross platform OSS.
- (WIP) Amazon S3 replacement.
- (WIP) Aims to have every feature the [Filecoin Network](https://filecoin.io) supports.
- (WIP) Great for storing images and sharing high resolution photos with friends.
- [Design system](https://slate.host/system) -> [Release repository](https://github.com/filecoin-project/slate-react-system).

#### Current prototype (June 15th, 2020)

![screenshot](https://user-images.githubusercontent.com/310223/84873452-1c704b80-b038-11ea-8398-4a73c4d9850e.png)

## Developer Introduction

### Run locally (MacOS)

- DevNet and Powergate are not required if you just want to work on the [design system](https://slate.host/system).

#### Satisfy dependency requirements

- Make sure you have [homebrew](https://brew.sh/).
- Make sure you run `xcode-select -p`, if the command does not return a response, run `xcode-select --install`.
- Make sure you run `brew install node`.
- Make sure you run `brew install go`.

#### Setup Docker

- `brew install docker`.
- Install [Docker for Desktop](https://www.docker.com/products/docker-desktop) if you are running MacOS.

#### Setup Lotus DevNet and Powergate

- Clone the [Lotus DevNet](https://github.com/textileio/lotus-devnet) repository.
- Run `docker run --name texdevnet -e TEXLOTUSDEVNESPEED=1500 -p 1234:7777 textile/lotus-devnet`.
- Clone [Powergate](localnet).
- Follow the instructions and run the commands in the README.md file:

```sh
cd docker
make localnet
```

### Install and run

Run these commands to start the client locally.

- **Note** — There might be a small delay between Powergate and Lotus.

```sh
git clone git@github.com:filecoin-project/slate.git
cd slate
npm install
npm run dev
```

### Example of what to expect

![screenshot](https://user-images.githubusercontent.com/310223/84878302-7d028700-b03e-11ea-82c4-c53dca9d7e65.png)

- Visit `localhost:1337` in the browser.
- If you see the design system page instead, that means a token was not properly generated in the `.data` folder. Run `npm run dev` again.
- **Note** — If you want to clear all your local files, run `npm run dev --reset-data`.
- **Note** — There will be new commands in the future for different contexts, like `electron`.

# Get involved.

Do you want to...

- Help us build a design system for internal use?
- Help us build out this example so every partner in the ecosystem can have example code to work with?

Then...

- If you see things you want to work on, [file an issue](https://github.com/filecoin-project/slate/issues)!
- If you see something you want to fix, **submit a PR**!
- I'm always available on Twitter to answer your questions: [@wwwjim](https://www.twitter.com/wwwjim).
- For any build questions feel free to reach out to Colin: <cs.mccaleb@gmail.com>
