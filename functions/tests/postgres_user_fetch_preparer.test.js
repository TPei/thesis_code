const fs = require('fs');
const transform = require('../postgres/user_fetch_preparer/main.js').handler

// test that all request.json / output.json files match
test('postgres user_fetch_preparer does its job', () => {
  let input = '../postgres/user_fetch_preparer/request.json'
  let output = '../postgres/user_fetch_preparer/output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
