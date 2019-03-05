const fs = require('fs');
const transform = require('../cloudant/post_yappl_fetcher/main.js').handler

// test that all request.json / output.json files match
test('handle cloudant query post does its job', () => {
  let input = '../cloudant/post_yappl_fetcher/request.json'
  let output = '../cloudant/post_yappl_fetcher/output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
