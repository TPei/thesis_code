const fs = require('fs');
const transform = require('../cloudant/fetch_yappl_for_user/pre.js').handler

// test that all request.json / output.json files match
test('handle cloudant query post does its job', () => {
  let input = '../cloudant/fetch_yappl_for_user/pre_request.json'
  let output = '../cloudant/fetch_yappl_for_user/pre_output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
