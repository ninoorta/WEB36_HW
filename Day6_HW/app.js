$('document').ready(function(){
    $.ajax({url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    ,method: 'GET'
    ,success: function(data){
        let transformData = JSON.parse(data)
        let dataLength = transformData.quotes.length
        let ranDomNumber = Math.floor(Math.random() * dataLength)
        let randomQuote = transformData.quotes[ranDomNumber].quote
        let thisRandomAuthor = transformData.quotes[ranDomNumber].author

        $('div').css({"background-color":`#fff`})

        $('h1').text(randomQuote)
        $('h2').text(thisRandomAuthor)
        $('body').css(
        {
            "background": `rgb(${ranDomNumber},${ranDomNumber*2},${ranDomNumber/2})`
            ,"color": `rgb(${ranDomNumber},${ranDomNumber+50},${ranDomNumber+22})`
        })

     
      }});

})