const fs = require('fs');
const parse = require('../postgres/handle_sql/pre.js').handler

// test that all request.json / output.json files match
test('yappl_parser does its job', () => {
  let input = '../postgres/handle_sql/pre_request.json'
  let output = '../postgres/handle_sql/pre_output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(parse(input)).toEqual(output)
});
