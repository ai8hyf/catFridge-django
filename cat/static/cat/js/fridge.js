// this variable should be fetched from a remote DB
let catFromDB = [
    {
        catName: "Arthur",
        catMotto: "I love Jerry",
        catID: "TEST01",
        headSize: 100,
        neckLength: 10,
        neckWidth: 20,
        bodyHeight: 200,
        bodyWidth: 150,
        tailLength: 150,
        faceColor: "#ffffff",
        bodyColor: "#ff0000",
        tailColor: "#000000",
        headGlowColor: "#e8ff73",
        bodyTLRadius: "50%",
        bodyTRRadius: "50%",
        bodyBLRadius: "25%",
        bodyBRRadius: "25%",
        bodyTatoo: "Supreme",
        tatooColor: "#ffffff",
        headAlign: "center"
    },
    {
        catName: "Brandon",
        catMotto: "I'm not a bear.",
        catID: "TEST02",
        headSize: 40,
        neckLength: 100,
        neckWidth: 0,
        bodyHeight: 200,
        bodyWidth: 100,
        tailLength: 100,
        faceColor: "#000000",
        bodyColor: "#000000",
        tailColor: "#000000",
        headGlowColor: "#000000",
        bodyTLRadius: "10%",
        bodyTRRadius: "10%",
        bodyBLRadius: "25%",
        bodyBRRadius: "25%",
        bodyTatoo: "OffWhite",
        tatooColor: "#000000",
        headAlign: "left"
    },
    {
        catName: "Charlie", catMotto: "I love Jerry", catID: "TEST03", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 100, tailLength: 150, faceColor: "#00ff00", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "LUCK", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Dawn", catMotto: "I love Jerry", catID: "TEST04", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#ee00ee", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "YYY", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Eric", catMotto: "I love Jerry", catID: "TEST05", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#0000ff", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "Yooo", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Frank", catMotto: "I love Jerry", catID: "TEST06", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#11ee55", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "Hello", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Gaga", catMotto: "I love Jerry", catID: "TEST07", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#0f0f0f", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "Bingo", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Harry", catMotto: "I love Jerry", catID: "TEST08", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#669900", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "Dog", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Isaac", catMotto: "I love Jerry", catID: "TEST09", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#222222", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "Ghost", tatooColor: "#2176fb", headAlign: "center"
    },
    {
        catName: "Jack", catMotto: "I love Jerry", catID: "TEST10", headSize: 200, neckLength: 100, neckWidth: 1, bodyHeight: 50, bodyWidth: 200, tailLength: 150, faceColor: "#22ff00", bodyColor: "#fdc131", tailColor: "#000000", headGlowColor: "#ffffff", bodyTLRadius: "25%", bodyTRRadius: "25%", bodyBLRadius: "25%", bodyBRRadius: "25%", bodyTatoo: "Cool", tatooColor: "#2176fb", headAlign: "center"
    }
]

$("#menu-fridge").addClass("active")

function showBorrowManageModal(modalID){
    // this function should contain more stuff when backend is ready
    $(modalID).fadeIn()
}

function showStatsModal(modalID){
    // this function should contain more stuff when backend is ready
    $(modalID).fadeIn()
}

function centerElement(elementSelector, parentSelector){
    // if($(parentSelector).height() - $(parentSelector).width() < 0){
    //     // take the full height
    // }else if($(parentSelector).height() - $(elementSelector).height() < 0){

    // }else{
        
    // }

    let marginTop = ( $(parentSelector).height() - $(elementSelector).height() ) / 2
    $(elementSelector).css("margin-top", marginTop)
}

function showConfigurator(){
    $("#adopt-modal").fadeIn()
    generateCat()
}
// showConfigurator()

window.addEventListener('resize', function(){
    centerElement(".cat-preview>.cat-all", ".cat-preview")
});

function generateCat(){

    let catJSON = {
        catName: $("#cat-name").val(),
        catMotto: $("#cat-motto").val(),
        catID: "000000", // for new cats only. The server will return the real catID
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

    jsonToCat(".cat-preview", catJSON)
}

function jsonToCat(containerSelector, catJSON){

    // I might even decide to redo this part with WebGL

    // // default cat config
    // let catJSON = {
    //     catID: "SFAFE1",
    //     headSize: 100,
    //     neckLength: 10,
    //     neckWidth: 20,
    //     bodyHeight: 200,
    //     bodyWidth: 150,
    //     tailLength: 150,
    //     faceColor: "#ffffff",
    //     bodyColor: "#ff0000",
    //     tailColor: "#000000",
    //     headGlowColor: "#e8ff73",
    //     bodyTLRadius: "50%",
    //     bodyTRRadius: "50%",
    //     bodyBLRadius: "25%",
    //     bodyBRRadius: "25%",
    //     bodyTatoo: "Supreme",
    //     tatooColor: "#ffffff",
    //     headAlign: "center"
    // }

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

        //for project 2 only:
        catID: catFromDB.length.toString()+"TEMP",

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

    catFromDB.push(catJSON)
    renderLists(catFromDB)

    //maybe reset the params before close the window. I am just lazy :(
    $("#adopt-modal").fadeOut()
}

function renderLists(catListJSON){

    // empty the list
    $(".cat-list").html("")

    // update total
    $("#cat-count").html(catListJSON.length)

    // render the add button
    $(".cat-list").append('<div class="one-box add-box"><span><i class="fas fa-plus-circle" onclick="showConfigurator()"></i></span></div>')

    for(let i=0; i<catListJSON.length;i++){

        // create the container with catID
        $(".cat-list").append('<div class="one-box" id="'+ catListJSON[i].catID +'"></div>')

        // add the hover buttons
        // the parameters need to be dynamic in the future
        $("#"+catListJSON[i].catID).append('<div class="box-controls"><button><i class="fas fa-temperature-high"></i> Defrost</button><button onclick=\'showBorrowManageModal("#borrow-manage-modal")\'><i class="fas fa-share-square"></i> Share</button><button onclick=\'showBorrowManageModal("#cat-stats-modal")\'><i class="fas fa-info-circle"></i> Stats</button></div>')

        // cat name bar
        $("#"+catListJSON[i].catID).append('<div class="cat-name">'+catListJSON[i].catName+'</div>')

        // cat skeleton
        // this will be the container for rendering cat
        $("#"+catListJSON[i].catID).append('<div class="cat-graph"><div class="cat-all"><div class="cat-head"><i class="fas fa-smile"></i></div><div class="cat-neck"></div><div class="cat-body"></div><div class="cat-tail"></div></div></div>')

        // some stats
        // also need to be dynamic
        $("#"+catListJSON[i].catID).append('<div class="cat-info"><span><i class="fas fa-lightbulb"></i> 15 %</span><span><i class="fas fa-weight"></i> 22 PT</span><span><i class="fas fa-clock"></i> 18 HR</span></div>')

        // render cat with magic
        jsonToCat("#"+catListJSON[i].catID+">.cat-graph", catListJSON[i])
    }


    // add event listener
    $(".one-box").mouseover(function(){
        $(this).children(".box-controls").removeClass("fade-hide")
        $(this).children(".box-controls").addClass("fade-show")
    }).mouseout(function(){
        $(this).children(".box-controls").removeClass("fade-show")
        $(this).children(".box-controls").addClass("fade-hide")
    }) 
}

renderLists(catFromDB)