let expandMenu = 0;

$("#menu-expand").click(function(){
    if(expandMenu == 0){
        $("nav>ul>li").css("display", "list-item")
        $("nav").css("height", "320px")
        expandMenu = 1
    }else{
        $("nav>ul>li").css("display", "none")
        $(this).css("display", "list-item")
        $("nav").css("height", "60px")
        expandMenu = 0
    }
})

// below is related to the user banner and pop-up modal
$("#user-banner").click(function(e){
    e.preventDefault()

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getUserDetail",
        method: "GET",
        success: function(result){
            console.log(result)

            if(result['user_info']['header']!=null){
                $("#user-info-header").attr("src", result['user_info']['header'])
            }

            $("#user-info-about").val(result['user_info']['about'])
            $("#user-info-about").data("origin", result['user_info']['about'])
            
            $("#user-info-birthday").val(result['user_info']['birthdate'])
            $("#user-info-birthday").data("origin", result['user_info']['birthdate'])

            $("#user-info-ip").text(result['ip_info']['ip'])
            if(result['ip_info']['region_name']!=null){
                $("#user-info-location").text(result['ip_info']['region_name'])
            }
            $("#user-info-modal").fadeIn()
        }
    })
})

// $("#user-banner").click()

// $("#user-info-header").hover(function(){
//     $("#user-info-header").data("src", $("#user-info-header").attr("src"))
//     $("#user-info-header").attr("src", "/static/cat/img/upload-icon.png")
// }, function(){
//     $("#user-info-header").attr("src", $("#user-info-header").data("src"))
// })

$("#user-info-header").click(function(){
    croppieContainer.hide()
    $("#choose-image-button").show()
    $("#upload-edited-header").prop("disabled", true)
    $("#upload-header-modal").fadeIn()
})

$("#user-info-about").blur(function(){

    let originAbout = $(this).data("origin")
    let newAbout = $(this).val()

    if(originAbout.trim() === newAbout.trim()){
        console.log("nothing has changed")
        return 0
    }

    ajaxOnBlur("/cat/updateUserAbout", newAbout, "#user-info-about")

})

$("#user-info-birthday").blur(function(){

    let originBirthday = $(this).data("origin")
    let newBirthday = $(this).val()

    if(originBirthday.trim() === newBirthday.trim()){
        console.log("nothing has changed")
        return 0
    }

    ajaxOnBlur("/cat/updateUserBirthday", newBirthday, "#user-info-birthday")

})

function ajaxOnBlur(postURL, postInfo, selector){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: postURL,
        method: "POST",
        data: {"new-info": postInfo},
        success: function(res){
            if(res == "1"){
                $(selector).css({"border-color": "green", "color": "green"})
            }else{
                $(selector).css({"border-color": "red", "color": "red"})
            }

            setInterval(function(){
                $(selector).css({"border-color": "black", "color": "black"})
            }, 1500)
        }
    })
}

$("#clear-header-editor").click(function(){
    croppieContainer.hide()
    $("#choose-image-button").show()
})

// $("#upload-header-modal").show()

var croppieContainer = $(".croppie-area").croppie({
    viewport:{
        width: 180,
        height: 180
    },
    boundary: {
        height: 300
    }
})

$("#raw-image").change(function(){
    let rawImage = this.files[0]

    let reader = new FileReader()

    reader.onload = function(e){
        croppieContainer.croppie("bind",{
            url: e.target.result,
        })

        $("#choose-image-button").hide()
        croppieContainer.show()
        $("#upload-edited-header").prop("disabled", false)
    }
    
    reader.readAsDataURL(rawImage)
})

$("#upload-edited-header").click(function(){
    croppieContainer.croppie('result', 'base64').then(function(headerBase64){

        $.ajax({
            headers: {
                'X-CSRFToken': csrftoken
            },
            url: "/cat/uploadHeader",
            method: "POST",
            data: {"new_header": headerBase64},
            success: function(result){
                console.log(result)

                if(result == "1"){
                    $("#upload-header-modal").fadeOut()
                    $("#user-info-modal").hide()
                    $("#user-banner").click()
                }else{
                    console.log("please try again")
                }
            }
        })
    })
})
