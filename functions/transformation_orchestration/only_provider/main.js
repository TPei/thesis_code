// demo yappl transformation function
// signature: transformation: { data: x } -> { data: x' }

// returns only provider and tld from an email address
// { data: 'some1234mail@gmail.com' } -> { data: '@gmail.com' }
function main (params) {
  let string = params.data
  let anonymized = string.split("@")[1]

  return { data: anonymized }
}
