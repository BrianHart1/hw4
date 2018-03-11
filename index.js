
var moviesURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?" +
                "api-key=bca9a683c70f4e059f0b091cfefcbfc8"

fetch(moviesURL)
      .then(function(response) {
          return response.json();
      })
      .then(function(json) {
        console.log(json)

        //loop over articles and put them in each spot
        for (i = 0; i < 3; i++) {
          $("#heading"+(i+7) + " a").text(json.results[i].display_title)
          $("#heading"+(i+7) + " a").attr("href", json.results[i].link.url)
          $("#content"+(i+7)).text(json.results[i].summary_short)
        }
      })

var newsURL = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=d9bb1fe73c0a4a4c905ef890b2b450d8';

fetch(newsURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
      console.log(json)

      //loop over articles and put them in each spot
      for (i = 1; i < 7; i++) {
        $("#heading"+i + " a").text(json.articles[i].title)
        $("#heading"+i + " a").attr("href", json.articles[i].url)

        $("#content"+i).text(json.articles[i].description)
      }
    })

let getPosition = function() {
  navigator.geolocation.getCurrentPosition(onPositionUpdated)
}

let onPositionUpdated = function(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  getWeather(latitude, longitude)
}

let updateWidget = function(json) {

  let temperature = Math.round(json.main.temp)
  let symbol = json.weather[0].icon

  $("#weather").text(temperature + "\u2109")

}



let getWeather = function(latitude, longitude) {

  let apiKey = '3b76fa94ec7997ae4fd14402af2bbc1a'; // REPLACE THIS VALUE with your own key.

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);

}
let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }

getPosition()
