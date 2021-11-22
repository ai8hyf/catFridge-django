checkNewNotification()

function getAllNotification(){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getAllNotification",
        method: "GET",
        success: function(result){  

            $("#notification-content").html('')
            
            let notifications = result['type_0']
            let idLookUp = result['idLookUp']

            for(let i=0; i<notifications.length;i++){
                for(let j=0;j<5;j++){
                    $("#notification-content").append('<div class="one-notification" onclick="goToUser('+notifications[i]['followed_by']['id']+')"><img src="/static/cat/img/temp-header.png" alt="header photo" id="user-header-'+notifications[i]['followed_by']['id']+'"><div><strong>'+notifications[i]['followed_by']['username']+'</strong> started following you. <light></light></div></div>')
                }
            }

            if($("#notification-content").html() == ''){
                $("#notification-content").append('<div style="text-align:center;padding: 30px 10px; font-weight:bold;">Nothing new at this moment.</div>')
            }
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

            $("#notification-content").html('')
            
            let notifications = result['type_0']
            let idLookUp = result['idLookUp']

            for(let i=0; i<notifications.length;i++){

                $("#notification-content").append('<div class="one-notification" onclick="goToUser('+notifications[i]['followed_by']['id']+')"><img src="/static/cat/img/temp-header.png" alt="header photo" id="user-header-'+notifications[i]['followed_by']['id']+'"><div><strong>'+notifications[i]['followed_by']['username']+'</strong> started following you. <light></light></div></div>')

                
            }

            if($("#notification-content").html() == ''){
                $("#notification-content").append('<div style="text-align:center;padding: 50px 10px 30px 10px;">Nothing new at this moment.</div>')
            }

            checkNewNotification()
        }
    })
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