const fs = require('fs');
const transform = require('../apis/handle_cloudant_query/pre.js').handler

// test that all request.json / output.json files match
test('handle cloudant query pre does its job', () => {
  let input = '../apis/handle_cloudant_query/pre_request.json'
  let output = '../apis/handle_cloudant_query/pre_output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
