/*Menu*/
document.addEventListener("DOMContentLoaded", function() {
    var headerContainer = document.getElementById("headerContainer");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "header.html", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        headerContainer.innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  });

function openModal() {
    document.getElementById("myModal").style.display = "block";
}
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

/*Formulario de contato*/
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    // Código para enviar e-mail
});

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
        document.querySelector(
        ".progress-bar--primary .progress-bar__fill"
        ).style.width = `${i}%`;
        currentPost.classList.add("post--active");

        currentMainPost.classList.add("main-post--active");
        currentMainPost.classList.remove("main-post--not-active");
    }
}

