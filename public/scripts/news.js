$(document).ready(function(){
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

            <small>${data.source.name}</small>
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
