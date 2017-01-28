import $ from 'jquery';


//////* weatherInfoRequest.js */ /////
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var x = position.coords.latitude;
            var y = position.coords.longitude;

          var apiKey = "38f1a8448afce26ff47f8a716611da8e";

          //Dark Sky URL
          var weatherURL = "https://api.darksky.net/forecast/";

          //Cross-Origin URL to allow use on Chrome
          var corsURL = "https://cors-anywhere.herokuapp.com/";

          //Full Weather Forecast URL
          var fullURL = weatherURL + apiKey + "/" + x + "," + y;

          console.log(fullURL);

            $.ajax({
  url: fullURL,
  dataType: "jsonp",
  success: function (data) {
      console.log(data);

    var feelsLikeCel = parseFloat((data.currently.apparentTemperature - 32) * 5/9).toPrecision(3);

    console.log(feelsLikeCel);

    var tempData = {
      "summary": data.currently.summary,
      "location" : data.timezone,
      "temp":  data.currently.temperature + " Fº",
      "tempC": parseFloat((data.currently.temperature - 32) * 5/9).toPrecision(3),
      "feelsLike": "Feels like: " + data.currently.apparentTemperature + " Fº",
      "feelsLikeC": parseFloat((data.currently.apparentTemperature - 32) * 5/9).toPrecision(3),
      "icon": data.currently.icon,
      "wDetails": "<li>Humidity: " + data.currently.humidity + "</li>" +
          "<li> Cloud Cover: " + data.currently.cloudCover +"</li>" +
        "<li> Wind Speed: " +
                  data.currently.windSpeed +
        "</li>" +
        "<li> Visibility: " +     data.currently.visibility +
          "</li>",
                  "description": data.daily.summary
        }

      var skycons = new Skycons({"color": "yellow"});
      skycons.set("icon1", tempData.icon);
      skycons.play();

      function changeBackground(icon) {
          console.log(icon);
          switch(icon) {
              case "clear-day":
              case "clear-night":
                    $('body').addClass('sunny');
                    break;
              case "cloudy":
              case "partly-cloudy-day":
              case "partly-cloudy-night":
                    $('body').addClass('cloudy');
                    break;
              case "sleet":
              case "snow":
                    $('body').addClass('snowy');
                    break;
              case "wind":
                    $('body').addClass('windy');
                    break;
              case "fog":
                    $('body').addClass('foggy');
                    break;
              default:
                    $('body').addClass('windy')
                    break;
                  }
          }

      changeBackground(data.currently.icon);

   //////////
      $('.temp-info__feels-like').text(tempData.feelsLike);
      $('.temp-info__temp').text(tempData.temp);
      $("#w-details__ul").append(tempData.wDetails);
      $('.weather-window__h1').text(tempData.location);
      $('h2').text(tempData.summary);
      $('.news-box__p').text("Alert: " + tempData.description);

    /// Fº TO Cº METHOD ///



    $('.btn-system').click(function() {

        var button = document.getElementsByClassName("btn-system")[0].textContent;

      console.log(button);

      if (button === 'Celsius') {
           $('.temp-info__temp').text(tempData.tempC + " Cº");
           $('.temp-info__feels-like').text("Feels like: " + tempData.feelsLikeC + " Cº");
           $('.btn-system').text("Fahrenheit");
      } else {
          $('.temp-info__temp').text(tempData.temp);
          $('.temp-info__feels-like').text(tempData.feelsLike);
          $('.btn-system').text("Celsius");
      }
    });





  }

        });

    });

    } else {
        console.log("geolocation is not working");
   }

/*var URL = 'https://api.darksky.net/forecast/38f1a8448afce26ff47f8a716611da8e/' +  '; */

  // you can add a canvas by it's ID...
