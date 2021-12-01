$("#friends-banner").addClass("active")

var foundUsers = {}

function setFullHeightPanel(){
    let totalHeight = $(".container").height()
    let tabHeight = $(".header-select-tab").height()

    $(".full-height-panel").css("max-height", totalHeight-tabHeight)
}
setFullHeightPanel()

$(".container").on("mouseover", ".sm-unfollow-button", function(){
    $(this).text("Unfollow")
});
$(".container").on("mouseout", ".sm-unfollow-button", function(){
    $(this).text("Following")
});

$(".container").on("click", ".user-found", function(e){
    let uid = $(this).data("uid")
    console.log(uid)
    goToUser(uid)
});

$(".container").on("click", ".right-aligned-button", function(e){
    e.stopPropagation();
});


$("#follower-tab").click(function(){
    $(".header-select-tab>div").removeClass("selected")
    $(this).addClass("selected")
    $(".full-height-panel>div").hide()
    $(".following-panel").html('')
    $(".follower-panel").show()
    getFollower()
})

$("#following-tab").click(function(){
    $(".header-select-tab>div").removeClass("selected")
    $(this).addClass("selected")
    $(".full-height-panel>div").hide()
    $(".follower-panel").html('')
    $(".following-panel").show()
    getFollowing()
})


function getFollowing(){

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getFollowingByName",
        method: "POST",
        data: {"username": userName},
        success: function(res){
            
            $(".following-panel").html('')
            for(let i=0; i<res.length;i++){

                foundUsers[res[i]['user']['id']] = res[i]

                let userHeader = res[i]['header']

                if(userHeader == null){
                    userHeader = "/static/cat/img/temp-header.png"
                }

                $(".following-panel").append('<div class="user-found" data-uid='+res[i]['user']['id']+'><img src="'+userHeader+'" alt="header image" class="found-user-header"><div class="found-user-right"><div class="found-user-name"><span>'+res[i]['user']['username']+'</span><span id="follow-button-'+res[i]['user']['id']+'" class="right-aligned-button sm-unfollow-button" onclick=stopFollow('+res[i]['user']['id']+')>Following</span></div><div class="found-user-about">'+res[i]['about']+'</div></div></div>')
            }
            
        }
    })
}

function getFollower(){

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getFollowerByName",
        method: "POST",
        data: {"username": userName},
        success: function(res){

            let checkSubscriptionIds = []
            
            $(".follower-panel").html('')
            for(let i=0; i<res.length;i++){

                // for(let j=0; j<10; j++){
                //     checkSubscriptionIds.push(res[i]['user']['id'])
                //     $(".follower-panel").append('<div class="user-found"><img src="'+res[i]['header']+'" alt="header image" class="found-user-header"><div class="found-user-right"><div class="found-user-name"><span>'+res[i]['user']['username']+'</span><span id="follow-button-'+res[i]['user']['id']+'" class="right-aligned-button sm-follow-button" onclick=startFollow('+res[i]['user']['id']+')>Follow</span></div><div class="found-user-about">'+res[i]['about']+'</div></div></div>')
                // }

                foundUsers[res[i]['user']['id']] = res[i]

                let userHeader = res[i]['header']

                if(userHeader == null){
                    userHeader = "/static/cat/img/temp-header.png"
                }

                checkSubscriptionIds.push(res[i]['user']['id'])
                $(".follower-panel").append('<div class="user-found" data-uid='+res[i]['user']['id']+'><img src="'+userHeader+'" alt="header image" class="found-user-header"><div class="found-user-right"><div class="found-user-name"><span>'+res[i]['user']['username']+'</span><span id="follow-button-'+res[i]['user']['id']+'" class="right-aligned-button sm-follow-button" onclick=startFollow('+res[i]['user']['id']+')>Follow</span></div><div class="found-user-about">'+res[i]['about']+'</div></div></div>')
            }
            checkRelation(checkSubscriptionIds)
        }
    })
}

function checkRelation(ids){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getFollowingIds",
        method: "POST",
        data: {"target_ids": ids},
        success: function(res){
            for(let i=0; i<res.length;i++){
                let btnID = "#follow-button-" + res[i]["target"]["id"]

                $(btnID).removeClass("sm-follow-button")
                $(btnID).addClass("sm-unfollow-button")
                $(btnID).text("Following")
                $(btnID).attr("onclick", "stopFollow("+res[i]["target"]["id"]+")")
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

getFollower()