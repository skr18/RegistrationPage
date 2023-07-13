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

var errormsg = new Array();
var firstname = document.getElementById("firstnameinp")
var lastname = document.getElementById("lastnameinp")
var email = document.getElementById("emailinp")
var dob = document.getElementById("dobinp")
var gender = document.getElementById("genderinp") 

copyDataDiv.addEventListener("click",async()=>{
    
    var copyCheckbox = document.getElementById("copydataCheckbox");
    if(copyCheckbox.checked == true){
        copyCheckbox.checked = false;
    }else{
            copyCheckbox.checked = true
    }
            
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

        option2.text = "Tap To Select State";
        presentState.add(option2)

        let option3 = document.createElement("option")
        option3.selected=true
        option3.disabled=true
        option3.hidden=true

        option3.text = "Tap To Select Cities";
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
//---------------------------------------Validation Start -----------------------------------------------------
//user profile validation
//user photo
let cons = document.getElementById("profileimg")
cons.addEventListener("change",function (e){
    let newsrc = URL.createObjectURL(e.target.files[0])
    photo.setAttribute("src",newsrc);
})

//user info input


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

function checkforValue(e,id){
    if(e.target.value==""){
        errormsg[id].style.visibility="visible"
        errormsg[id].status=true;
    }else{
        errormsg[id].style.visibility="hidden"
        errormsg[id].status=false;
    }
}

firstname.addEventListener('input',(e)=>{
   checkforValue(e,0);
})

lastname.addEventListener('input',(e)=>{
    checkforValue(e,1);
})

email.addEventListener('input',(e)=>{
    checkforValue(e,2);
})

dob.addEventListener('input',(e)=>{
    checkforValue(e,3);
})

gender.addEventListener('change',(e)=>{
    checkforValue(e,4);
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
    checkforValue(e,5);
})

permanentPostal.addEventListener('input',(e)=>{
    checkforValue(e,6);
})

permanentCountry.addEventListener('input',(e)=>{
    checkforValue(e,7);
})

permanentState.addEventListener('input',(e)=>{
    checkforValue(e,8);
})

permanentCity.addEventListener('input',(e)=>{
    checkforValue(e,9);
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
    checkforValue(e,10);
})

presentPostal.addEventListener('input',(e)=>{
    checkforValue(e,11);
})

presentCountry.addEventListener('input',(e)=>{
    checkforValue(e,12);
})

presentState.addEventListener('input',(e)=>{
    if(presentCountry.value==""){

    }
    checkforValue(e,13);
})

presentCity.addEventListener('input',(e)=>{
    checkforValue(e,14);
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
        var allhobbies = document.getElementById("hobbiesDiv").getElementsByTagName("label")
        for(tags of allhobbies){
            let hobbycheckbox = document.getElementById(tags.id).getElementsByTagName("input")
            if(hobbycheckbox[0].checked){
                hobbbyvalue+=hobbycheckbox[0].value +", "
            }
        }
        userHobbies.innerHTML = hobbbyvalue
    
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
            if(tags.value=""){
                document.getElementById(tags.attributes.data_id.value).innerHTML = "Na"
            }
        }
        if(checkbox.checked==true){
            userSubcription.innerHTML="Yes"
        }else{
            userSubcription.innerHTML="No"
        }
    }
})

var hobbyButton = document.getElementsByClassName("hobbies")[0]
hobby.addEventListener("click",(e)=>{
    e.preventDefault()
    if(hobbyButton.style.display=="flex"){
        hobbyButton.style.display="none"
    }else{
        hobbyButton.style.display="flex"
    }
})
