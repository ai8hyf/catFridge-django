$(document).ready(function(){
    getCatsFromDB()
    $("#menu-fridge").addClass("active")
})

let catFromDB = {}

function getCatsFromDB(){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: ".",
        method: "POST",
        data: {"OFFSET": 0, "LIMIT": 0}, // for sql
        success: function(result){
            
            catFromDB = result

            console.log(catFromDB)

            renderLists(catFromDB)
        }
    })
}

function showBorrowManageModal(modalID){
    // this function should contain more stuff when backend is ready
    $(modalID).fadeIn()
}

function showStatsModal(catIdx){

    console.log(catFromDB[catIdx])
    // populate the popup modal before displaying it.
    $("#cat-name-header").text(catFromDB[catIdx].catName)

    $("#cat-stats-list-id").text(catFromDB[catIdx].id)
    $("#cat-stats-list-id").data("cat-id", catFromDB[catIdx].id)
    $("#cat-stats-list-id").data("cat-idx", catIdx)
    $("#cat-stats-list-name").text(catFromDB[catIdx].catName)
    $("#cat-stats-list-motto").val(catFromDB[catIdx].catDesc)
    $("#cat-stats-list-owner").text(catFromDB[catIdx].owner.username)
    $("#cat-stats-list-age").text(catFromDB[catIdx].catAge.toString() + " Minutes")
    $("#cat-stats-list-weight").text(catFromDB[catIdx].catWeight.toString() + " Pounds")
    $("#cat-stats-list-health").text(catFromDB[catIdx].catHealth.toString())

    $("#cat-stats-modal").fadeIn()
}

$("#update-cat-desc-btn").click(function(){
    $("#update-cat-desc-btn").html('<i class="fas fa-spinner fa-spin"></i>')
    JsonRequest = {
        catID: $("#cat-stats-list-id").data("cat-id"),
        catDesc: $("#cat-stats-list-motto").val() 
    }

    catIdx = $("#cat-stats-list-id").data("cat-idx")
    console.log(JsonRequest)

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        method: "POST",
        url: "./updateCatDesc",
        data: JsonRequest,
        success: function(res){
            console.log(res)
            $("#update-cat-desc-btn").html('')
            if(res == "1"){
                $("#update-cat-desc-btn").text("Updated!")
                $("#cat-stats-list-motto").css({"border-color": "green", "color": "green"})
                
                catFromDB[catIdx].catDesc = JsonRequest['catDesc']
            }else{
                $("#update-cat-desc-btn").text("Failed!")
                $("#cat-stats-list-motto").css({"border-color": "red", "color": "red"})
            }

            setInterval(function(){
                $("#update-cat-desc-btn").text("SUBMIT")
                $("#cat-stats-list-motto").css({"border-color": "black", "color": "black"})
            }, 2000)
        }
    })
})

function centerElement(elementSelector, parentSelector){
    let marginTop = ( $(parentSelector).height() - $(elementSelector).height() ) / 2
    $(elementSelector).css("margin-top", marginTop)
}

function showConfigurator(){
    $("#adopt-modal").fadeIn()
    generateCat()
}
showConfigurator()

window.addEventListener('resize', function(){
    centerElement(".cat-preview>.cat-all", ".cat-preview")
});

