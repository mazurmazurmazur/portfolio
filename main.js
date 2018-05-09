




let sts1= document.querySelectorAll("[class^='st']:nth-child(odd)");
let sts2= document.querySelectorAll("[class^='st']:nth-child(even)");
let letters1 = document.querySelectorAll(".letter:nth-child(odd)");
let letters2 = document.querySelectorAll(".letter:nth-child(even)");
let face = document.querySelector("#facesvg");
let start = document.querySelector("#start");
var arrowDown = document.querySelector("#arrowDown");
var tl2 = new TimelineMax();
let tl = new TimelineMax();







function startClicked() {
    face.style.opacity= "1";
    start.style.display="none";

    tl.staggerFrom(sts1, 1, {
    x:function(){
        return Math.floor(Math.random()*2000*-1)-600
    },
    y:function(){
        return Math.floor(Math.random()*2000*-1)-600
    },

}, 0.001);

tl.staggerFrom(sts2, 1, {
    x:function(){
        return Math.floor(Math.random()*2000)+600
    },
    y:function(){
        return Math.floor(Math.random()*2000)+600
    },

}, 0.001, "-=2");

    tl.staggerFrom(letters1, 2, {
    x:function(){
        return Math.floor(Math.random()*2000)+1000
    },
    y:function(){
        return Math.floor(Math.random()*2000)+1000
    },

}, 0.1, 0);

      tl.staggerFrom(letters2, 2, {
    x:function(){
        return Math.floor(Math.random()*2000*-1)-1000
    },
    y:function(){
        return Math.floor(Math.random()*2000*-1)-1000
    },

}, 0.1, "-=2");

      showArrowDown();


};






function showArrowDown(){
    setTimeout(function(){arrowDown.style.display="block";}, 2000);
};







//arrow is moving to attract users attention
function arrowMovement(){
    tl2.to(arrowDown, 2, {alpha:0.2, repeatDelay:0.1, repeat:-1, yoyo:true})
tl.play();
}





////END OF TWEENMAX


  $('#fullpage').fullpage({
		anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        scrollOverflow: true

	});





///VIDEOS GALLERY WP JSON




function getAllVideos() {
  fetch("http://mazurmazurmazur.pl/wphekko/wp-json/wp/v2/videos?_embed")
    .then(res => res.json())
    .then(showVideos)
}





function showVideos(data) {
    console.log(data);
  let list = document.querySelector("#wrapperJsonVideo");
  let template = document.querySelector("#videoTemplate").content;
  let clone = template.cloneNode(true);


    let vCounter = 0;

  data.forEach(function(theVideo) {
      //Selecting elements from html document
    let clone = template.cloneNode(true);
    let galleryImage = clone.querySelector(".video-gallery-image");
    let title = clone.querySelector(".textVideoGalItem");
    let desc = clone.querySelector(".videoDesc");
    let websiteLink = clone.querySelector(".videoLink");
    let galItemWrapper = clone.querySelector(".videoGalItemWrapper")
    let textGalItemWrapper = clone.querySelector(".textVideoGalItemWrapper")

    galItemWrapper.setAttribute('id','o'+vCounter);
    textGalItemWrapper.classList.add('o'+vCounter);



    //selecting elements from wp json
    let photo = theVideo._embedded["wp:featuredmedia"]["0"].media_details.sizes.large.source_url;
    let link = theVideo.acf.link;
    let excerpt = theVideo.excerpt.rendered;
    excerpt = excerpt.replace('<p>', '');
    excerpt = excerpt.replace('</p>', '');


    //filling document elements with json content
    galleryImage.setAttribute("src", photo);
    websiteLink.setAttribute("href", link);
      websiteLink.setAttribute("target", "_blank");
    title.textContent = theVideo.title.rendered;
    desc.textContent = excerpt;



    list.appendChild(clone);
vCounter= vCounter+1;
  })


    //Makes text disappear on hover

    $(".videoGalItemWrapper").hover(

        function () {
       $("."+this.id).fadeOut();
        },
        function(){
        $(".textVideoGalItemWrapper").fadeIn();
        } );




}




getAllVideos();





















////WEBSITES GALLERY, WP JSON

function getAllWebsites() {
  fetch("http://mazurmazurmazur.pl/wphekko/wp-json/wp/v2/website?_embed")
    .then(res => res.json())
    .then(showWebsites)
}





