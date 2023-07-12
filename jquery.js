$(document).ready(async function () {
  var authtoken;
  async function initiate() {
    var req = await fetch(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        headers: {
          Accept: "application/json",
          "api-token":
            "QXbOD1ZwyZV2sxx8mcbeKOhKAe5ve9m1I8mJIoJ1O4UCHSNHWamKU2QjZNT0mFpt5bQ",
          "user-email": "sujeetrath48@gmail.com",
        },
      }
    );
    authtoken = await req.json();

    fetchdata("country", "countries", "", "country_name");
    $("#country").change(function () {
      fetchdata("state", "states", country.value, "state_name");
    });
    $("#state").change(function () {
      fetchdata("city", "cities", state.value, "city_name");
    });

    fetchdata("pcountry", "countries", "", "country_name");
    $("#pcountry").change(function () {
      fetchdata("pstate", "states", pcountry.value, "state_name");
    });
    $("#pstate").change(function () {
      fetchdata("pcity", "cities", pstate.value, "city_name");
    });
  }
  await initiate();

  $("input").on("input", function () {
    let val = checkforEmptyData($(this), $(this).val() == 0);
  });
  $("select").on("input", function () {
    let val = checkforEmptyData($(this), $(this).val() == null);
  });

  async function fetchdata(id, url, country, name) {
    $(`#${id}`).text("")
    $('<option/>', {selected:true,disabled:true,hidden:true}).text(`Tap To Select ${id}`).appendTo(`#${id}`)
    const responce = await fetch(
      `https://www.universal-tutorial.com/api/${url}/${country}`,
      {
        headers: {
          Authorization: `Bearer ${authtoken.auth_token}`,
          Accept: "application/json",
        },
      }
    );

    let datas = await responce.json();
    for (let data of datas) {
      $("<option/>", { value: data[name] }).text(data[name]).appendTo(`#${id}`);
    }
  }

  $("#copydataCheckbox").click(async function () {
    if ($("#copydataCheckbox")[0].checked) {
      let flag = checkforError("permanent-details");
      if (flag) {
        $("#padl1")[0].value = $("#adl1")[0].value;
        $("#padl2")[0].value = $("#adl2")[0].value;
        $("#p-postal")[0].value = $("#postal")[0].value;
        $("#pcountry")[0].value = $("#country")[0].value;
        await fetchdata("pstate", "states", country.value, "state_name");
        $("#pstate")[0].value = $("#state")[0].value;
        await fetchdata("pcity", "cities", state.value, "city_name");
        $("#pcity")[0].value = $("#city")[0].value;
        checkforError("present-details");
      }
    }else {
      $("#padl1").val("")
      $("#padl2").val("")
      $("#p-postal").val("")
      fetchdata("pcountry", "countries", "", "country_name");
      fetchdata("pstate", "states", country.value, "state_name");
      fetchdata("pcity", "cities", state.value, "city_name");
    }
  });
  function checkforError(id) {
    let flag = 1;
    let cnt = 0;
    $(`#${id} input `).each(function () {
      if($(this).attr("errorId")){
        flag = checkforEmptyData($(this), $(this).val().length === 0);
        if(cnt==0 && flag==0){
          $(`#${$(this).attr("errorId")}`)[0].scrollIntoView(false);
          cnt++;
        }
      }
    });
    $(`#${id} select `).each(function () {
      if($(this).attr("errorId")){
        flag = checkforEmptyData($(this), $(this).val() == null);
        if(cnt==0 && flag==0){
          $(`#${$(this).attr("errorId")}`)[0].scrollIntoView(false);
          cnt++;
        }
      }
    });
    return flag;
  }
  function checkforEmptyData(id, flag) {
    if (flag) {
      $(`#${$(id).attr("errorId")}`).css("visibility", "visible");
      return 0;
    } else {
      $(`#${$(id).attr("errorId")}`).css("visibility", "hidden");
      return 1;
    }
  }

  $("#hobby").click(function (e) {
    e.preventDefault();
    $("#hobbiesDiv").toggleClass("hobbies1");
  });

  $("#profileimg").on("change",function (e){
    let newsrc = URL.createObjectURL(e.target.files[0])
    $("#photo").attr("src",newsrc);
  })

  $("#submitButton").click(function (e) {
    e.preventDefault();
    let val = checkforError("userProfile");
    // email ,scrollinto view
    if(val)
    $("#userHobbies").text("");
    $("#userProfile input").each(function () {
      if ($(this).attr("data_id")) {
        $(`#${$(this).attr("data_id")}`).text($(this).val()?$(this).val():"NA");
      }
      if ($(this).attr("attrHobby")) {
        $("#userHobbies").append(this.checked ? $(this).val() + "," : "");
      }
      if ($(this).attr("attrChk")) {
        $("#userSubcription").text(this.checked ? "Yes" : "No");
      }
    });

    $("#userProfile select").each(function () {
      if ($(this).attr("data_id")) {
        $(`#${$(this).attr("data_id")}`).text($(this).val());
      }
    });
  });
});
