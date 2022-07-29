# noa-template

A template built on the noa voxel engine, check it out [here](https://github.com/fenomas/noa).

This demo is forked from [noa example worlds](https://github.com/fenomas/noa-examples) hello-world/test, the intended purpose is to have a quick setup for new projects with the `noa` engine.

Please report any bugs or suggestions.

## Usage

**Note:** those using React may want to refer to [@MCArth/noa-cra-example](https://github.com/MCArth/noa-cra-example), which is a ported noa example built with `create-react-app`.

### Build and host this demo locally:
1. Clone this repo with `gh repo clone BodenMcHale/noa-template`
3. Navigate to `/noa-template` with `cd noa-template`
3. Navigate to `/main` with `cd main`
4. Install the dependencies with `npm install`
5. Build `index.js` with `npm run build:prod`
6. Open `new-index.js` with `open dist/new-index.html`

```sh
gh repo clone BodenMcHale/noa-template

cd noa-template
cd main

npm install
npm run build:prod    # builds ./src/index.js and bundles it to ./dist/index_bundle.js using --mode production
npm run build:dev     # builds ./src/index.js and bundles it to ./dist/index_bundle.js using --mode development
npm run start         # hosts ./src/index.js as a webpack-dev-server on localhost:8080 using --mode development
```

The `start` script hosts the demo via `webpack-dev-server` using the files in `/main/dist`, you should be automatically taken to the demo. If this doesn't happen then you can access it by entering `localhost:8080` into a browser.

To build I recommend `build:prod`, this will generate a `index_bundle.js` designed for production `/main/dist`.

There's also a `build:dev` to generate a commented `index_bundle.js` into `/main/dist`.

### Controls:
 * `Left Mouse Button`: remove blocks
 * `Right Mouse Buttom` / `E`: place blocks
 * `Mouse Wheel`: zoom camera in and out
 
 ## Webpack

### Enable CleanWebpackPlugin() for webpack:
1. Open `/main/webpack.config.js`
2. Remove the comment from the line 42

```js
42:    // new CleanWebpackPlugin()

42:    new CleanWebpackPlugin()
```

This will delete files needed for webpack-dev-server to run, to use the webpack-dev-server keep this line commented out.

### Disable the automatic open for webpack-dev-server:
1. Open `/main/webpack.config.js`
2. Set `open: false` or Comment out line 27
```js
26:    // Automatically open the development server in a new tab
27:    open: true

26:    // Automatically open the development server in a new tab
27:    open: false

26:    // Automatically open the development server in a new tab
27:    // open: true
```

## Dependencies

### Babylon dependency:

`Noa` uses [Babylon.js](https://www.babylonjs.com/) for 3D rendering, but references it as a peer dependency (so that game worlds can specify their Babylon version/modules). This means game worlds should declare a dependency on `@babylonjs/core` or similar, rather than loading in a prebuilt babylon script.

### Noa dependency:

The `noa` engine is under active development, this example pulls in the release `"^0.32.0"`.

For more information on the releases, please read the [history.md](https://github.com/fenomas/noa/blob/master/docs/history.md)

#### Change version to development branch:
1. Open `/main/package.js`
2. Change line 17 from `"^0.32.0"` to `"github:fenomas/noa#develop"`
```js
17:    "noa-engine": "^0.32.0",

17:    "noa-engine": "github:fenomas/noa#develop",
```

## Credits

Made by [@fenomas](https://fenomas.com), license is [ISC](https://choosealicense.com/licenses/isc/).

This template is maintained by [@BodenMcHale](https://github.com/BodenMcHale).
