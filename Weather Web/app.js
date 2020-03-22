$('document').ready(function () {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?id=1581298&appid=9cc747ed3457f77c3b4daf1950e83e8e"
        , success: function (data) {
            console.log(data)
            // $("#div1").text(data.weather[0].main);
            var icons = new Skycons({ "color": "orange" });
            // you can add a canvas by it's ID...
            icons.add("clear-day", Skycons.PARTLY_CLOUDY_DAY);
            icons.set("rain", Skycons.RAIN);


            icons.play();
        }
    });

    // var skycons = new Skycons({ "color": "pink" });
    // skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
    
})