function lanHandler(lan)
{
    var lanUrl = "./asset/lan/"+lan+".xml?"+Math.random();
    console.log(lanUrl);
    $.get(lanUrl, function(data,status)
    {
        console.log("data:" + data + " 状态: " + status);
        var lanData=$(data).find("lan");
        $("title").html(lanData.children('html_title').text());        
        $('#whyCube').attr('src',"./asset/img/why-cube-" + lan + ".png");
        lan == "cn" ? $("html").css("font-size", 14) : $("html").css("font-size", 13);
        setMobileNav(lan,lanData);
        lanData.children().each(function()
        {
            //查找所有lan节点并遍历            
            var node = $(this).context.nodeName;                    
            if($("#"+node).html() != undefined)
            {
                $("#"+node).html($(this).context.textContent);
            }
        });
    })
}

function setMobileNav(lan,lanData){
    var i;
    var lans=['header_homepage','header_csp','header_hipay','header_coinect','header_cube','header_about','header_switch-lan'];
    if(lan == "en")
    {
        for(i=1; i < 8; i++)
        {
            $("#mobild_menu"+i).css("font-size", 11);
        }        
    }
    else
    {
        for(i=1; i < 8; i++)
        {
            $("#mobild_menu"+i).css("font-size", 12);
        } 
    }
    for(i=1; i < 8; i++)
    {
        $("#mobild_menu"+i).html(lanData.children(lans[i-1]).text());
    }
}
