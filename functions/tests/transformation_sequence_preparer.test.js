const fs = require('fs');
const transform = require('../transformations_sequence/transformation_sequence_preparer/main.js').handler

// test that all request.json / output.json files match
test('transformation_sequence_preparer does its job', () => {
  let input = '../transformations_sequence/transformation_sequence_preparer/request.json'
  let output = '../transformations_sequence/transformation_sequence_preparer/output.json'

  output = JSON.parse(fs.readFileSync(output, 'utf8'));
  input = JSON.parse(fs.readFileSync(input, 'utf8'));
  expect(transform(input)).toEqual(output)
});
