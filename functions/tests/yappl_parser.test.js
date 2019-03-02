const fs = require('fs');
const parse = require('../yappl_parser/main.js').handler

// test that all request.json / output.json files match
test('yappl_parser does its job', () => {
  let input = '../yappl_parser/request.json'
  let output = '../yappl_parser/output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(parse(input)).toEqual(output)
});
