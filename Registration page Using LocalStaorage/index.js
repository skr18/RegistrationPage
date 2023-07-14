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
      $(`#${$(`#state`).attr("errorId")}`)
        .text("State requried")
        .css("visibility", "visible");
      fetchdata("state", "states", country.value, "state_name");
    });
    $("#state").change(function () {
      $(`#${$(`#city`).attr("errorId")}`)
        .text("city requried")
        .css("visibility", "visible");
      fetchdata("city", "cities", state.value, "city_name");
    });

    fetchdata("presentCountry", "countries", "", "country_name");
    $("#presentCountry").change(function () {
      $(`#${$(`#presentState`).attr("errorId")}`)
        .text("State requried")
        .css("visibility", "visible");
      fetchdata("presentState", "states", presentCountry.value, "state_name");
    });
    $("#presentState").change(function () {
      $(`#${$(`#presentCity`).attr("errorId")}`)
        .text("city requried")
        .css("visibility", "visible");
      fetchdata("presentCity", "cities", presentState.value, "city_name");
    });
  }
  await initiate();

  $("#state").click(function () {
    checkforEmpty("state", "country");
  });
  $("#presentState").click(function () {
    checkforEmpty("presentState", "presentCountry");
  });
  $("#presentCity").click(function () {
    checkforEmpty("presentCity", "presentState");
  });
  $("#city").click(function () {
    checkforEmpty("city", "state");
  });

  function checkforEmpty(child, parent) {
    if ($(`#${parent}`).val() == null) {
      $(`#${$(`#${child}`).attr("errorId")}`)
        .text(`select ${parent} first`)
        .css("visibility", "visible");
    }
  }

  $("input").on("input", function () {
    let val = checkforEmptyData($(this), $(this).val() == 0);
  });
  $("select").on("input", function () {
    let val = checkforEmptyData($(this), $(this).val() == null);
  });

  async function fetchdata(child, url, parent, name) {
    $(`#${child}`).text("");
    $("<option/>", { selected: true, disabled: true, hidden: true })
      .text(`Tap To Select ${url}`)
      .appendTo(`#${child}`);
    const responce = await fetch(
      `https://www.universal-tutorial.com/api/${url}/${parent}`,
      {
        headers: {
          Authorization: `Bearer ${authtoken.auth_token}`,
          Accept: "application/json",
        },
      }
    );

    let datas = await responce.json();
    if(datas.length==0){
      $("<option/>", { value: parent }).text(parent).appendTo(`#${child}`);
    }else{
      for (let data of datas) {
        $("<option/>", { value: data[name] }).text(data[name]).appendTo(`#${child}`);
      }
    }
  }

  $("#copydataCheckbox").click(async function () {
    if ($("#copydataCheckbox")[0].checked) {
      let flag = checkforError("permanent-details");
      if (flag) {
        $("#presentAddressLine1").val($("#AddressLine1").val());
        $("#presentAddressLine2").val($("#AddressLine2").val());
        $("#present-postal").val($("#postal").val());
        $("#presentCountry").val($("#country").val());

        await fetchdata("presentState", "states", country.value, "state_name");
        $("#presentState").val($("#state").val());
        await fetchdata("presentCity", "cities", state.value, "city_name");
        $("#presentCity").val($("#city").val());
        checkforError("present-details");
      }else{
        $("#copydataCheckbox")[0].checked=false
      }
    } 
    else {
      $("#presentAddressLine1").val("");
      $("#presentAddressLine2").val("");
      $("#present-postal").val("");
      fetchdata("presentCountry", "countries", "", "country_name");
      fetchdata("presentState", "states", country.value, "state_name");
      fetchdata("presentCity", "cities", state.value, "city_name");
      console.log($("#copydataCheckbox")[0].checked)
      
    }
  });
  function checkforError(id) {
    let flag = 1;
    let cnt = 0;
    $(`#${id} input `).each(function () {
      if ($(this).attr("errorId")) {
        flag = checkforEmptyData($(this), $(this).val().length === 0);
        if (cnt == 0 && flag == 0) {
          $(`#${$(this).attr("errorId")}`)[0].scrollIntoView(false);
          cnt++;
        }
      }
    });
    $(`#${id} select `).each(function () {
      if ($(this).attr("errorId")) {
        flag = checkforEmptyData($(this), $(this).val() == null);
        if (cnt == 0 && flag == 0) {
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
      $(`#${$(id).attr("errorId")}`).css({"visibility":"hidden"});
      return 1;
    }
  }

  $("#hobby").click(function (e) {
    e.preventDefault();
    $("#hobbiesDiv").toggleClass("hobbiesVisible");
  });

  $("#profileimg").on("change", function (e) {
    let newsrc = URL.createObjectURL(e.target.files[0]);
    $("#photo").attr("src", newsrc);
  });

  $("#submitButton").click(function (e) {
    e.preventDefault();
    let flag = checkforError("userProfile");
    // email
    if(flag){
      $("#userHobbies").text("");
      let objectData ={}
      $("#userProfile input").each(function () {
        if ($(this).attr("data_id")) {
          $(`#${$(this).attr("data_id")}`).text(
            $(this).val() ? $(this).val() : "NA"
          );
          // console.log("sadas- ",$(`#${$(this).attr("data_id")}`)[0].id)
          objectData[$(`#${$(this).attr("data_id")}`)[0].id]=$(this).val()
        }
        if ($(this).attr("attrHobby")) {
          $("#userHobbies").append(this.checked ? $(this).val() + "," : "");
        }
        if ($(this).attr("attrChk")) {
          $("#userSubcription").text(this.checked ? "Yes" : "No");
          objectData["userSubcription"]= $("#userSubcription").html()
        }
      });
      
      $("#userProfile select").each(function () {
        if ($(this).attr("data_id")) {
          $(`#${$(this).attr("data_id")}`).text($(this).val());
          objectData[$(`#${$(this).attr("data_id")}`)[0].id]=$(this).val()
        }
      });
      objectData["userHobbies"]= $("#userHobbies").html()
      uploadData(objectData)
    }
  });
});