function generateCat(){

    var catJSON = {
        "head_width": parseInt($("#head_width").val()),
        "head_height": parseInt($("#head_height").val()), 
        "head_arc": parseFloat($("#head_arc").val()) / 100,
        "ear_width": parseFloat($("#ear_width").val()) / 100,
        "ear_height": parseInt($("#ear_height").val()), 
        "ear_direction": parseFloat($("#ear_direction").val()) / 100,
        "ear_offset": parseFloat($("#ear_offset").val()) / 100,
        "eye_height": parseFloat($("#eye_height").val()) / 100, // max: 1 
        "eye_width": parseFloat($("#eye_width").val()) / 100, // max: 0.5
        "eye_distance": parseFloat($("#eye_distance").val()) / 100, // max: 1
        "eye_margin_top": parseFloat($("#eye_margin_top").val()) / 100, // max: 1
        "retina_width": parseFloat($("#retina_width").val()) / 100,    // max: 0.5
        "retina_height": parseFloat($("#retina_height").val()) / 100,   // max: 0.5
        "neck_length": parseFloat($("#neck_length").val()) / 100, // max:2
        "neck_width": parseFloat($("#neck_width").val()) / 100, // max: 1
        "body_height": parseInt($("#body_height").val()),
        "body_width": parseInt($("#body_width").val()),
        "body_arc": parseFloat($("#body_arc").val()) / 100,
        "tail_height": parseInt($("#tail_height").val()),
        "tail_width": 20,
        "tail_stroke": parseInt($("#tail_stroke").val()),
        "ear_color": $("#ear_color").val(),
        "head_color": $("#head_color").val(),
        "eye_color": $("#eye_color").val(),
        "retina_color": $("#retina_color").val(),
        "neck_color": $("#neck_color").val(),
        "body_color": $("#body_color").val(),
        "tail_color": $("#tail_color").val(),
    }

    draw("cat-preview-canvas", catJSON)
}

function jsonToCat(containerSelector, catJSON){

    let maxHeight = $(containerSelector).height() - 40;
    let totalHeight = parseInt(catJSON.headSize) +  parseInt(catJSON.neckLength) +  parseInt(catJSON.bodyHeight)

    let headSizeRender = catJSON.headSize
    let neckLengthRender = catJSON.neckLength
    let bodyHeightRender = catJSON.bodyHeight

    // re-scale if the maxHeight is not enough
    if(maxHeight < totalHeight){
        headSizeRender = catJSON.headSize * maxHeight / totalHeight
        neckLengthRender = catJSON.neckLength * maxHeight / totalHeight
        bodyHeightRender = catJSON.bodyHeight * maxHeight / totalHeight
    }

    let parentSelector = containerSelector + ">div>"

    $(parentSelector+".cat-head").css({
        "height": headSizeRender, 
        "width": headSizeRender, 
        "line-height": (headSizeRender-10)+"px", 
        "font-size":  (headSizeRender-10)+"px", 
        "padding":"5px", 
        "color": catJSON.faceColor, 
        "box-shadow": "0 0 40px 20px "+catJSON.headGlowColor
    })

    $(parentSelector+".cat-neck").css({
        "height": neckLengthRender, 
        "width": catJSON.neckWidth
    })

    // this is not the most elegant solution... 
    if(catJSON.headAlign == "left"){
        $(parentSelector+".cat-head").css("left", - Math.abs((catJSON.bodyWidth - headSizeRender)/2))
        $(parentSelector+".cat-neck").css("left", - Math.abs((catJSON.bodyWidth - headSizeRender)/2))
    }else if(catJSON.headAlign == "right"){
        $(parentSelector+".cat-head").css("left", Math.abs((catJSON.bodyWidth - headSizeRender)/2))
        $(parentSelector+".cat-neck").css("left", Math.abs((catJSON.bodyWidth - headSizeRender)/2))
    }else{
        $(parentSelector+".cat-head").css("left", 0)
        $(parentSelector+".cat-neck").css("left", 0)
    }

    $(parentSelector+".cat-body").css({
        "height": bodyHeightRender, 
        "width": catJSON.bodyWidth,  
        "background-color": catJSON.bodyColor,  
        "border-radius": catJSON.bodyTLRadius + " " + catJSON.bodyTRRadius + " " + catJSON.bodyBRRadius + " " + catJSON.bodyBLRadius,
        "line-height": bodyHeightRender+"px", 
        color: catJSON.tatooColor})

    $(parentSelector+".cat-body").text(catJSON.bodyTatoo)

    $(parentSelector+".cat-tail").css({"width": catJSON.tailLength, "background-color": catJSON.tailColor})

    if(maxHeight > totalHeight){
        centerElement(containerSelector+">.cat-all", containerSelector)
    }else{
        $(containerSelector+">.cat-all").css("margin-top", 0)
    }
}

