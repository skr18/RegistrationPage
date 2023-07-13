function uploadData(objectData){
    localStorage.setItem("localdata",`${JSON.stringify(objectData)}`)
    location.href="/DisplayPage.html"
}