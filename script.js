var permanentAddressLine1 = document.getElementById("adl1");
var permanentAddressLine2 = document.getElementById("adl2");
var permanentCountry = document.getElementById("country");
var permanentState = document.getElementById("state");
var permanentCity = document.getElementById("city");
var permanentPostal = document.getElementById("postal");

var presentAddressLine1 = document.getElementById("padl1");
var presentAddressLine2 = document.getElementById("padl2");
var presentCountry = document.getElementById("pcountry");
var presentState = document.getElementById("pstate");
var presentCity = document.getElementById("pcity");
var presentPostal = document.getElementById("p-postal");



var copyCheckbox = document.getElementById("copydataCheckbox");
copyCheckbox.addEventListener("click",async()=>{

    // let checkbox = document.getElementById("copydataCheckbox")
    // if(checkbox.checked == true){
    //     checkbox.checked = false;
    // }else{
    //     checkbox.checked = true
    // }
    
    let flag = 0
    for(let i=5;i<=9;i++){
        if(errormsg[i].status==true){
            flag=1
        }
    }
    if(copyCheckbox.checked==true && flag==1){
        document.getElementById("copydataCheckbox").checked=false
        for(let i=5;i<=9;i++){
            if(errormsg[i].status==true){
                errormsg[i].style.visibility="visible"
            }
        } 
        console.log("heyyy")
    }
    else if(copyCheckbox.checked==true && flag==0){
          
        presentAddressLine1.value = permanentAddressLine1.value
        presentAddressLine2.value = permanentAddressLine2.value
        presentPostal.value = permanentPostal.value
        presentCountry.value = permanentCountry.value;

        await pfetchstate()
        presentState.value = permanentState.value;

        await pfetchcity()
        presentCity.value = permanentCity.value;

        for(let i=10;i<=14;i++){
            errormsg[i].style.visibility="hidden"
            errormsg[i].status=false;
        }
    }
    else{
        console.log("elsle")
        presentAddressLine1.value="";
        presentPostal.value=""

        let option1 = document.createElement("option")
        option1.selected=true
        option1.disabled=true
        option1.hidden=true
    
        option1.text = "Tap To Select Country";
        presentCountry.add(option1)

        let option2 = document.createElement("option")
        option2.selected=true
        option2.disabled=true
        option2.hidden=true

        option1.text = "Tap To Select State";
        presentState.add(option2)

        let option3 = document.createElement("option")
        option3.selected=true
        option3.disabled=true
        option3.hidden=true

        option1.text = "Tap To Select Cities";
        presentCity.add(option3)

    }
})

var authtoken;
var allcountry ,allstate , allcities

async function initiate(){

    var req = await fetch("https://www.universal-tutorial.com/api/getaccesstoken",{
    
    headers:{
        "Accept": "application/json",
        "api-token": "QXbOD1ZwyZV2sxx8mcbeKOhKAe5ve9m1I8mJIoJ1O4UCHSNHWamKU2QjZNT0mFpt5bQ",
        "user-email": "sujeetrath48@gmail.com"
    }});
    
    
    authtoken = await req.json();

    const responce = await fetch("https://www.universal-tutorial.com/api/countries",{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })

    allcountry = await responce.json();
    fetchcountry()
    pfetchcountry()
}

initiate();

async function fetchcountry(){

    permanentCountry.innerHTML = ""

    let opt = document.createElement("option")   
    opt.selected=true
    opt.disabled=true
    opt.hidden=true
    
    opt.text = "Tap To Select Country";
    permanentCountry.add(opt)

    for(let i=0;i<allcountry.length;i++){
        var opt1 = document.createElement("option")
        opt1.value = allcountry[i].country_name;
        opt1.text = allcountry[i].country_name;
        permanentCountry.add(opt1)
    }

    let countryselected = document.getElementById("country")
    countryselected.addEventListener("change",()=>{
        fetchstate()
    })
}
async function pfetchcountry(){

        presentCountry.innerHTML = ""

        let opt = document.createElement("option")   
        opt.selected=true
        opt.disabled=true
        opt.hidden=true
        
        opt.text = "Tap To Select Country";
        presentCountry.add(opt)

    for(let countries of allcountry){
        var opt1 = document.createElement("option")
        opt1.value = countries.country_name;
        opt1.text = countries.country_name;
        presentCountry.add(opt1)
    }
    let countryselected = document.getElementById("pcountry")
    countryselected.addEventListener("change",()=>{
        pfetchstate()
    })
}

