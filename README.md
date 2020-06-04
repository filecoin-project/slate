# What is this?

- A [live example](https://filecoin.onrender.com) of how to use the Filecoin Network.
- An open source desktop client for using [Textile's Powergate](https://github.com/textileio/powergate/).
- An [open source design system](https://filecoin.onrender.com) for building your own applications that are compatible with [Textile's Powergate](https://github.com/textileio/powergate/).
- A kitchen sink example repository and multiple files to take example code snippets from for your own projects.

## Where are we today?

- Powergate is in the process of getting fully integrated.
- Electron application in planning!

# Getting Started

If you want to help with the development, just follow these steps:

## Satisfy system requirements

- Make sure you have [homebrew](https://brew.sh/).
- Make sure you run `xcode-select -p`, if the command does not return a response, run `xcode-select --install`.
- Make sure you run `brew install node`.
- Make sure you run `brew install go`.

## Get and Setup Docker

- `brew install docker`.
- Install [Docker for Desktop](https://www.docker.com/products/docker-desktop) if you are running MacOS.

## Setup Lotus DevNet and Powergate

- Clone the [Lotus DevNet](https://github.com/textileio/lotus-devnet) repository.
- Run `docker run --name texdevnet -e TEXLOTUSDEVNESPEED=1500 -p 1234:7777 textile/lotus-devnet`.
- Clone [Powergate](https://github.com/textileio/powergate/).
- Follow the instructions and run the commands in the README.md file.

## Run the Filecoin Client

- Clone this repository, run the following commands:

```sh
npm install
npm run dev
```

Visit `localhost:1337` in the browser.

## Getting Involved and Becoming a Contributor

TBA
