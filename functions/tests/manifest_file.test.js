const yaml = require('js-yaml');
const fs = require('fs');

test('has cloudant package with data', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let actions = doc.packages.cloudant.actions;
  Object.keys(actions).forEach(actionName => {
    let action = actions[actionName]
    expect(action.runtime).toEqual('nodejs:10')
    expect(action.limits.memorySize).toEqual(2048)
  })
  expect(Object.keys(actions).length).toEqual(5)

  let sequenceNames = Object.keys(doc.packages.cloudant.sequences);
  expect(sequenceNames.length).toEqual(2)
});


test('has postgres package with data', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let actions = doc.packages.postgres.actions;
  Object.keys(actions).forEach(actionName => {
    let action = actions[actionName]
    expect(action.runtime).toEqual('nodejs:10')
    expect(action.limits.memorySize).toEqual(2048)
  })
  expect(Object.keys(actions).length).toEqual(1)

  //let sequenceNames = Object.keys(doc.packages.cloudant.sequences);
  //expect(sequenceNames.length).toEqual(2)
});

test('required sequences are in manifest', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let sequenceNames = Object.keys(doc.packages.thesis.sequences);
  expect(sequenceNames.length).toEqual(3)
});

test('all actions have nodejs:10 as runtime and 2048MB memory size', () => {
  let file = '../manifest.yml'
  var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

  let actions = doc.packages.thesis.actions
  Object.keys(actions).forEach(actionName => {
    let action = actions[actionName]
    expect(action.runtime).toEqual('nodejs:10')
    expect(action.limits.memorySize).toEqual(2048)
  })
});

