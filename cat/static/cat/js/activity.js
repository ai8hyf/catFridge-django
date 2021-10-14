$("#menu-activity").addClass("active")

$(".filter>button").click(function(){
    $(".filter>button").removeClass("selected")
    $(this).addClass("selected")

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: ".",
        data: {"DURATION": $(this).data["duration"]},
        method: "POST",
        success: function(res){

            console.log(res)

            $("#activities").html('<tr><td><i class="fas fa-spinner fa-spin"></i></td></tr>')

            // for demonstration only
            setTimeout(function(){
                $("#activities").html('')
                for(let key in res){
                    let activityDate = res[key].date
                    let activityContent = res[key].content
                    // let activityCat = res.cat
                    let activityInvolved = res[key].involved
                    $("#activities").append("<tr><td>"+activityDate+"</td><td>"+activityContent+"</td><td>"+activityInvolved+"</td></tr>")
                }
            }, 1000)
        }
    })
})

$("#weekRecord").click()
