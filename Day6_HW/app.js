$('document').ready(function () {
    $.ajax({
        url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        , method: 'GET'
        , success: function (data) {
            let transformData = JSON.parse(data)
            let dataLength = transformData.quotes.length
            let randomNumber = Math.floor(Math.random() * dataLength)
        
            let color = getRandomColor()

            $('div').css(
            { "background-color": `#fff`,
              "margin": "0 auto",
              "width": "550px",
              "padding": "40px"
            
            })
            $('h1').text(transformData.quotes[randomNumber].quote)
            $('h2').text(transformData.quotes[randomNumber].author)
            $('body').css(
                {
                    "background": color,
                    "color": color
                })
            $('button').css({
                "color": '#fff',
                "border-radius": '5px',
                "margin": "10px",
                "padding": "10px",
                "background":color
            })

            $('button').click(function () {
                let newColor = getRandomColor()
                randomNumber++;
                let red = randomNumber+20;
                let green = randomNumber+30;
                let blue = randomNumber+10;

                $('button').css({
                    "background": newColor,
                })
               
                $('h1').text(transformData.quotes[randomNumber].quote)
                $('h2').text(transformData.quotes[randomNumber].author)
                $('body').css(
                    {
                        "background": newColor,
                        "color": newColor
                    })

                console.log(randomNumber)
            })



        }
    });



})


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

