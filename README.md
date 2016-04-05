# tv4-loader

Webpack loader for validating json files against a schema file. Can be used in combination with [json-loader](https://github.com/webpack/json-loader).

## Usage

```js
module: {
  preLoaders: [
    {
      test: path.join(__dirname, 'some-json-file.json'),
      loader: 'tv4',
      query: {
        schema: path.join(__dirname, 'some-schema.json'),
      }
    }
  ],
  loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    }
  ]
}
```

## Query Parameters

 * `schemas` - Pre-register a schema for reference by other schema and synchronous validation. [See tv4 for further informations](https://github.com/geraintluff/tv4#addschemauri-schema).
 * `checkRecursive` - Enable support for recursive schemas. [See tv4 Documentation](https://github.com/geraintluff/tv4#cyclical-javascript-objects).
 * `banUnknownProperties` - Throw an error for all unknown properties used in your json file. [See tv4 Documentation](https://github.com/geraintluff/tv4#the-banunknownproperties-flag).

## Known Limitations

 * `schema` needs to be an absolute path to the schema file.

## License

MIT