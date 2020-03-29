
$('document').ready(function () {
  $("#search").submit(function (e) {
    e.preventDefault();
    // Disable Button Submit
    $("#btn-submit").attr("disabled","disabled");
    const userInput = $('#keyword').val();
    $("#result-list").html('');
    if(userInput !== ""){
      $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${userInput}&type=video&key=AIzaSyBXXzuIkFukaT1UN9hIk_nDubsojh1DAJs`
        , success: function (data) {
          console.log(data)
          nextPageToken = data.nextPageToken;
          createNewRowCards(data);
          // Enable Button Submit
          $("#btn-submit").removeAttr("disabled");
        }
      });
    }
    
  });

  // $(window).load(f)

  let isLoadMore = false;
  $(window).on('scroll', function (event) {
    const userInput = $('#keyword').val();
    if ($(document).scrollTop() + 1 >= $(document).height() - $(window).height() && !isLoadMore) {
      console.log("load more");
      $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${userInput}&type=video&key=AIzaSyBXXzuIkFukaT1UN9hIk_nDubsojh1DAJs&pageToken=${nextPageToken}`
        , success: function (data) {
          if(!data.items){
            alert("Không còn kết quả tìm kiếm.")
          }
          isLoadMore = false;
          createNewRowCards(data);
        }
      })

    }
  })
})

function createNewRowCards(data) {

  let html = '';
  for (let i = 0; i < data.items.length; i += 5) {
    html += i % 5 == 0 ? `<div class="card-deck mb-3">`
      : ` `;

    for (let j = i; j < i + 5; j++) {
      if (j >= data.length) {
        break;
      } else {
        html +=
          `
          <div class="card style="width:25%;" ">
            <a href="https://www.youtube.com/watch?v=${data.items[j].id.videoId}" target="_blank">
                  <img src="${data.items[j].snippet.thumbnails.default.url}" class="card-img-top" alt="...">
            </a>
            <div class="card-body">
                <h5 class="card-title">${data.items[j].snippet.title}</h5>
                <p class="card-text">${data.items[j].snippet.description}</p>
            </div>
          </div>
                    
          `
      }
    }

    html += '</div>';
  }
  $("#result-list").append(html);

}

function showLoadingScreen(){
  $(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");;
	});
}