async function fetchstate(){

    permanentState.innerHTML = ""
    console.log(state)
    let opt = document.createElement("option")   
    opt.selected=true
    opt.disabled=true
    opt.hidden=true
    
    opt.text = "Tap To Select state";
    permanentState.add(opt)

    let country = document.getElementById("country").value
    const responce = await fetch(`https://www.universal-tutorial.com/api/states/${country}`,{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })

    allstate = await responce.json();
    
    for(let state of allstate){
        
        var opt1 = document.createElement("option")
        
        opt1.value = state.state_name;
        
        opt1.text = state.state_name;

        permanentState.add(opt1)
    }

    let stateselected = document.getElementById("state")
    stateselected.addEventListener("change",()=>{
        fetchcity()
    })
}

async function pfetchstate(){

    presentState.innerHTML = ""
    let opt = document.createElement("option")   
    opt.selected=true
    opt.disabled=true
    opt.hidden=true
    
    opt.text = "Tap To Select state";
    presentState.add(opt)

    let country = document.getElementById("pcountry").value
    const responce = await fetch(`https://www.universal-tutorial.com/api/states/${country}`,{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })

    allstate = await responce.json();
    
    for(let st of allstate){
        
        var opt1 = document.createElement("option")
        
        opt1.value = st.state_name;
        
        opt1.text = st.state_name;

        presentState.add(opt1)
    }

    let stateselected = document.getElementById("pstate")
    stateselected.addEventListener("change",()=>{
        console.log("what")
        pfetchcity()
    })
}

async function fetchcity(){

    permanentCity.innerHTML = ""
    let opt = document.createElement("option")   
    opt.selected=true
    opt.disabled=true
    opt.hidden=true
    
    opt.text = "Tap To Select city";
    permanentCity.add(opt)

    let state = document.getElementById("state").value
    const responce = await fetch(`https://www.universal-tutorial.com/api/cities/${state}`,{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })
    allcities = await responce.json();
    
    for(let cities of allcities){
        
        var opt1 = document.createElement("option")
        
        opt1.value = cities.city_name;
        
        opt1.text = cities.city_name;
        permanentCity.add(opt1)
    }

}

async function pfetchcity(){

    presentCity.innerHTML = ""
    let opt = document.createElement("option")   
    opt.selected=true
    opt.disabled=true
    opt.hidden=true
    
    opt.text = "Tap To Select city";
    presentCity.add(opt)

    let state = document.getElementById("pstate").value
    const responce = await fetch(`https://www.universal-tutorial.com/api/cities/${state}`,{
        headers:{
            "Authorization":`Bearer ${authtoken.auth_token}`,
            "Accept": "application/json"
        }
    })
    allcities = await responce.json();
    
    for(let cities of allcities){
        
        var opt1 = document.createElement("option")
        
        opt1.value = cities.city_name;
        
        opt1.text = cities.city_name;
        presentCity.add(opt1)
    }

}


// API -- QXbOD1ZwyZV2sxx8mcbeKOhKAe5ve9m1I8mJIoJ1O4UCHSNHWamKU2QjZNT0mFpt5bQ

//---------------------------------------Validation Start -----------------------------------------------------



//user profile validation

