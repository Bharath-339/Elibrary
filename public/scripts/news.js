{$(document).ready(function(){
  apikey = "c823a0f0eb0fc7771ab2fce283270e32";
  url =
    "https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=" +
    apikey;

  let newsHtml = function (data,i) {
    return $(`<div class="outer-box">
    <div class="news">
        <div class="news-img">
            <img src="${data.image}" alt="">
        </div>
        <div class="news-desc">
            <h1>${data.title}</h1>

            <p>${data.description}</p>

            <small>Source : ${data.source.name}</small>
            <button class="more"><i class="fa-solid fa-arrow-down-long"></i></button>
        </div>
    </div>

    <div class="content" style="display: none;"  id="content-${i}">
                ${data.content}
    </div>
</div>`);
  };

  $('#newsdesk').on('click','div.outer-box',function(){
    let children = $(this).children()
    $(children[1]).toggle()
  })
  
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
      console.log(data);
      createNews(data.articles);
    });


});



const url2 = 'http://localhost:5000/api/news/data';


function card(data,url){
        return (`
        <div class="card" id = "${data._id}">
        <div class="card-img" style="background-image: url("${url}");">
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
}