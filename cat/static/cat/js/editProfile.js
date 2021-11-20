$(document).ready(function(){
    console.log("you can edit this person")

    $("#user-banner").addClass("active")

    let headerURL = $(".found-user-header").data("header-url")
    if(headerURL != ""){
        $(".found-user-header").attr("src", "/media/"+headerURL)
        $("#user-info-header").attr("src", "/media/"+headerURL)
        
    }
    getAllCatFromUser()
})

function getAllCatFromUser(){

    $(".cat-collection").html("")
    $(".cat-collection").show()

    let uid = $(".found-user-name").data("uid")

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getAllCatFromUser",
        method: "POST",
        data: {"userID": uid},
        success: function(result){
            
            for(let i=0; i<result.length;i++){
                $(".cat-collection").append('<div class="one-cat-collection"><canvas id="one-cat-'+result[i]['id']+'"></canvas><div>Manage</div></div>')
    
                draw("one-cat-"+result[i]['id'], result[i])
            }
    
            $("#cat-count").html(result.length)
        }
    })
}

$("#edit-info").click(function(){
    $("#user-info-about").data("origin", $("#user-info-about").val())
    $("#user-info-fname").data("origin", $("#user-info-fname").val())
    $("#user-info-lname").data("origin", $("#user-info-lname").val())
    $("#user-info-modal").fadeIn()
})

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
    if(newAbout.trim().length > 150){
        alert("No more than 200 characters, please!")
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

$("#user-info-fname").blur(function(){

    let originFirstName = $(this).data("origin")
    let newFirstName = $(this).val()

    if(originFirstName.trim() === newFirstName.trim()){
        console.log("nothing has changed")
        return 0
    }
    if(newFirstName.trim().length > 150){
        alert("No more than 150 letters, please!")
        return 0
    }

    ajaxOnBlur("/cat/updateUserFirstName", newFirstName, "#user-info-fname")
})

$("#user-info-lname").blur(function(){

    let originLastName = $(this).data("origin")
    let newLastName = $(this).val()

    if(originLastName.trim() === newLastName.trim()){
        console.log("nothing has changed")
        return 0
    }
    if(newLastName.trim().length > 150){
        alert("No more than 150 letters, please!")
        return 0
    }

    ajaxOnBlur("/cat/updateUserLastName", newLastName, "#user-info-lname")
})

function ajaxOnBlur(postURL, postInfo, selector){
    let uid = $(".found-user-name").data("uid")
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: postURL,
        method: "POST",
        data: {"new-info": postInfo, "targetUserID": uid},
        success: function(res){
            console.log(res)

            if(res == "1"){
                $(selector).css({"border-color": "green", "color": "green"})
                $(selector).data("origin", $(selector).val())
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
    let uid = $(".found-user-name").data("uid")
    croppieContainer.croppie('result', 'base64').then(function(headerBase64){
        $.ajax({
            headers: {
                'X-CSRFToken': csrftoken
            },
            url: "/cat/uploadHeader",
            method: "POST",
            data: {"new_header": headerBase64, "targetUserID": uid},
            success: function(result){

                if(result != "0"){
                    $("#upload-header-modal").fadeOut()

                    let headerURL = result
                    $(".found-user-header").attr("src", "/media/"+headerURL)
                    $("#user-info-header").attr("src", "/media/"+headerURL)
                }else{
                    console.log("please try again")
                }
            }
        })
    })
})