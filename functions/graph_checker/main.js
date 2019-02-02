function main(params) {
  ap = params.ap
  aip_matches = params.aip.map(purpose => makeRegexpString(purpose).test(ap))
  pip_unmatches = params.pip.map(purpose => !makeRegexpString(purpose).test(ap))

  return { aip_compliant: aip_matches, pip_compliant: pip_unmatches }
}

function makeRegexpString(purpose) {
  let str = "^"
  purpose.split(".").forEach(function(element) {
    if(element == "*")
      str += "\\S*"
    else
      str += element

    str += "[.]"
  })

  str = str.slice(0, -3) // remove last [.]
  return new RegExp(str + "$")
}
