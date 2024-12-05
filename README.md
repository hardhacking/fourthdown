# ESPN Analytics website

You'll need nvm, node.js, npm and vue. You'll probably want git and visual studio code.

## On Windows:

General idea is that nvm is a "Node version manager" which allows you to install and switch between different versions of Node.js. This will probably be necessary because versions update often, so sometimes you'll need to switch to an older version to be able to run a project. node.js and npm allow you to install packages and use vue. Vue is essentially a framework that combines javascript, css and html into an easy way to quickly build web apps. I'm assuming that you need to be admin to follow these steps.

1. Install [nvm](https://github.com/coreybutler/nvm-windows/releases). Download the `nvm-setup.exe` file and run it (You might need to download the `nvm-setup.zip` file first, then open and run the .exe file).
2. Install node.js by opening up Command Prompt or PowerShell and running the command `nvm install latest`. You can always see what versions of Node are installed by running `nvm ls` and switch between versions by doing something like `nvm use 18` or `nvm use 12.9.0 32`.
3. Install [Visual Studio Code](https://code.visualstudio.com/) or some other code editor and git, I like to use GitHub Desktop.
4. 

* [nvm, Node.js and npm tutorial](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
* [Vue tutorial](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/vue-on-windows)

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
