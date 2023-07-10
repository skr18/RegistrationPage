function copydata(){
    var checked = document.getElementById("cp").checked;
    
    if(checked){

        var adl1 = document.getElementById("adl1").value;
        var adl2 = document.getElementById("adl2").value;
        var country = document.getElementById("country").value;
        var state = document.getElementById("state").value;
        var city = document.getElementById("city").value;
        var postal = document.getElementById("postal").value;               
        
        document.getElementById("padl1").value = adl1;
        document.getElementById("padl2").value = adl2;
        document.getElementById("pcountry").value = country;
        document.getElementById("pstate").value = state;
        document.getElementById("pcity").value = city;
        document.getElementById("p-postal").value = postal;

    }
    else{
        document.getElementById("padl1").value = "";
        document.getElementById("padl2").value = "";
        document.getElementById("pcountry").value = pcountry.options[0].value;
        document.getElementById("pstate").value = pstate.options[0].value;
        document.getElementById("pcity").value = pcity.options[0].value;
        document.getElementById("p-postal").value = "";
    }
}

function hob(){
   
}
var authtoken;
async function initiate(){

    var req = await fetch("https://www.universal-tutorial.com/api/getaccesstoken",{
    
    headers:{
        "Accept": "application/json",
        "api-token": "QXbOD1ZwyZV2sxx8mcbeKOhKAe5ve9m1I8mJIoJ1O4UCHSNHWamKU2QjZNT0mFpt5bQ",
        "user-email": "sujeetrath48@gmail.com"
    }});
    
    
    authtoken = await req.json();
}

initiate();

async function fetchcountry(){

    const responce = await fetch("https://www.universal-tutorial.com/api/countries",{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })

    const datalist = await responce.json();
    console.log(datalist)


    for(let i=0;i<datalist.length;i++){

        var opt1 = document.createElement("option")
        opt1.value = datalist[i].country_name;
        opt1.text = datalist[i].country_name;

        country.add(opt1)
        // fetchstate()
    }  
}
async function pfetchcountry(){

    const responce = await fetch("https://countriesnow.space/api/v0.1/countries/positions")

    const datalist = await responce.json();


    for(let i=0;i<datalist.data.length;i++){

        var opt1 = document.createElement("option")
        opt1.value = datalist.data[i].name;
        opt1.text = datalist.data[i].name;

        pcountry.add(opt1)
        // fetchstate()
    }  
}

async function fetchstate(){

    state.innerHTML = ""

    let country = document.getElementById("country").value

    const responce = await fetch(`https://www.universal-tutorial.com/api/states/${country}`,{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })

    const datalist = await responce.json();

    console.log(datalist)

    if(datalist.length==0){

        var opt2 = document.createElement("option")
        opt2.value = country
        opt2.text = country
        state.add(opt2)       
    }
    
    for(let i=0;i<datalist.length;i++){
        var opt1 = document.createElement("option")
        
        opt1.value = datalist[i].state_name;
        
        opt1.text = datalist[i].state_name;
        state.add(opt1)
    }

}

// QXbOD1ZwyZV2sxx8mcbeKOhKAe5ve9m1I8mJIoJ1O4UCHSNHWamKU2QjZNT0mFpt5bQ



let cons = document.getElementById("profileimg")
cons.addEventListener("change",function (e){
   
    let newsrc = e.target.files[0].name
    console.log(newsrc)
    photo.setAttribute("src",newsrc);
})


