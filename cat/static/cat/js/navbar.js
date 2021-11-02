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

            // if(result['header']!=null){
            //     $("#user-info-header").attr("scr", result['header'])
            // }

            $("#user-info-about").val(result['about'])
            $("#user-info-birthday").val(result['birthdate'])

            $("#user-info-modal").fadeIn()
        }
    })
})

