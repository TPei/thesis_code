const yaml = require('js-yaml');
const fs = require('fs');

test('required sequences are in manifest', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let sequenceNames = Object.keys(doc.packages.thesis_demo.sequences);
  expect(sequenceNames.length).toEqual(5)
  expect(sequenceNames).toContain('handle_cloudant_query');
  expect(sequenceNames).toContain('fetch_yappl');
  expect(sequenceNames).toContain('fetch_user_data');
  expect(sequenceNames).toContain('transformation_sequence');
  expect(sequenceNames).toContain('api_yappl_parse_maker_fetcher_transformator');
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

