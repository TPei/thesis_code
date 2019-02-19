const DEFAULT_DATE = "0000-01-01T00:00:00.000Z";

function main(params) {
  policy = params.policy
  user_id = params.user_id
  access_purpose = params.access_purpose
  access_utilizer = params.access_utilizer

  return {
    policy: parseYappl(policy),
    user_id: user_id,
    access_purpose: access_purpose,
    access_utilizer: access_utilizer
  }
}

function parseYappl(policy) {
  let parsedPolicy = policy.preference.map(function(r) {
    let rule = r.rule
    if(isValid(rule.exp_date)) {
      return {
        excluded_purposes: rule.purpose.excluded,
        permitted_purposes: rule.purpose.permitted,
        excluded_utilizers: rule.utilizer.excluded,
        permitted_utilizers: rule.utilizer.permitted,
        transformations: rule.transformation,
      }
    }
  }).filter(element => element !== undefined)
  return parsedPolicy;
}

function isValid(dateString) {
  if(dateString === DEFAULT_DATE)
    return true

  let expirationDate = new Date(dateString);
  let currentDate = new Date();

  return currentDate < expirationDate;
}

exports.handler = main;
