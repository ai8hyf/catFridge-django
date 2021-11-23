checkNewNotification()

function getAllNotification(){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getAllNotification",
        method: "GET",
        success: function(result){  

            console.log(result)

            parseNotification(result)
        }
    })
}

function getNewNotification(){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getNewNotification",
        method: "GET",
        success: function(result){  

            console.log(result)

            parseNotification(result)

            checkNewNotification()
        }
    })
}

function parseNotification(result){
    $("#notification-content").html('')
            
    let notifications = result['type_0']
    let idLookUp = result['idLookUp']
    const userIds = new Set()

    for(let i=0; i<notifications.length;i++){

        userIds.add(notifications[i]['followed_by']['id'])

        $("#notification-content").append('<div class="one-notification" onclick="goToUser('+notifications[i]['followed_by']['id']+')"><img src="/static/cat/img/temp-header.png" alt="header photo" class="user-header-'+notifications[i]['followed_by']['id']+'"><div><strong>'+notifications[i]['followed_by']['username']+'</strong> started following you. <light></light></div></div>')
    }

    notifications = result['type_1']
    for(let i=0; i<notifications.length;i++){

        userIds.add(notifications[i]['love_sender']['id'])

        $("#notification-content").append('<div class="one-notification" onclick="goToUser('+notifications[i]['love_sender']['id']+')"><img src="/static/cat/img/temp-header.png" alt="header photo" class="user-header-'+notifications[i]['love_sender']['id']+'"><div><strong>'+notifications[i]['love_sender']['username']+'</strong> Loved <strong>'+notifications[i]['target_cat']['catName']+'</strong>. <light></light></div></div>')
    }

    if($("#notification-content").html() == ''){
        $("#notification-content").append('<div style="text-align:center;padding: 50px 10px 30px 10px;">Nothing new at this moment.</div>')
    }

    getHeaderByIds(Array.from(userIds))
}

function checkNewNotification(){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/checkNewNotification",
        method: "GET",
        success: function(result){  

            let notificationCount = result
            if(notificationCount > 99){
                notificationCount = '<i class="fas fa-ellipsis-h"></i>'
            }

            if(result>0){
                $("#notification-banner").html('<span class="fa-layers"><i class="fa fa-bell"></i><span class="fa-layers-counter">'+notificationCount+'</span></span>')
            }else{
                $("#notification-banner").html('<i class="fa fa-bell"></i>')
            }
        }
    })
}



$("#notification-banner").click(function(e){
    e.preventDefault()
    $("#notification-modal").fadeIn()
    $(".modal-tab").removeClass("modal-tab-selected")
    $("#new-nofitication-tab").addClass("modal-tab-selected")
    getNewNotification()
})

// $("#notification-banner").click()

$("#new-nofitication-tab").click(function(){
    $(".modal-tab").removeClass("modal-tab-selected")
    $(this).addClass("modal-tab-selected")
    getNewNotification()
})

$("#all-nofitication-tab").click(function(){
    $(".modal-tab").removeClass("modal-tab-selected")
    $(this).addClass("modal-tab-selected")
    getAllNotification()
})