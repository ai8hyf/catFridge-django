function centerElement(elementSelector){
    let marginTop = ( $(window).height() - $(elementSelector).height() ) / 2
    $(elementSelector).css("margin-top", marginTop - 20)
}

centerElement(".container")
window.addEventListener('resize', function(){
    centerElement(".container")
});