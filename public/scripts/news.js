
var newsdesk = document.getElementById("newsdesk");
let newsdata;
var url =
  " https://newsapi.org/v2/everything?q=bitcoin&apiKey=74b81f9edfdf4a798adbb6ef523e4996";


function createNewsBox(data){
    var div = document.createElement('div');
    div.className = "newsbox";
    var h2 = document.createElement('h3');
    h2.innerText = data.title;
    div.appendChild(h2); 
    var disc = document.createElement('p');
    disc.innerText = data.description;
    var pb = document.createElement('p');
    pb.innerText="Source : " +  data.source.name;
    var a = document.createElement('a');
    a.href = data.url;
    a.innerText = "Visit Site"
    a.target = "_blank"
    div.appendChild(disc);
    div.appendChild(pb);
    div.append(a);
    return div;
}

function createelemts(data){
    for (const item of data.articles) {
        newsdesk.append(createNewsBox(item));
    }
}

fetch(url)
  .then((res, rej) => {
    return res.json();
  })
  .then((data) => {
    console.log(data)
    createelemts(data);
  });
