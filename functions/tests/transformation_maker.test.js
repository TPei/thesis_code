const fs = require('fs');
const transformation = require('../transformation_map_maker/direct.js')

// test that all request.json / output.json files match
test('transformation_map_maker does its job', () => {
  let input = '../transformation_map_maker/request.json'
  let output = '../transformation_map_maker/output.json'

  fs.readFileSync(output, (err, output) => {
    if (err) throw err;
    fs.readFileSync(input, (err, input) => {
      if (err) throw err;
      expect(transformation(input)).toEqual(output)
    });
  });
});
