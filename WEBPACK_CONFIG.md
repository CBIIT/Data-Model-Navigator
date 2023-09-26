```
"devDependencies": {
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.18.6",
    "@babel/plugin-proposal-optional-chaining": "^7.18.9"
}


// parsing fails for on optional operator without this cofiguration.
// reactflow uses optionsl chaning and nullish coalescing operator 
// that webpack 4 is unable to prase by default
{
  test: /node_modules\/@reactflow\/controls|minimap|node-toolbar|core\/dist\/esm\/index.js/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            corejs: 3,
            useBuiltIns: "usage",
            include: [
              "@babel/plugin-proposal-optional-chaining", 
              "@babel/plugin-proposal-nullish-coalescing-operator"
            ],
            targets: "last 5 Chrome versions, last 5 Firefox versions",
          },
        ]
      ],
    },
  },
},

```