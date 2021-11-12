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
                        
                        $("#search-result").append("<div class='user-found' onclick='goToUser("+res['content']['user']['id']+")'><img class='found-user-header' src="+res['content']['header']+" /><div class='found-user-name'><i class='fas fa-user'></i> "+res['content']['user']['username']+"</div><div class='found-user-about'>"+res['content']['about']+"</div></div>")
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
    console.log(uid)
}

function borrowCat(cid){
    console.log(cid)
}

// searchKeyword("yifei", "user")

// searchKeyword("5", "cat")