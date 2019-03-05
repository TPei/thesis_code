(11_000..11_999).each do |i|
  puts i
  puts `bx wsk action invoke fill_db/insert -r -P demo_document.json -p user_id #{i}`
end