function showWebsites(data) {
    console.log(data);
  let list = document.querySelector("#wrapperJson");
  let template = document.querySelector("#websiteTemplate").content;
  let clone = template.cloneNode(true);


    let counter = 0;

  data.forEach(function(theWebsite) {
      //Selecting elements from html document
    let clone = template.cloneNode(true);
    let galleryImage = clone.querySelector(".gallery-image");
    let title = clone.querySelector(".textGalItem");
    let desc = clone.querySelector(".desc");
    let websiteLink = clone.querySelector(".websiteLink");
    let galItemWrapper = clone.querySelector(".galItemWrapper")
    let textGalItemWrapper = clone.querySelector(".textGalItemWrapper")

    galItemWrapper.setAttribute('id','o'+counter);
    textGalItemWrapper.classList.add('o'+counter);



    //selecting elements from wp json
    let photo = theWebsite._embedded["wp:featuredmedia"]["0"].media_details.sizes.large.source_url;
    let link = theWebsite.acf.link;
    let excerpt = theWebsite.excerpt.rendered;
    excerpt = excerpt.replace('<p>', '');
    excerpt = excerpt.replace('</p>', '');


    //filling document elements with json content
    galleryImage.setAttribute("src", photo);
    websiteLink.setAttribute("href", link);
      websiteLink.setAttribute("target", "_blank");
    title.textContent = theWebsite.title.rendered;
    desc.textContent = excerpt;



    list.appendChild(clone);
counter= counter+1;
  })


    //Makes text disappear on hover

    $(".galItemWrapper").hover(

        function () {
       $("."+this.id).fadeOut();
        },
        function(){
        $(".textGalItemWrapper").fadeIn();
        } );




}




getAllWebsites();



////END OF REST API


  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1fnGGwf751yFbcKIEwZd_LjDEtYmFnUB4bJuBYcgVQFY/edit?usp=sharing';

  function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: createBars,
                     simpleSheet: true } )
  }

  function createBars(data, tabletop) {


      for (i = 0; i < data.length; i++){

          $(".skillBars").append('<div class="skillbar clearfix" data-percent="'+data[i].Level+'"><div class="skillbar-title" style="background: transparent;"><span>'+data[i].Skill+'</span></div><div class="skillbar-bar" style="background: #525252;"></div></div> ')
      }
  }

  window.addEventListener('DOMContentLoaded', init);







///END OF TABLETOP


/////DIRECTLY- SHOW WEBSITE GALLERY

$(".loremg2Container").click(function(e){
   var pWidth = $(this).outerWidth();
   var pOffset = $(this).offset();
   var x = e.pageX - pOffset.left;
    $.fn.fullpage.reBuild();
    if(pWidth/2 < x){
        $(".loremg2Container ").css("opacity", 0);
        setTimeout(function(){ $(".loremg2Container").hide(); }, 2000);
        $(".webDeGalContainer").css("opacity", 1);
        $(".webDeGalContainer").css("pointer-events", "auto");
        $(".webDeGalContainer").css("transform", "translateX(0)");
        }
});
/////

/////DIRECTLY- SHOW VIDEO GALLERY

$(".loremgContainer").click(function(){

    $.fn.fullpage.reBuild();

        $(".loremgContainer ").css("opacity", 0);
        setTimeout(function(){ $(".loremgContainer").hide(); }, 2000);
        $(".vidGalContainer").css("opacity", 1);
        $(".vidGalContainer").css("pointer-events", "auto");
        $(".vidGalContainer").css("transform", "translateX(0)");

});

//////


///ALLOWS SEGMENTS TO BE SCROLLABLE(DUNNO WHY IT AINT AUTO)///





$(window).on('hashchange', function(){
    if ($(window).width() < 768) {


        if(location.hash === "#thirdPage"||location.hash === "#fourthPage")
    $.fn.fullpage.reBuild();
}
});


//////



/////TEXT IN CONTACT APPEARS UNDER CIRCLE WHEN HOVERED
//
//    $(".contactByCircle").hover(
//
//        function () {
//       $(".contactByCircle").children().css("opacity", 1);
//        alert($(".contactByCircle").attr('class').split(' ')[1]);
//
//
//        },
//        function(){
//        setTimeout(function(){
//            $(".contactByCircle").css("opacity", 0);
//
//        }, 5000);
//        } );
//
////////


///JQUERY FOR SKILLBARS

    $(window).on('hashchange', function(){
        if(location.hash === "#secondPage")
        {	$('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},3000);
	   });
        }
        else{
            $('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:0
		},3000);
	   });
        }
    });

//I AM SO FUCKIN PROUD OF THIS ONE, CHECKING IF ANCHOR CHANGES TO PARTICULAR ONE IN JQ
////END OF JQUERY FOR SKILLBARS



////CONTACT

$(".contactP").on('click',function(){
    $(".contactDiv").css('width', '100vw');
    $(".contactDiv").css('height', '100vh');
    $(".contactDiv").css('background-color', 'rgba(0,0,0,0.9)');
    $(".contactDiv").css('cursor', 'auto');
    $(".contactP").css('font-size', '35px');
    $(".closeContact").show("slow");
    $(".contactByWrapper").delay(2000).fadeIn(300);
})

$(".closeContact").click(function(){

    if ($(window).width() < 768) {
    $(".contactDiv").css('width', '25vw');
    $(".contactDiv").css('height', '3vh');
    }
    else{
    $(".contactDiv").css('width', '10vw');
    $(".contactDiv").css('height', '5vh');
    }
    $(".contactDiv").css('background-color', 'rgba(0,0,0,0.2)');
    $(".contactDiv").css('cursor', 'pointer');
    $(".contactP").css('font-size', '15px');
    $(".closeContact").hide("slow");
    $(".contactByWrapper").fadeOut(0);
})



//$('.contactBy').mouseenter(function() {
//    $div2.show().delay( 10000 ).hide( 0 );
//});

///END OF CONTACT




arrowMovement();



