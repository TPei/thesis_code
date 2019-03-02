const fs = require('fs');

// test that all request.json / output.json files match
test('inputs equal previous outputs', () => {
  let input_output_pairs = [
    ['../request.json', '../apis/handle_cloudant_query/request.json'],
    ['../apis/handle_cloudant_query/output.json', '../cloudant/fetch_yappl_for_user/request.json'],
    ['../cloudant/fetch_yappl_for_user/output.json', '../yappl_parser/request.json'],
    ['../yappl_parser/output.json', '../transformation_map_maker/request.json'],
    ['../transformation_map_maker/output.json', '../user_fetch_preparer/request.json'],
    ['../user_fetch_preparer/output.json', '../cloudant/fetch_user_data/request.json'],
    ['../cloudant/fetch_user_data/output.json', '../transformations_sequence/request.json']
    //['../transformations_sequence/output.json', '../output.json']
  ]

  input_output_pairs.forEach(pair => {
    let input = pair[0]
    let output = pair[1]
    output = fs.readFileSync(output, 'utf8');
    input = fs.readFileSync(input, 'utf8');
    expect(input).toEqual(output)
  });
});

