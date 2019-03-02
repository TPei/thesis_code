const fs = require('fs');
const transform = require('../transformation_map_maker/direct.js').handler

// test that all request.json / output.json files match
test('transformation_map_maker does its job', () => {
  let input = '../transformation_map_maker/request.json'
  let output = '../transformation_map_maker/output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
