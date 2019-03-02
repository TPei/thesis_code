const fs = require('fs');
const parse = require('../yappl_parser/main.js')

// test that all request.json / output.json files match
test('yappl_parser does its job', () => {
  let input = '../yappl_parser/request.json'
  let output = '../yappl_parser/output.json'

  fs.readFileSync(output, (err, output) => {
    if (err) throw err;
    fs.readFileSync(input, (err, input) => {
      if (err) throw err;
      expect(parse(input)).toEqual(output)
    });
  });
});
