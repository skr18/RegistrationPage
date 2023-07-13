document.addEventListener("DOMContentLoaded",()=>{
    let responce =decodeURIComponent( document.cookie).split("=")
    var responcedata= responce[1].split('%');
    data = JSON.parse( responcedata)
    
    var allspantags = document.getElementById("personalInfo").getElementsByTagName("span")
        for(tags of allspantags){
            val=tags.id
            document.getElementById(tags.id).innerHTML = data[val]?data[val]:"NA";
        }
})