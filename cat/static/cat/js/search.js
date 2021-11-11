$("#menu-search").addClass("active")

$("#search-content").keypress(function(e) {
    if(e.which == 13) {
        $("#search-button").click()
    }
  });

searchKeyword("yifei", "user")

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
                        
                        $("#search-result").append('<canvas class="cat-graph" id="cat-found"></canvas>')
    
                        draw("cat-found", res['content'])
                    }else{
                        // let userInfo = "<i class='fas fa-user'></i> "+res['content']['user']['username']+ "<br>"

                        $("#search-result").append("<div class='user-found'><img class='found-user-header' src="+res['content']['header']+" /><div class='found-user-name'><i class='fas fa-user'></i> "+res['content']['user']['username']+"</div><div class='found-user-about'><i class='fas fa-info-circle'></i> "+res['content']['about']+"</div></div>")
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