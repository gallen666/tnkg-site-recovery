//public onload style
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		};
	};
};

jQuery(document).ready(function($){
	jQuery.navlevel3 = function(level1,dytime) {
		
	  $(level1).mouseenter(function(){
		  varthis = $(this);
		  delytime=setTimeout(function(){
			varthis.find('.bnnext').slideDown(100);
			varthis.find('p').find("a").addClass("phover");
		},dytime);
		
	  });
	  $(level1).mouseleave(function(){
		 clearTimeout(delytime);
		 $(this).find('.bnnext').slideUp(100);
		 $(this).find('p').find("a").removeClass("phover");
	  });
	  
	};
  $.navlevel3("li.bnlip",200);
  
  $(".banner ul li").eq(2).find(".bnnext").addClass("bnnext2");
  $(".banner ul li").eq(3).find(".bnnext").addClass("bnnext3");
  $(".banner ul li").eq(4).find(".bnnext").addClass("bnnext4");
  $(".banner ul li").eq(5).find(".bnnext").addClass("bnnext5");
  $(".banner ul li").eq(6).find(".bnnext").addClass("bnnext6");

});



//无图图像
var nullimg='../images/error.png';
function lod(t){
	t.onerror = null;
	t.src=nullimg
}
$(document).ready(function(){
	$("img").each(function(){
	if($(this).attr("src")=="")
	{
		$(this).attr({"src":nullimg})
	}
	})
})
//end

$("img").each(function(){
	$(this).error(function(){
		$(this).attr("src",'/images/error.png')
	})
})



// 弹出新窗口打印
function doPrint() {
bdhtml=window.document.body.innerHTML;
sprnstr="<!--startprint-->";
eprnstr="<!--endprint-->";
prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
OpenWindow = window.open("");  
OpenWindow.document.write("<!DOCTYPE html PUBLIC '-\/\/W3C\/\/DTD XHTML 1.0 Transitional\/\/EN' 'http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd'><html xmlns='http:\/\/www.w3.org\/1999\/xhtml'><HEAD><meta http-equiv=\"Content-Type\" content=\"text\/html; charset=utf-8\" \/><TITLE>打印页面<\/TITLE><link href=\"../css\/print.css\" rel=\"stylesheet\" type=\"text\/css\" \/><\/HEAD><BODY><div id=\"printbox\" ><\/div><\/BODY><\/HTML>"); 
OpenWindow.document.getElementById("printbox").innerHTML=prnhtml;  
OpenWindow.document.close(); 
OpenWindow.print();  
}
/*打印区的内容一定要加<!--startprint-->和<!--endprint-->标记*/


//内容区 字体字号 s
$(document).ready(function(){
	$('.font_size a').click(function () {
        var index = jQuery(this).index();
        jQuery(this).addClass('on').siblings().removeClass('on');
        if (index == 0) {
            $('.conts').css('font-size', '14px');
			$('.conts').css('line-height', '20px');
			
        }
        else if (index == 1) {
            $('.conts').css('font-size', '16px');
			$('.conts').css('line-height', '30px');
			
        }
        else {
            $('.conts').css('font-size', '16px');
			$('.conts').css('line-height', '28px');
        }
    })
})



//sugg_form
jQuery(document).ready(function($){

if($("div.in_search,div.page").length>0){
		$("input.put01,span.page_input input,span.span03 textarea").each(function(i){
			var itxt = $(this).val()
			$(this).focus(function(){
				if($(this).val()==itxt){
					$(this).val("")
				}
			}).blur(function(){
				if( $(this).val().replace(/(^\s*)|(\s*$)/g,"")=="" ){
					$(this).val(itxt)
				}
			})
		})
	}

});




