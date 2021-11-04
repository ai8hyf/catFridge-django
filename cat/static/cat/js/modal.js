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