//user photo
let cons = document.getElementById("profileimg")
cons.addEventListener("change",function (e){
   
    let newsrc = URL.createObjectURL(e.target.files[0])
    console.log(newsrc)
    photo.setAttribute("src",newsrc);
})

//user info input
var errormsg = new Array();
var firstname = document.getElementById("firstnameinp")
var lastname = document.getElementById("lastnameinp")
var email = document.getElementById("emailinp")
var dob = document.getElementById("dobinp")
var gender = document.getElementById("genderinp")

errormsg[0]=document.getElementById("spanFirstName")
errormsg[0].status=true;
errormsg[1]=document.getElementById("spanLastName")
errormsg[1].status=true;
errormsg[2]=document.getElementById("spanEmail")
errormsg[2].status=true;
errormsg[3]=document.getElementById("spanDob")
errormsg[3].status=true;
errormsg[4]=document.getElementById("spanGender")
errormsg[4].status=true;

firstname.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[0].style.visibility="visible"
        errormsg[0].status=true;
    }else{
        errormsg[0].style.visibility="hidden"
        errormsg[0].status=false;
    }
})


lastname.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[1].style.visibility="visible"
        errormsg[1].status=true;
    }else{
        errormsg[1].style.visibility="hidden"
        errormsg[1].status=false;
    }
})

email.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[2].style.visibility="visible"
        errormsg[2].status=true;
    }else{
        errormsg[2].style.visibility="hidden"
        errormsg[2].status=false;
    }
})

dob.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[3].style.visibility="visible"
        errormsg[3].status=true;
    }else{
        errormsg[3].style.visibility="hidden"
        errormsg[3].status=false;
    }
})

gender.addEventListener('change',(e)=>{
    if(e.target.value==""){
        errormsg[4].style.visibility="visible"
        errormsg[4].status=true;
    }else{
        errormsg[4].style.visibility="hidden"
        errormsg[4].status=false;
    }
})

//permanent address validation

errormsg[5]=document.getElementById("spanAddress")
errormsg[5].status=true;

errormsg[6]=document.getElementById("spanpostal")
errormsg[6].status=true;

errormsg[7]=document.getElementById("spancountry")
errormsg[7].status=true;

errormsg[8]=document.getElementById("spanstate")
errormsg[8].status=true;

errormsg[9]=document.getElementById("spancity")
errormsg[9].status=true;

permanentAddressLine1.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[5].style.visibility="visible"
        errormsg[5].status=true;
    }else{
        errormsg[5].style.visibility="hidden"
        errormsg[5].status=false;
    }
})

permanentPostal.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[6].style.visibility="visible"
        errormsg[6].status=true;
    }else{
        errormsg[6].style.visibility="hidden"
        errormsg[6].status=false;
    }
})

permanentCountry.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[7].style.visibility="visible"
        errormsg[7].status=true;
    }else{
        errormsg[7].style.visibility="hidden"
        errormsg[7].status=false;
    }
})

permanentState.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[8].style.visibility="visible"
        errormsg[8].status=true;
    }else{
        errormsg[8].style.visibility="hidden"
        errormsg[8].status=false;
    }
})

permanentCity.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[9].style.visibility="visible"
        errormsg[9].status=true;
    }else{
        errormsg[9].style.visibility="hidden"
        errormsg[9].status=false;
    }
})


//persent address validation

errormsg[10]=document.getElementById("spanpadl1")
errormsg[10].status=true;

errormsg[11]=document.getElementById("spanp-postal")
errormsg[11].status=true;

errormsg[12]=document.getElementById("spanp-country")
errormsg[12].status=true;

errormsg[13]=document.getElementById("spanp-state")
errormsg[13].status=true;

errormsg[14]=document.getElementById("spanp-city")
errormsg[14].status=true;

presentAddressLine1.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[10].style.visibility="visible"
        errormsg[10].status=true;
    }else{
        errormsg[10].style.visibility="hidden"
        errormsg[10].status=false;
    }
})

