var foundUsers = {}

$("#menu-search").addClass("active")

$("#search-content").keypress(function(e) {
    if(e.which == 13) {
        $("#search-button").click()
    }
});

function searchKeyword(keyword, searchOption){
    if(keyword == ""){
        $("#search-result").html('')
    }else{
        $.ajax({
            headers: {
                'X-CSRFToken': csrftoken
            },
            url: ".",
            method: "POST",
            data: {"keyword": keyword, "search-option": searchOption}, // for sql
            success: function(res){
                
                console.log(res)

                $("#search-result").html('')

                if(res['Exist']){
                    if(res['isCat']){
                        
                        $("#search-result").append('<div class="cat-name">'+res['content']['catName']+'</div><canvas class="cat-graph" id="cat-found"></canvas>')

                        let allowBorrow = true

                        if(allowBorrow){
                            $("#search-result").append('<div class="borrow-cat-button allow-borrow" onclick="borrowCat('+res['content']['id']+')">Borrow <i class="fas fa-people-carry"></i></div>')
                        }
    
                        draw("cat-found", res['content'])

                    }else{

                        for(let i=0; i<res['content'].length; i++){
                            let oneUser = res['content'][i]

                            foundUsers[oneUser['user']['id']] = res['content'][i]

                            $("#search-result").append("<div class='user-found' onclick='goToUser("+oneUser['user']['id']+")'><img class='found-user-header' src="+oneUser['header']+" /><div class='found-user-name'><i class='fas fa-user'></i> "+oneUser['user']['username']+"</div><div class='found-user-about'>"+oneUser['about']+"</div></div>")
                        }
                        
                    }
                }else{
                    if(searchOption=="cat"){
                        searchOption = '<i class="fas fa-cat"></i>  with ID <u>'
                    }else{
                        searchOption = '<i class="fas fa-user"></i>  Named <u>'
                    }

                    let msg = "The  " + searchOption + keyword + "</u> does not exist!"
                    $("#search-result").append("<div id='not-found'>"+msg+"</div>")
                }

            }
        })
    }
}

$("#search-button").click(function(){
    let keyword = $("#search-content").val()
    let searchOption = $('input[name="search-option"]:checked').val()

    searchKeyword(keyword, searchOption)
})

function goToUser(uid){

    $(".cat-collection").html('')

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/getAllCatFromUser",
        method: "POST",
        data: {"userID": uid},
        success: function(result){
            
            for(let i=0; i<result.length;i++){
                $(".cat-collection").append('<canvas class="one-cat-collection" id="fu-cat-'+result[i]['id']+'"></canvas>')

                draw("fu-cat-"+result[i]['id'], result[i])
            }

            $("#total-cats").text(result.length)

        }
    })
    if(foundUsers[uid]['header']!=null){
        $("#fu-modal-header").attr("src", foundUsers[uid]['header'])
    }
    
    $("#fu-modal-name").text(foundUsers[uid]['user']['username'])
    $("#fu-modal-about").text(foundUsers[uid]['about'])
    $("#follow-button").html('<i class="fas fa-spinner fa-spin"></i>')
    $("#found-user-modal").show()

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/checkSubscription",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){

            if(res==1){
                $("#follow-button").html('Stop Follow')
                $("#follow-button").removeClass("btn-submit")
                $("#follow-button").addClass("btn-cancel")
                $("#follow-button").attr("onclick", "stopFollow("+uid+")")
            }else{
                $("#follow-button").html('Follow <i class="fas fa-user-plus"></i>')
                $("#follow-button").attr("onclick", "startFollow("+uid+")")
            }
        }
    })
}

function borrowCat(cid){
    
}

function startFollow(uid){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/subscribe",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){

            if(res=="success"){
                $("#follow-button").html('Stop Follow')
                $("#follow-button").removeClass("btn-submit")
                $("#follow-button").addClass("btn-cancel")
                $("#follow-button").attr("onclick", "stopFollow("+uid+")")
            }else{
                alert(res)
            }
        }
    })
}

function stopFollow(uid){
    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken
        },
        url: "/cat/unsubscribe",
        method: "POST",
        data: {"target_id": uid},
        success: function(res){
            
            if(res=="success"){
                $("#follow-button").html('Follow <i class="fas fa-user-plus"></i>')
                $("#follow-button").addClass("btn-submit")
                $("#follow-button").removeClass("btn-cancel")
                $("#follow-button").attr("onclick", "startFollow("+uid+")")
            }else{
                alert(res)
            }
        }
    })
}


searchKeyword("yifei", "user")


// searchKeyword("5", "cat")