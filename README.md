# noa-template

One example world built on the [noa voxel engine](https://github.com/fenomas/noa). An easy way to get started with `noa` is to use this repo and play with the demo.

This demo is forked from the two [noa example worlds](https://github.com/fenomas/noa-examples).

Please report any bugs or suggestions.

----

## Usage

**Note:** those using React may want to refer to [@MCArth/noa-cra-example](https://github.com/MCArth/noa-cra-example), which is a ported noa example built with `create-react-app`.

### To build and host the demo locally:
1. Clone this repo or use the template button

```sh
cd main
npm install

npm run start         # hosts ./src/index.js as a webpack-dev-server on localhost:8080 using --mode development
npm run build:dev     # builds ./src/index.js and bundles it to ./dist/index_bundle.js using --mode development
npm run build:prod    # builds ./src/index.js and bundles it to ./dist/index_bundle.js using --mode production
```

The `start` script hosts the demo via `webpack-dev-server`, you should be automatically taken to the demo. If this doesn't happen then you can access it by entering `localhost:8080` into a browser.

To build I recommend `build:prod`, this will generate a `index_bundle.js` designed for production in the `dist` directory.

There's also a `build:dev` to generate a commented `index_bundle.js` into the `dist` directory.

### Controls:
 * `LMB`: break blocks
 * `RMB`/`R`: make blocks (pick block type with `MMB`/`Q`)
 * `I`: invert mouse
 * `P`: pause/unpause
 * `1`: shoot a physics projectile
 * `3`: toggle timescale (between `1`, `0.1`, `2`)
 * `O`: swap between two sets of world data
 * `mousewheel`: zoom camera in and out
 
 ## Webpack

### To enable CleanWebpackPlugin() for webpack:
1. Open `./main/webpack.config.js`
2. Remove the comment from the line 41

```js
41:    // new CleanWebpackPlugin()

41:    new CleanWebpackPlugin()
```

This will delete files needed for webpack-dev-server to run, to use the webpack-dev-server keep this line commented out.

### To disable the automatic open in webpack:
1. Open `./main/webpack.config.js`
2. Set `open: false` or Comment out line 27
```js
26:    // Automatically open the development server in a new tab
27:    open: true

26:    // Automatically open the development server in a new tab
27:    open: false

26:    // Automatically open the development server in a new tab
27:    // open: true
```

----

## Dependencies

### Babylon dependency:

`Noa` uses [Babylon.js](https://www.babylonjs.com/) for 3D rendering, but references it as a peer dependency (so that game worlds can specify their Babylon version/modules). This means game worlds should declare a dependency on `@babylonjs/core` or similar, rather than loading in a prebuilt babylon script.

### Noa dependency:

The `noa` engine is under active development, this example pulls in the release '^0.32.0'.

#### Change version to development branch:
1. Open `./main/package.js`
2. Change line 21 from `"^0.32.0"` to `"github:fenomas/noa#develop"`
```js
21:    "noa-engine": "^0.32.0",

21:    "noa-engine": "github:fenomas/noa#develop",
```

----

## Credits

Made by [@fenomas](https://fenomas.com), license is [ISC](https://choosealicense.com/licenses/isc/).

This template is maintained by [@BodenMcHale](https://github.com/BodenMcHale).
