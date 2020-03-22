$('document').ready(function () {

  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            $.ajax({
                url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9cc747ed3457f77c3b4daf1950e83e8e`
                , success: function (data) {
                    
                    let weatherConditions = [];

                    $("#current-temp").text(Math.round((data.main.temp)/10) +'°C');
                    $("#location-header").text(data.name + ', ' + data.sys.country);
                    


                    console.log(data)
                    // $("#div1").text(data.weather[0].main);
                    var icons = new Skycons({ "color": "orange" });
                    // you can add a canvas by it's ID...
                    icons.add("clear-day", Skycons.PARTLY_CLOUDY_DAY);
                    icons.set("rain", Skycons.RAIN);
                    icons.add("weather-icon", Skycons.PARTLY_CLOUDY_DAY)
        
                    icons.play();
                }
            });
        });


    } else {
        alert("Geolocation is not supported by this browser.");
    }


    
})



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(layToaDo);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function layToaDo(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
}