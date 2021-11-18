$(document).ready(function(){
    getCatsFromDB()
    $(".menu-fridge").addClass("active")
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

function adoptCat(){
    let catJSON = {
        "catName": $("#cat-name").val(),
        "catDesc": $("#cat-motto").val(),
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

    // render the add button
    $(".cat-list").append('<div class="one-box add-box"><span><i class="fas fa-plus-circle" onclick="showConfigurator()"></i></span></div>')

    for(let i = 0; i<catListJSON.length; i++){
        catID = "catid_"+catListJSON[i].id

        // create the container with catID
        $(".cat-list").append('<div class="one-box" id="'+ catID +'"></div>')

        // add the hover buttons
        $("#"+catID).append('<div class="box-controls"><button><i class="fas fa-temperature-high"></i> Defrost</button><button onclick=\'alert("This function will be ready in the next update.")\'><i class="fas fa-share-square"></i> Share</button><button onclick=\'showStatsModal('+i+')\'><i class="fas fa-info-circle"></i> Stats</button></div>')

        // cat name bar
        $("#"+catID).append('<div class="cat-name">'+catListJSON[i].catName+'</div>')

        // create canvas
        $("#"+catID).append('<canvas class="cat-graph" id="graph_'+ catID +'"></canvas>')

        // some stats
        $("#"+catID).append('<div class="cat-info"><span><i class="fas fa-heart"></i> '+catListJSON[i].catHealth+' %</span><span><i class="fas fa-weight"></i> '+catListJSON[i].catWeight+' lb</span><span><i class="fas fa-clock"></i> '+catListJSON[i].catAge+' min</span></div>')

        // render cat with magic
        draw("graph_"+catID, catListJSON[i])
    }

    $("#cat-count").text(catListJSON.length)

    // add event listener
    $(".one-box").mouseover(function(){
        $(this).children(".box-controls").removeClass("fade-hide")
        $(this).children(".box-controls").addClass("fade-show")
    }).mouseout(function(){
        $(this).children(".box-controls").removeClass("fade-show")
        $(this).children(".box-controls").addClass("fade-hide")
    }) 
}

