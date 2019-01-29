# Transformation Orchestration

An orchestrator to run lots of YaPPL transformation functions on a
dataset.

## How do I use this?
1. Deploy using `wskdeploy`
2. call actions using sequence and data parameters
`wsk action invoke transformation_test/transformation_orchestration -r -P sequence.json -P sequence_test_data.json`

### What's happening here?
In sequence.json you see the format to specify which transformation
functions (wsk actions) should be applied to which fields in the
transmitted dataset. For example "run anonymizer on name".
```json
{
  "actions": [
    {
      "transformation_test/anonymizer": "name"
    },
    {
      "transformation_test/anonymizer": "gender"
    }
  ]
}
```

In sequence_test_data.json you see some data that is passed to the
orchestration function as well:
```json
{
  "name": "Panda",
  "age": "< 1 year",
  "gender": "female"
}
```

So, given the two files you can see that a data set with three fields
is transmitted: name, age and gender. You can also see that for name and
gender, the anonymizer function should be applied. Hence, the expected
return is:
```json
{
    "name": "*****",
    "age": "< 1 year",
    "gender": "******"
}
```

## Writing Transformation Functions
To be able to work with the transformation orchestrator, your YaPPL
transformation function must fulfil the following contract:
`{ "data": x } -> { "data": x' }`
Meaning that the data that will be transformed is passed in under the
json key "data" and the transformed data is passed back under "data" as
well.

For an "average" function that returns the average of a list of items
this would mean the following:

Input: `{ "data": [1, 2, 3, 4] }`
Output: `{ "data": 2.5 }`

The transformation orchestrator will then replace the original value in
the currently handled dataset with the transformed value.

Btw, Panda is my dog 🐼 and she is cute!
