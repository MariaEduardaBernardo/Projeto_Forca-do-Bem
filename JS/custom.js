
  (function ($) {

  "use strict";

    // COUNTER NUMBERS
    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });

    // BACKSTRETCH SLIDESHOW
    $('.hero-section').backstretch([
      "https://uploaddeimagens.com.br/images/004/538/756/full/imagem_2023-07-10_183023902.png?1689024671"])
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);

      scrollToDiv(elWrapped);
      return false;

      function scrollToDiv(element){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;

        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

  })(window.jQuery);


/* Carrossel com as ONGs na home*/
$(document).ready(function(){
  $('.Ex_ONGs').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
      {
          breakpoint: 768,
          settings: {
          slidesToShow: 2,
          slidesToScroll: 2
          }
      },
      {
          breakpoint: 480,
          settings: {
          slidesToShow: 1,
          slidesToScroll: 1
          }
      }
      ]
  });
});

/*Carousel*/
let mainPosts = document.querySelectorAll(".main-post");
let posts = document.querySelectorAll(".post");

let i = 0;
let postIndex = 0;
let currentPost = posts[postIndex];
let currentMainPost = mainPosts[postIndex];

let progressInterval = setInterval(progress, 100); // 180

function progress() {
  if (i === 100) {
      i = -5;
      // reset progress bar
      currentPost.querySelector(".progress-bar__fill").style.width = 0;
      document.querySelector(
      ".progress-bar--primary .progress-bar__fill"
      ).style.width = 0;
      currentPost.classList.remove("post--active");

      postIndex++;

      currentMainPost.classList.add("main-post--not-active");
      currentMainPost.classList.remove("main-post--active");

      // reset postIndex to loop over the slides again
      if (postIndex === posts.length) {
      postIndex = 0;
      }

      currentPost = posts[postIndex];
      currentMainPost = mainPosts[postIndex];
  } else {
      i++;
      currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
      document.querySelector(".progress-bar--primary .progress-bar__fill").style.width = `${i}%`;
      currentPost.classList.add("post--active");

      currentMainPost.classList.add("main-post--active");
      currentMainPost.classList.remove("main-post--not-active");
  }
}


