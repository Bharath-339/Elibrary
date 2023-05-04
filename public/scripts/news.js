{
  
  $(document).ready(function(){
  apikey = "c823a0f0eb0fc7771ab2fce283270e32";
  url =
    "https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=" +
    apikey;

  let newsHtml = function (data,i) {
    return $(`
    <div class="card news-card">
        <div class="news-img">
            <img src="${data.image}" alt="">
        </div>
        <div class="news-desc">
            <span>${data.title}</span>

            <p>${data.description.slice(0,150)}</p>

            <small>Source : ${data.source.name}</small>
      
        </div>
    </div>

    <div class="content" style="display: none;"  id="content-${i}">
                ${data.content}
    </div>`);
  };

  // $('#newsdesk').on('click','.news-card',function(){
  //   let children = $(this).children()
  //   $(children[1]).toggle()
  // })
  
  let createNews = function (data) {
   let box =  $(".newsdesk");
   let i =0;
    data.forEach(element => {
      box.append(newsHtml(element,i));
      i = i+1;
    });
  };

  fetch(url)
    .then((res, rej) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      createNews(data.articles);
    });


});



const url2 = 'http://localhost:5000/api/news/data';


function card(data,url){
        return (`
        <div class="card" id = "${data._id}">
        <div class="card-img">
        <img src="${url}" alt="">
        </div>
        <div class="card-content">
                <h2 class="card-title">
                    ${data.title}
                </h2>
    
                <p class="event-info">
                    ${data.description}
                </p>
                <p class="event-venue">
                    ${data.content}
                </p>
                <p class="event-venue">
                    Source : ${data.source}
                </p>
    
              <div class='button-div'>
                  <button class="read-more">
                          Read More
                  </button>
              </div>
            </div>
        </div>
        `)
}

function createTable(info){
    const {data} = info;
    if(data && data.length){
      const head = `<span class="center-text main-heading" >Today's university News</span>`
      $('#u-news').prepend(head)
    }
    data.forEach(element => {
        const images = element.images;
        console.log(images[0].url)
        $('#evts-container').append(card(element,images[0].url))
    });
}


fetch(url2)
    .then((res,rej)=>{
        return res.json();
    })
    .then((data)=>{
        createTable(data);
    })



const url3 = 'http://localhost:5000/api/articles/find';


function Articlecard(data){
        return (`
        <div class="card" id = "${data._id} ">
        <div class="card-content">
                <h2 class="card-title">
                    ${data.title}
                </h2>
    
                <p class="event-info">
                    ${data.description}
                </p>
                <p class="event-venue">
                    Source : ${data.source}
                </p>
    
              <div class='button-div'>
                  <button class="read-more download" data ="${data.pdf}">
                          click to read
                  </button>
              </div>
            </div>
        </div>
        `)
}


function createArticles(data){
    if(data && data.length){
      const head = `<span class="center-text main-heading" >Articles</span>`
      $('#articles').prepend(head)
    }
    // console.log(info)
    data.forEach(element => {
        $('#articles-container').append(Articlecard(element))
    });

    // console.log(info)
}


$('#articles-container').on('click','button.download',function(){
  var key = $(this).attr('data'); 
  const url = `http://localhost:5000/api/articles/find/${key}`;
        $.ajax({
          url: url,
          type: 'GET',
          success: function(response) {
            // Create a new window to display the response
            // Write the response to the new window
            window.open(response,'_blank')
            
          },
          error: function(xhr, status, error) {
            console.log('Error:', error);
          }
        });

})



fetch(url3)
      .then((res,rej)=>{
          return res.json();
      })
      .then((data)=>{
          console.log(data)
          createArticles(data);
      })



}