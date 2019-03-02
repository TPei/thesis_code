const fs = require('fs');

// test that all request.json / output.json files match
test('handle_cloudant_quer output equals fetch_yappl_for_user request', () => {
  let input_output_pairs = [
    ['../request.json', '../apis/handle_cloudant_query/request.json'],
    ['../apis/handle_cloudant_query/output.json', '../cloudant/fetch_yappl_for_user/request.json'],
    ['../cloudant/fetch_yappl_for_user/output.json', '../yappl_parser/request.json'],
    ['../yappl_parser/output.json', '../transformation_map_maker/request.json'],
    ['../transformation_map_maker/output.json', '../user_fetch_preparer/request.json'],
    ['../user_fetch_preparer/output.json', '../cloudant/fetch_user_data/request.json'],
    ['../cloudant/fetch_user_data/output.json', '../transformations_sequence/request.json'],
    ['../transformations_sequence/output.json', '../output.json']
  ]

  input_output_pairs.forEach(pair => {
    input = pair[0]
    output = pair[1]
    fs.readFileSync(output, (err, output) => {
      if (err) throw err;
      fs.readFileSync(input, (err, input) => {
        if (err) throw err;
        expect(output).toEqual(input);
      });
    });
  });
});

