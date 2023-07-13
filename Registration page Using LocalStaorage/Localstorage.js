document.addEventListener("DOMContentLoaded",()=>{
    
    let data = JSON.parse( localStorage.getItem("localdata"))
    console.log(data)
    var allspantags = document.getElementById("personalInfo").getElementsByTagName("span")
        for(tags of allspantags){
            val=tags.id
            document.getElementById(tags.id).innerHTML = data[val]?data[val]:"NA";
        }
    
})