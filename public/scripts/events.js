{
    const url = 'http://localhost:5000/api/events/data';


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
                            ${data.venue}
                        </p>
            
                        <button class="read-more">
                            Read More
                        </button>
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
    fetch(url)
        .then((res,rej)=>{
            return res.json();
        })
        .then((data)=>{
            createTable(data);
        })
}