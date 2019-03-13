const fs = require('fs');
const parse = require('../postgres/fetch_user_data/pre.js').handler

// test that all request.json / output.json files match
test('postgres_fetch_user_data_pre does its job', () => {
  let input = '../postgres/fetch_user_data/pre_request.json'
  let output = '../postgres/fetch_user_data/pre_output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(parse(input)).toEqual(output)
});
