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

    let uid = $(".found-user-name").data("uid")
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/checkSubscription",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){

            console.log(res)

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
                $(".cat-collection").append('<div class="one-cat-collection"><canvas id="one-cat-'+result[i]['id']+'"></canvas><div class="expand"><i class="fas fa-ellipsis-h"></i></div></div>')
    
                draw("one-cat-"+result[i]['id'], result[i])
            }
    
            $("#cat-count").html(result.length)
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




