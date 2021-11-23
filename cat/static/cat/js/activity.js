$(document).ready(function(){
    $(".menu-activity").addClass("active")

    let headerURL = $(".found-user-header").data("header-url")
    if(headerURL != ""){
        $(".found-user-header").attr("src", "/media/"+headerURL)
        $("#user-info-header").attr("src", "/media/"+headerURL)
    }

    let catFleet = ""
    for(let i=0;i<$("#cat-count-render").data("cat-count");i++){
        catFleet += '<i class="fas fa-cat"></i>'
    }
    $("#cat-count-render").html("OWN<br>"+catFleet)

    getAdoptCatFeeds()
})



function getAdoptCatFeeds(){
    // let target_uid = $(".found-user-name").data("uid")
    // let uid = $("#user-banner").data("uid")
    
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/adpotNewCatFeeds",
        method: "GET",
        success: function(res){

            const userIds = new Set()

            $(".feeds").html('')
            for(let i=0;i<res.length;i++){
                
                userIds.add(parseInt(res[i]['owner']['id']))
                
                let feedTime = res[i]['adoptDate']

                feedTime = '<i class="far fa-clock fa-sm"></i> ' + feedTime.substr(0, 10) + " " + feedTime.substr(11, 5)

                $(".feeds").append('<div class="one-feed"><img src="/static/cat/img/temp-header.png" alt="header photo" class="feed-user-header user-header-'+res[i]['owner']['id']+'" onclick=goToUser('+res[i]['owner']['id']+')><span class="feed-content"><strong>'+res[i]["owner"]["username"]+'</strong> Adopted a new cat named <strong>'+res[i]["catName"]+' <i class="fas fa-cat"></i></strong></span><span class="feed-time">'+feedTime+'</span></div>')
            }

            getHeaderByIds(Array.from(userIds))
        }
    })
}



