$('document').ready(function () {
    let quotes = [];

    $.ajax({
        url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        success: function (data) {
            quotes = JSON.parse(data).quotes;
            const randomQuote = getQuoteRandom(quotes)
            renderQuote(randomQuote)
        }
    })

    $('#btn-new-quote').click(function(){
        renderQuote(getQuoteRandom(quotes))
    })
})



function getQuoteRandom(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];

    function renderQuote(randomQuote) {
        $('.quote').text(randomQuote.quote)
        $('.author').text(randomQuote.author)
    }
}