//首页banner焦点图
function banner(name,speed){
		var banner_name=$("."+name);
		var timer=null;
		var intervalCount=0;
		var banner_size=banner_name.find("ul li").size();
		for(var createSpan=0; createSpan<banner_size; createSpan++){
				banner_name.find(".dlWrap").append("<span></span>");
			}
		banner_name.find(".dlWrap span:eq(0)").removeClass().addClass("active").siblings().removeClass();
		banner_name.find("li").eq(0).css("zIndex",2).show().siblings().css("zIndex",1).hide();
		banner_name.find(".dlWrap span").live("click",function(){
				if(!banner_name.find("li").is(":animated")){
					var nIndex=banner_name.find("span").index(this);
					banner_name.find("li").eq(nIndex).fadeIn().siblings().fadeOut();
					banner_name.find("li").eq(nIndex).css("zIndex",2).siblings().css("zIndex",1);
					banner_name.find(".dlWrap span:eq("+nIndex+")").removeClass().addClass("active").siblings().removeClass();
					intervalCount=nIndex;
				}
			})
		
		function move(nIndex){
				if(!banner_name.find("li").is(":animated")){
					if(nIndex>=banner_size-1){
							nIndex=0;
					}else{
							nIndex++;
					}
					banner_name.find("li").eq(nIndex).fadeIn().siblings().fadeOut();
					banner_name.find("li").eq(nIndex).css("zIndex",2).siblings().css("zIndex",1);
					banner_name.find(".dlWrap span:eq("+nIndex+")").removeClass().addClass("active").siblings().removeClass();
					intervalCount=nIndex;
				}
		}
		
		$("."+name+",."+name+" .dlWrap span").live("mouseover",function(){
					clearTimeout(timer);
			})
		$("."+name+",."+name+" .dlWrap span").live("mouseout",function(){
					clearTimeout(timer);
					timer=setInterval(function(){
							move(intervalCount);
					},speed)
			})
			
		timer=setInterval(function(){
				move(intervalCount);
		},speed)
		
	}

$(function(){	
		banner("in_bnimg",4000);
		banner("pro_nrbnimg",4000);
})


jQuery(document).ready(function($){

  $(".ftnav ul li:last").addClass("lastbg");
  $(".in_news ul li:last").addClass("last01");



});




jQuery(document).ready(function($){
	function forScroll(oID,oL,oR){
		var oUl = $(oID + " ul");
		var oLiWid = $(oID + " ul li:eq(0)").width()+0;
		var timer = null;
		
		//$(".retailgd ul").wrap("<div class='forScroll_box0'></div>");
		
		var leB = $(oL);
		var riB = $(oR);
		
		if(oUl.find("li").size() < 2){return false };
		
		function prevLeft(){
			if(!oUl.is(":animated")){
				oUl.find("li:last").clone().prependTo(oUl);
				oUl.css("marginLeft","-" + oLiWid + "px");
				oUl.animate({"marginLeft":"+=" + oLiWid + "px"},1000);
				oUl.find("li:last").remove();
			};
			$("#popda li > a").lightBox();
		};
		
		function nextLeft(){
			if(!oUl.is(":animated")){
				oUl.animate({"marginLeft":"-=" + oLiWid + "px"},1000,function(){
					$(this).css("marginLeft","0px").find("li:first").appendTo($(this));
				});
			};
		};
		
		
		leB.click(function(){
			prevLeft();
		});
		
		riB.click(function(){
			nextLeft();
		});

		timer = setInterval(nextLeft,3000);
		oUl.hover(function(){
			clearTimeout(timer);
		},function(){
			timer = setInterval(nextLeft,3000);
		});
		
		leB.hover(function(){
			clearTimeout(timer);
		},function(){
			timer = setInterval(nextLeft,3000);
		});
		
		riB.hover(function(){
			clearTimeout(timer);
		},function(){
			timer = setInterval(nextLeft,3000);
		});
		
		
	};
	
	forScroll("#retailgd02","#butlf02","#butrt02")
});




	// JavaScript Document
//=========焦点图 start===========//

