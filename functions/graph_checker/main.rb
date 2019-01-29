require 'json'

def main(params)
  ap = params['ap']

  aip_strings = params['aip'].collect { |aip| make_regexp_string(aip) }
  pip_strings = params['pip'].collect { |pip| make_regexp_string(pip) }

  aip_compliant = aip_strings.collect { |aip| !Regexp.new(aip).match(ap).nil? }
  pip_compliant = pip_strings.collect { |pip| Regexp.new(pip).match(ap).nil? }

  {
    aip_compliant: aip_compliant,
    pip_compliant: pip_compliant
  }
end

def make_regexp_string(purpose)
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
