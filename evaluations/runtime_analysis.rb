require 'json'

activation_ids = [
  "3d8a9b6bbfa646a78a9b6bbfa646a7bb",
  "5cac98e9983d45aaac98e9983d55aa74",
  "1724c9cdc9c4422ca4c9cdc9c4f22c7b",
  "4b64c614a9b74039a4c614a9b7e03935",
  "88438c4265604163838c426560316364",
  "ee646512857b4acfa46512857b6acf62",
  "d8eaa3f9d5094583aaa3f9d50905834d",
  "fe39933de9154a07b9933de9152a0786",
  "b3cfbe9e8fab41998fbe9e8fab819977",
  "05ba94a821594a0bba94a82159fa0b50",
  "62cb67c02368458c8b67c02368b58c17",
  "74c62d4781ba4f80862d4781ba9f8091",
  "18f9fb06f8e84dd3b9fb06f8e88dd360",
  "7da05a6c1fab4932a05a6c1fabc932cc",
  "17738eb3c2dd42b9b38eb3c2dd62b943",
  "fe6de677599042c5ade677599092c54a",
  "3ca9bdd75a324132a9bdd75a32d132c1"
].reverse

unix_time_before_invokation = '1551095700000'
activation_list = `bx wsk activation list --since #{unix_time_before_invokation}`
activation_ids = activation_list.split("\n")[1..-1].map { |activation| activation.split(' ' )[0] }

# we need to get only the activations of the last call
# added complexity: we get one activatoin for the orchestration functions that just show duration
# we need to get in-depth data for all the orchestrated functions
# and only count the remaining time as duration (or even as call_overhead)...

activation_data = activation_ids.map { |id| `bx wsk activation get #{id}`}
# response starts with: "ok: got activation 9744c6b2dffa487084c6b2dffa1870a1\n'"
activation_data = activation_data.map { |activation| JSON.parse(activation[52..-1]) }

details = []

activation_data.each do |activation|
  detail = {
    id: activation['activationId'],
    name: activation['name'],
    start: activation['start'],
    end: activation['end'],
    duration: activation['duration']
  }

  activation['annotations'].each do |annotation|
    if annotation['key'] == 'waitTime'
      detail[:waitTime] = annotation['value']
    elsif annotation['key'] == 'initTime'
      detail[:initTime] = annotation['value']
    end
  end
  details << detail
end

totals = {
  duration: 0,
  waitTime: 0,
  initTime: 0
}

details.each do |activation|
  totals[:duration] += activation[:duration].to_i
  totals[:waitTime] += activation[:waitTime].to_i
  totals[:initTime] += activation[:initTime].to_i
end
