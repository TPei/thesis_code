# Transformation Orchestration

An orchestrator to run lots of YaPPL transformation functions on a
dataset.

## How to use?
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

Btw, Panda is my dog 🐼 and she is cute!
