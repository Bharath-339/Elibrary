{
    const url = 'http://localhost:5000/api/users/data';
    // const url = 'localhost:5000/api/users/data';

    function newRow(data,index){
        console.log(index , data);
        return (`
        <tr id = "${data._id}">
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.username}</td>
        </tr>
        `)
       
    }


    let createTable = function(info){
        const {data} = info;
        data.forEach(element => {
            var index = 1;
            if(element.username > 150){

                $('#users-table').append(newRow(element,index));
                index++;
            }
        });
        console.log(data)
    }


        fetch(url)
        .then((res,rej)=>{
            return res.json();
        })
        .then((data)=>{
            createTable(data);
        })
        
}