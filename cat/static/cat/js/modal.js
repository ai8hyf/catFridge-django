$(".close-modal-button").click(function(){
    let modal_id = $(this).attr("data-close")
    $(modal_id).fadeOut()
})

$(".modal").click(function(e){
    let modal_id = $(this).attr("id")
    $("#"+modal_id).fadeOut()
})

$(".modal>div").click(function(e){
    e.stopPropagation()
})