require 'json'

def main(params)
  ap = params['access']

  aip_strings = params['allowed'].collect { |aip| make_regexp_string(aip) }
  pip_strings = params['prohibited'].collect { |pip| make_regexp_string(pip) }

  aip_matches = aip_strings.collect { |aip| !Regexp.new(aip).match(ap).nil? }
  pip_matches = pip_strings.collect { |pip| !Regexp.new(pip).match(ap).nil? }

  # there must be at least one aip matched and not pips may be matched
  compliant = aip_matches.include?(true) && !pip_matches.include?(true)
  { compliant: compliant }
end

def make_regexp_string(purpose) # or utilizer /shrug
  str = '\A'
  purpose.split('.').each do |element|
    if element == '*'
      str += '\S*'
    else
      str += element
    end
    str += '[.]'
  end
  str = str[0..-4] # remove last [.]
  str += '\z'
end
