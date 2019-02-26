activation_ids = [
  # '20959e26624b4e32959e26624bbe3214', # overall sequence
  '085456eda1c844fb9456eda1c8c4fb3f',
  # '1beb9748cbc946ecab9748cbc916ec4c', # fetch yappl_for user does db call
  '0d95020fff25420895020fff258208bb',
  '908e6a757e864ca88e6a757e867ca8ca',
  # '7e75a781af714879b5a781af71b879d5', # transformation map maker calls others in sync
  'e4f028e5fe1d4968b028e5fe1d8968d7',
  '6960c04904424013a0c04904425013b1',
  '187dc6d907294b7dbdc6d907291b7d78',
  'd4327dfa6189419eb27dfa6189119e0f',
  '2e9cd6d1eb1e41349cd6d1eb1e413402',
  '55030b84ea6b4b45830b84ea6b3b45b1',
  '11dfc0973cca4d109fc0973cca8d1028',
  # '09a4bd5b77ac47c5a4bd5b77ac97c5e0', # fetch_user_data does db call
  'bea463981285437aa463981285937a3c',
  'f48857cc66c644058857cc66c6a40531',
  # '96d38d59306c4917938d59306c491742' # transformation orchestration calls others in sync
  '56c72c9022e44722872c9022e4572244',
  '766a48736e104b1baa48736e108b1b21',
  'dd5e74b7ee844a839e74b7ee846a83db',
  '464b4513c95747868b4513c957878667'
]

require 'json'

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