function adoptCat(){
    let catJSON = {
        catName: $("#cat-name").val(),
        catMotto: $("#cat-motto").val(),
        headSize: $("#head-size").val(),
        neckLength: $("#neck-length").val(),
        neckWidth: $("#neck-width").val(),
        bodyHeight: $("#body-height").val(),
        bodyWidth: $("#body-width").val(),
        tailLength: $("#tail-length").val(),
        faceColor: $("#face-color").val(),
        bodyColor: $("#body-color").val(),
        tailColor: $("#tail-color").val(),
        headGlowColor: $("#head-glow-color").val(),
        bodyTLRadius: $("#body-TL-radius").val(),
        bodyTRRadius: $("#body-TR-radius").val(),
        bodyBLRadius: $("#body-BL-radius").val(),
        bodyBRRadius: $("#body-BR-radius").val(),
        bodyTatoo: $("#body-tatoo").val(),
        tatooColor: $("#tatoo-color").val(),
        headAlign: $("#head-align").val()
    }

    if(catJSON.catName == ""){
        alert("Please name your cat!")
        return 0
    }

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        method: "POST",
        url: "./add",
        data: catJSON,
        success: function(res){
            // this is not the most efficient way
            getCatsFromDB()
            $("#adopt-modal").fadeOut()
        }
    })
}

function renderLists(catListJSON){

    // empty the list
    $(".cat-list").html("")

    // update total
    // $("#cat-count").html(catListJSON.length)

    // render the add button
    $(".cat-list").append('<div class="one-box add-box"><span><i class="fas fa-plus-circle" onclick="showConfigurator()"></i></span></div>')

    let totalCat = 0

    for(let i = 0; i<catListJSON.length; i++){
        catID = catListJSON[i].id
        totalCat += 1

        // create the container with catID
        $(".cat-list").append('<div class="one-box" id="'+ catID +'"></div>')

        // add the hover buttons
        // the parameters need to be dynamic in the future
        $("#"+catID).append('<div class="box-controls"><button><i class="fas fa-temperature-high"></i> Defrost</button><button onclick=\'alert("This function will be ready in the next update.")\'><i class="fas fa-share-square"></i> Share</button><button onclick=\'showStatsModal('+i+')\'><i class="fas fa-info-circle"></i> Stats</button></div>')

        // cat name bar
        $("#"+catID).append('<div class="cat-name">'+catListJSON[i].catName+'</div>')

        // cat skeleton
        // this will be the container for rendering cat
        $("#"+catID).append('<div class="cat-graph"><div class="cat-all"><div class="cat-head"><i class="fas fa-smile"></i></div><div class="cat-neck"></div><div class="cat-body"></div><div class="cat-tail"></div></div></div>')

        // some stats
        // also need to be dynamic
        $("#"+catID).append('<div class="cat-info"><span><i class="fas fa-heart"></i> '+catListJSON[i].catHealth+' %</span><span><i class="fas fa-weight"></i> '+catListJSON[i].catWeight+' lb</span><span><i class="fas fa-clock"></i> '+catListJSON[i].catAge+' min</span></div>')

        // render cat with magic
        jsonToCat("#"+catID+">.cat-graph", catListJSON[i])
    }

    $("#cat-count").text(totalCat)

    // add event listener
    $(".one-box").mouseover(function(){
        $(this).children(".box-controls").removeClass("fade-hide")
        $(this).children(".box-controls").addClass("fade-show")
    }).mouseout(function(){
        $(this).children(".box-controls").removeClass("fade-show")
        $(this).children(".box-controls").addClass("fade-hide")
    }) 
}

