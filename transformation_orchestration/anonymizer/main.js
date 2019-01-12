// demo yappl transformation function
// signature: transformation: { data: x } -> { data: x' }

// makes a *** string of the same length as input
function main (params) {
  let string = params.data
  let anonymized = "*".repeat(string.length)

  return { data: anonymized }
}
