let slideIndex = [1, 1, 1, 1, 1, 1];
let slideId = ["slideshow1", "slideshow2", "slideshow3", "slideshow4", "slideshow5", "slideshow6"];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function currentSlide(n, no) {
  showSlides(slideIndex[no] = n, no);
}

function showSlides(n, no) {
  let i;
  let slides = document.getElementById(slideId[no]).getElementsByClassName("mySlides");
  let dots = document.getElementById(slideId[no]).getElementsByClassName("demo");
  if (n > slides.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  slides[slideIndex[no]-1].style.display = "block";  
  dots[slideIndex[no]-1].className += " w3-white";
}