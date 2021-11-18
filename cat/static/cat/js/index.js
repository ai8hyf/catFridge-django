function howManyFridges(){

    let totalHeight = $(".container").height() - $(".page-title").height() - $(".what-is-cat-fridge").height() - 80
    let totalWidth = $(".container").width()
    
    // let fridgeWidth = 960
    // let fridgeHeight = 1920

    if(totalHeight >= totalWidth){
        //it's weird that dividing by 2 will cause issue...
        $(".cat-fridge-img").css("width", totalWidth/2.1)
    }else{
        $(".cat-fridge-img").css("height", totalHeight-80)
    }

}
howManyFridges()

$(".menu-home").addClass("active")

$(".fridge-container").click(function(){
    window.location.href = './fridge.html';
})

window.addEventListener('resize', howManyFridges);