$(document).ready(function () {
	setApDiv('.layer_box .topx',".layer_box .bottomx")//添加id
	
	
	function setApDiv(img,bon){
		var anniu=$(bon)
		var img1=$(img)
		var curr = 0;
		var cur=0
		var pvrcurr=0;
		var num=anniu.find("li").size()
		var sizenuma=0
		var currnuma=0	
		
		anniu.find("li").each(function(i){
			img1.find("li").eq(i).hide();
			$(this).click(function(){
				curr = i;
				cur=i;
				if(i!=pvrcurr)
				{
					img1.find("li").eq(i).css({"z-index":num})
					img1.find("li").eq(pvrcurr).css({"z-index":num-1})
					img1.find("li").eq(i).fadeIn(200,function(){
					img1.find("li").eq(pvrcurr).fadeOut(200);
				pvrcurr=curr;
				});
				$(this).siblings().removeClass("on");
				$(this).addClass("on");
				return false;
				}
				});
			img1.find("li").eq(0).fadeIn(500);
			anniu.find("li").eq(0).addClass("on");;
		});	
			

		
		anniu.find(".cent li").each(function (j){
			$(this).prepend("<div class='bonxx'></div>")
			anniu.find(".ulx").width((j+1) * 87)
			sizenuma=j
			})
		
		//前翻
		anniu.find(".pre").click(function(){
			currnuma!=cur?currnuma=cur:0;
			
			sizenuma=$(this).parent().find("ul li").size();
			currnuma--
			cur--
			if(currnuma<=0){
				currnuma=0;
				cur=0;
				}
			if(anniu.find("ul").position().left==0 )
			{

			}
			else if(currnuma
			>sizenuma-7 && anniu.find("ul").position().left==-(sizenuma-6)*87)
			{}
			else
			{
				anniu.find("ul").stop().animate({"left":-87*(currnuma)+"px"})
			}
			
			anniu.find("li").eq(cur).click();
			return false;
			
		});
		//后翻
		anniu.find(".next").click(function(){
			sizenuma=$(this).parent().find("ul li").size();
			currnuma++
			cur++
			if(currnuma>sizenuma-6){
			currnuma=sizenuma-6
			}
			if(cur>=sizenuma){
			cur=sizenuma-1
			}

			anniu.find("ul").stop().animate({"left":-87*(currnuma)+"px"})

			
			anniu.find("li").eq(cur).click();
			return false;
		});
		
		//自动翻
		/*	var timer = setInterval(function(){
			todo = (curr + 1) % num;
			anniu.find("li").eq(todo).click();
		},4000);
		
		//鼠标悬停在触发器上时停止自动翻
		anniu.hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % num;
					anniu.find("li").eq(todo).click();
				},4000);			
			}
			
		);
		*/
	}
})
//=========焦点图 end===========//





//join_empnrkg
jQuery(document).ready(function($){
								
	$(".join_empnrlf ul li").eq(0).addClass("first01");						
	$(".join_empimgrt ul li").eq(0).addClass("xuanzhong");							
								
	$(".join_empimgrt li").bind("click",function(){
		i = $(".join_empimgrt li").index(this);
		$(this).addClass("xuanzhong");
		$(".join_empnrlf ul li").eq(i).fadeIn(0);
		$(this).siblings().removeClass("xuanzhong");
		$(".join_empnrlf ul li").eq(i).siblings().fadeOut(0);
		
	});

});



//join_empnrkg
jQuery(document).ready(function($){
  
  //$(".divtextbg").find(".divtext").eq(1).addClass("divtext02");
  $(".pro_btn ul li:odd").addClass("on");
  $(".res_box .res_box01:nth-child(2n)").find(".res_acttext").addClass("res_acttext2");
  

});


jQuery(document).ready(function($){
	jQuery.navlevel4 = function(level1,dytime) {
		
	  $(level1).mouseenter(function(){
		  varthis = $(this);
		  delytime=setTimeout(function(){
			varthis.find('.incodeimg').slideDown(100);
		},dytime);
		
	  });
	  $(level1).mouseleave(function(){
		 clearTimeout(delytime);
		 $(this).find('.incodeimg').slideUp(100);
	  });
	  
	};
  $.navlevel4("dd.codebig",200);

});
