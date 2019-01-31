require __dir__ + '/bundle/bundler/setup.rb'
require 'ruby_yappl'
require 'json'

# returns all active rules: aip, pip, aiu, piu, transformations
def main(params)
  policy_hash = params['policy']
  policy = YaPPL::Policy.from_policy_hash(policy_hash)
  tr_rules = policy.get_tr_rules

  # store required_transformations
  # age => grouped, name => none
  #transformation_map = {}

  #tr_rules.each do |rule|
    #allowed = allowed?(ap, au, rule)

    #rule.transformations.each do |transformation|
      #attribute = transformation['attribute']
      #func = transformation['tr_func']

      #if allowed
        #transformation_map[attribute] = func
      #end
    #end
  #end
  { policy: tr_rules }
end

#def allowed?(ap, au, rule)
  #aip = rule['permitted_purposes']
  #pip = rule['excluded_purposes']
  #aiu = rule['permitted_utilizers']
  #piu = rule['excluded_utilizers']
#end

class YaPPL::Policy
  def self.from_policy_hash(hash)
    from_policy_file(hash.to_json)
  end
end
