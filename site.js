//search event
$(document).on('click','#btnPostcode',function(){
  var input = $('#txtPostcode').val();
  var url  = 'https://api.postcodes.io/postcodes/' + input;
  var post;

    // Call the API
    fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (data) {
      // Store the post data to a variable
      post = data;
      var lat = data.result.latitude;
      var lng = data.result.longitude;
      // Fetch another API
      return fetch(`https://data.police.uk/api/crimes-at-location?date=2021-10&lat=${lat}&lng=${lng}`)

    }).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (userData) {
     console.log(userData);
     userData.forEach(result => {
      $('#result').append(`<p class="crime-type">Crime type: ${result.category.replace(/-/g, " ")}</p>`);
      $('#result').append(`<p>Location type: ${result.location_type}</p>`);
      $('#result').append(`<p>Outcome of result: ${result.outcome_status.category}</p>`);
      $('#result').append(`<p>Outcome result: ${result.outcome_status.date}</p><hr />`);

    })
   }).catch(function (error) {
    console.warn(error);
  });
 });

