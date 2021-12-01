$(".close-modal-button").click(function(){
    let modal_id = $(this).attr("data-close")
    $(modal_id).fadeOut()
})

$(".modal-dismissable").click(function(e){
    let modal_id = $(this).attr("id")
    $("#"+modal_id).fadeOut()
})

$(".modal-dismissable>div").click(function(e){
    e.stopPropagation()
})

function getHeaderByIds(userIds){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getHeaderByIds",
        method: "POST",
        data: {"userIds[]": userIds},
        success: function(res){

            console.log(res)

            for(let i=0; i<res.length;i++){
                className = ".user-header-" + res[i]['user']['id']
                headerURL = res[i]['header']

                if(headerURL!=null){
                    $(className).attr("src", headerURL)
                }

            }
        }
    })
}

function goToUser(uid){
    window.location = "/cat/u/"+uid;
    // $(".cat-collection").html('')

    // $.ajax({
    //     headers: {
    //         'X-CSRFToken': csrftoken
    //     },
    //     url: "/cat/getAllCatFromUser",
    //     method: "POST",
    //     data: {"userID": uid},
    //     success: function(result){
            
    //         for(let i=0; i<result.length;i++){
    //             $(".cat-collection").append('<canvas class="one-cat-collection" id="fu-cat-'+result[i]['id']+'"></canvas>')

    //             draw("fu-cat-"+result[i]['id'], result[i])
    //         }

    //         $("#total-cats").text(result.length)

    //     }
    // })
    // if(foundUsers[uid]['header']!=null){
    //     $("#fu-modal-header").attr("src", foundUsers[uid]['header'])
    // }
    
    // $("#fu-modal-name").text(foundUsers[uid]['user']['username'])
    // $("#fu-modal-about").text(foundUsers[uid]['about'])
    // $("#follow-button").html('<i class="fas fa-spinner fa-spin"></i>')
    // $("#found-user-modal").fadeIn()

    // $.ajax({
    //     headers: {
    //         'X-CSRFToken': csrftoken
    //     },
    //     url: "/cat/checkSubscription",
    //     method: "POST",
    //     data: {"target_id": uid},
    //     success: function(res){

    //         if(res==1){
    //             $("#follow-button").html('Stop Follow')
    //             $("#follow-button").removeClass("btn-submit")
    //             $("#follow-button").addClass("btn-cancel")
    //             $("#follow-button").attr("onclick", "stopFollowInModal("+uid+")")
    //         }else{
    //             $("#follow-button").html('Follow <i class="fas fa-user-plus"></i>')
    //             $("#follow-button").attr("onclick", "startFollowInModal("+uid+")")
    //         }
    //     }
    // })
}


function startFollowInModal(uid){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/subscribe",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){

            if(res=="success"){
                $("#follow-button").html('Stop Follow')
                $("#follow-button").removeClass("btn-submit")
                $("#follow-button").addClass("btn-cancel")
                $("#follow-button").attr("onclick", "stopFollowInModal("+uid+")")
            }else{
                alert(res)
            }
        }
    })
}

function stopFollowInModal(uid){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/unsubscribe",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){
            
            if(res=="success"){
                $("#follow-button").html('Follow <i class="fas fa-user-plus"></i>')
                $("#follow-button").addClass("btn-submit")
                $("#follow-button").removeClass("btn-cancel")
                $("#follow-button").attr("onclick", "startFollowInModal("+uid+")")
            }else{
                alert(res)
            }
        }
    })
}