presentPostal.addEventListener('input',(e)=>{
    if(e.target.value==""){
        errormsg[11].style.visibility="visible"
        errormsg[11].status=true;
    }else{
        errormsg[11].style.visibility="hidden"
        errormsg[11].status=false;
    }
})

presentCountry.addEventListener('input',(e)=>{
    if(e.target.value=="" && country.value==""){
        errormsg[12].style.visibility="visible"
        errormsg[12].status=true;
    }else{
        errormsg[12].style.visibility="hidden"
        errormsg[12].status=false;
    }
})

presentState.addEventListener('input',(e)=>{

    if(e.target.value=="" && state.value==""){
        errormsg[13].style.visibility="visible"
        errormsg[13].status=true;
    }else{
        errormsg[13].style.visibility="hidden"
        errormsg[13].status=false;
    }
})

presentCity.addEventListener('input',(e)=>{

    if(e.target.value=="" && state.value==""){
        errormsg[14].style.visibility="visible"
        errormsg[14].status=true;
    }else{
        errormsg[14].style.visibility="hidden"
        errormsg[14].status=false;
    }
})

submitButton.addEventListener('click',(e)=>{



    e.preventDefault();

    var inputEmail =document.getElementById("emailinp").value  
    var atposition=inputEmail.indexOf("@");  
    var dotposition=inputEmail.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=inputEmail.length){  
        alert("Please enter a valid e-mail address");
        const element = document.getElementById("emailinp");
        element.scrollIntoView(false);
        errormsg[2].style.visibility="visible"
    }
    let flag = false;
    for(i in errormsg){
        if(errormsg[i].status==true){
            errormsg[i].style.visibility="visible"
            if(flag==false){
                const element = document.getElementById(errormsg[i].id);
                element.scrollIntoView(false);
                flag=true;
            }
        }
    }
    
    
    if(flag==false){
        document.getElementsByClassName("userContainer")[0].style.display="block"

        
        var hobbbyvalue=""
    
        if(hobby1.checked==true){
            hobbbyvalue += hobby1.value + ", "
        }
        if(hobby2.checked==true){
            hobbbyvalue += hobby2.value + ", "
        }
        if(hobby3.checked==true){
            hobbbyvalue += hobby3.value + ", "
        }
        if(hobby4.checked==true){
            hobbbyvalue += hobby4.value
        }
    
        var allinputtags = document.getElementById("userProfile").getElementsByTagName("input")
        for(tags of allinputtags){
            if(tags.attributes.data_id){
    
                document.getElementById(tags.attributes.data_id.value).innerHTML = tags.value
            }
        }
    
        var allselecttags = document.getElementById("userProfile").getElementsByTagName("select")
        for(tags of allselecttags){
            if(tags.attributes.data_id){
                document.getElementById(tags.attributes.data_id.value).innerHTML = tags.value
            }
        }

        if(permanentAddressLine2.value==""){
            userPresentAddress2.innerHTML = "NA"
        }else{
            userPresentAddress2.innerHTML = permanentAddressLine2.value
        }

        if(presentAddressLine2.value==""){
            userPermanentAddress2.innerHTML = "NA"
        }else{
            userPermanentAddress2.innerHTML = presentAddressLine2.value
        }
        userHobbies.innerHTML = hobbbyvalue
        if(checkbox.checked==true){
            userSubcription.innerHTML="Yes"
        }else{
            userSubcription.innerHTML="No"
        }
    }
})

var checkbox = document.getElementById("subcriptionCheckBox")

checkbox.addEventListener("click",()=>{
    if(checkbox.checked == true){
        checkbox.checked = false;
    }else{
        checkbox.checked = true
    }
})

var hobbyButton = document.getElementsByClassName("hobbies")[0]
hobby.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(hobbyButton)
    if(hobbyButton.style.display=="flex"){
        hobbyButton.style.display="none"
    }else{
        hobbyButton.style.display="flex"
    }
})




