var fs = require('fs');
var path = require('path');

var loaderUtils = require('loader-utils');
var tv4 = require('tv4');

module.exports = function (content) {
  var query = loaderUtils.parseQuery(this.query);

  this.cacheable();

  if (!query.schema) {
    return content;
  }

  var validator = tv4.freshApi();
  if (query.schemas) {
    validator.addSchema(query.schemas);
  }

  var parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (err) {
    this.emitError('Error parsing content: ' + err.message);
    return;
  }

  var schema;
  try {
    schema = fs.readFileSync(query.schema, 'utf8');
  } catch (err) {
    this.emitError('Error reading schema file: ' + err.message);
    return;
  }

  var parsedSchema;
  try {
    parsedSchema = JSON.parse(schema);
  } catch (err) {
    this.emitError('Error parsing schema: ' + err.message);
    return;
  }

  var result = validator.validateMultiple(
    parsedContent,
    parsedSchema,
    query.checkRecursive,
    query.banUnknownProperties
  );

  if (result.valid !== true) {
    result.missing.forEach(function (missing) {
      this.emitError(JSON.stringify(missing));
    });
    result.errors.forEach(function (error) {
      this.emitError(error.message + ' ' + JSON.stringify({
        code: error.code,
        params: error.params,
        dataPath: error.params,
        schemaPath: error.schemaPath,
        subErrors: error.subErrors
      }, null, '  '));
    }.bind(this));
  }
  return content;
};