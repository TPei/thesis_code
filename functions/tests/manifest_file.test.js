const yaml = require('js-yaml');
const fs = require('fs');

test('required actions are in manifest', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let actionNames = Object.keys(doc.packages.thesis_demo.actions);
  expect(actionNames.length).toEqual(12)
  expect(actionNames).toContain('handle_cloudant_query');
  expect(actionNames).toContain('fetch_yappl_for_user');
  expect(actionNames).toContain('my_exec_query_find');
  expect(actionNames).toContain('yappl_parser');
  expect(actionNames).toContain('transformation_map_maker_direct');
  expect(actionNames).toContain('user_fetch_preparer');
  expect(actionNames).toContain('fetch_user_data');
  expect(actionNames).toContain('transformation_sequence_preparer');
  expect(actionNames).toContain('transformation_finalizer');
  expect(actionNames).toContain('s_anonymizer');
  expect(actionNames).toContain('s_none');
  expect(actionNames).toContain('s_only_provider');
});

test('required sequences are in manifest', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let sequenceNames = Object.keys(doc.packages.thesis_demo.sequences);
  expect(sequenceNames.length).toEqual(2)
  expect(sequenceNames).toContain('transformation_sequence');
  expect(sequenceNames).toContain('api_yappl_parse_maker_fetcher_transformator');
});

test('required actions are in sequences', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let transformationActions = doc.packages.thesis_demo.sequences['transformation_sequence'].actions
  expect(transformationActions).toEqual(expect.stringContaining('transformation_sequence_preparer'))
  expect(transformationActions).toEqual(expect.stringContaining('transformation_finalizer'))
  expect(transformationActions).toEqual(expect.stringContaining('s_anonymizer'))
  expect(transformationActions).toEqual(expect.stringContaining('s_none'))
  expect(transformationActions).toEqual(expect.stringContaining('s_only_provider'))

  let mainActions = doc.packages.thesis_demo.sequences['api_yappl_parse_maker_fetcher_transformator'].actions
  expect(mainActions).toEqual(expect.stringContaining('handle_cloudant_query'))
  expect(mainActions).toEqual(expect.stringContaining('fetch_yappl_for_user'))
  expect(mainActions).toEqual(expect.stringContaining('yappl_parser'))
  expect(mainActions).toEqual(expect.stringContaining('transformation_map_maker_direct'))
  expect(mainActions).toEqual(expect.stringContaining('user_fetch_preparer'))
  expect(mainActions).toEqual(expect.stringContaining('fetch_user_data'))
  expect(mainActions).toEqual(expect.stringContaining('transformation_sequence'))
});

test('all actions have nodejs:10 as runtime and 2048MB memory size', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let actions = doc.packages.thesis_demo.actions
  Object.keys(actions).forEach(actionName => {
    let action = actions[actionName]
    expect(action.runtime).toEqual('nodejs:10')
    expect(action.limits.memorySize).toEqual(2048)
  })
});

