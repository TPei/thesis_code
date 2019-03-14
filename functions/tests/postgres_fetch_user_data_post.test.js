const fs = require('fs');
const transform = require('../postgres/fetch_user_data/post.js').handler

// test that all request.json / output.json files match
test('postgres_fetch_user_data_post does its job', () => {
  let input = '../postgres/fetch_user_data/post_request.json'
  let output = '../postgres/fetch_user_data/post_output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
