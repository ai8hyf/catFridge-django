$(document).ready(function(){
    
    let headerURL = $(".found-user-header").data("header-url")
    if(headerURL != ""){
        $(".found-user-header").attr("src", "/media/"+headerURL)
        $("#user-info-header").attr("src", "/media/"+headerURL)
    }

    $(".container").on("mouseover", ".sm-unfollow-button", function(){
        $(this).text("Unfollow")
    });
    $(".container").on("mouseout", ".sm-unfollow-button", function(){
        $(this).text("Following")
    });

    $(".cat-collection").on("click", ".expand", function(e){
        e.stopPropagation();
    })

    $('body').click(function () {
        $(".one-cat-dropdown").remove()
    });

    let uid = $(".found-user-name").data("uid")
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/checkSubscription",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){

            let btnID = "#follow-button-" + uid
            if(res==1){
                $(btnID).removeClass("sm-follow-button")
                $(btnID).addClass("sm-unfollow-button")
                $(btnID).text("Following")
                $(btnID).attr("onclick", "stopFollow("+uid+")")
            }else{
                $(btnID).addClass("sm-follow-button")
                $(btnID).removeClass("sm-unfollow-button")
                $(btnID).text("Follow")
                $(btnID).attr("onclick", "startFollow("+uid+")")
            }
        }
    })

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
                $(".cat-collection").append('<div class="one-cat-collection"><canvas id="one-cat-'+result[i]['id']+'"></canvas><div class="send-love-button" id="send-love-btn-'+result[i]['id']+'" onclick="sendLove('+result[i]['id']+')"><i class="far fa-heart"></i></div><div class="expand" id="one-cat-dropdown-'+result[i]['id']+'" onclick="showExpandDropDown('+result[i]['id']+')"><i class="fas fa-ellipsis-h"></i></div></div>')
    
                draw("one-cat-"+result[i]['id'], result[i])
            }
            
            $("#cat-count").html(result.length)
            checkLastLove()

        }
    })
}



function showExpandDropDown(catId){
    
    $("#one-cat-dropdown-" + catId).parent().append('<div class="one-cat-dropdown" hidden><div>About</div><div>Borrow</div></div>')

    $(".one-cat-dropdown").fadeIn()

    $(".one-cat-dropdown").click(function(e){
        e.stopPropagation();
    })
}

function sendLove(catId){
    
    let uid = $("#user-banner").data("uid")

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/sendLoveToCat",
        method: "POST",
        data: {"target_cat_id": catId, "sender_uid": uid},
        success: function(res){
            if(res!=1){

                let date = new Date(parseInt(res)*1000)
                let latestLove = date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+date.getHours()+
                ":"+date.getMinutes()+
                ":"+date.getSeconds()

                alert("You can only send love once every 7 days. The latest love was sent at "+latestLove)
            }

            let buttonSelector = "#send-love-btn-" + catId
            $("#send-love-btn-" + catId).html('<i class="fas fa-heart"></i>')
            $("#send-love-btn-" + catId).css("color", "red")

        }
    })
}   

function checkLastLove(){
    let target_uid = $(".found-user-name").data("uid")
    let uid = $("#user-banner").data("uid")
    
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/checkLove",
        method: "POST",
        data: {"target_user_id": target_uid, "sender_uid": uid},
        success: function(res){
            
            if(res!=0){
                for(let i=0;i<res.length;i++){
                    $("#send-love-btn-"+res[i]['target_cat']['id']).html('<i class="fas fa-heart"></i>')
                    $("#send-love-btn-"+res[i]['target_cat']['id']).css("color", "red")
                }
            }
        }
    })
}





function startFollow(uid){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/subscribe",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){

            if(res=="success"){
                let btnID = "#follow-button-" + uid
                $(btnID).removeClass("sm-follow-button")
                $(btnID).addClass("sm-unfollow-button")
                $(btnID).text("Following")
                $(btnID).attr("onclick", "stopFollow("+uid+")")
            }else{
                alert(res)
            }
        }
    })
}

function stopFollow(uid){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/unsubscribe",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){
            
            if(res=="success"){
                let btnID = "#follow-button-" + uid
                $(btnID).addClass("sm-follow-button")
                $(btnID).removeClass("sm-unfollow-button")
                $(btnID).text("Follow")
                $(btnID).attr("onclick", "startFollow("+uid+")")
            }else{
                alert(res)
            }
        }
    })
}




