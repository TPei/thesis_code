var app = new Vue({
  el: '#app',
  data: {
    showSpinner: false,
    output: [],
    query: "{ \"selector\": { \"user_id\": \"1337\" } }",
    purpose: "General-Purpose.Marketing.Direct.Email.Special-Offer",
    utilizer: "General-Utilizer.Non-Profit.University.TU-Berlin"
  },

  methods: {
    fireQuery: function() {
      this.showSpinner = true;

      let requestBody = JSON.stringify(
        {
          data: {
            query: this.query,
            access_purpose: this.purpose,
            access_utilizer: this.utilizer
          }
        }
      )

      console.log(requestBody);

      let self = this;
      let startTime = performance.now();

      $.ajax({
        type: "POST",
        url: env.url,
        data: requestBody,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .done(function(data) {
        }).fail(function(data) {
          console.log(data);
        }).always(function(data) {
          let endTime = performance.now();
          let timing = "took: " + Math.round(endTime - startTime)/1000 + " seconds"
          let outputData = { timing: timing, response: data }
          self.output.push(outputData);
          self.showSpinner = false;
        })
    },
  },
});
