currentIndex = 0;
const slideshowImages = document.querySelectorAll(".slideshow-content");

function setSlideshowContent(index) {
    currentIndex = index;

    slideshowImages.forEach(image => {
        image.dataset.visibilitystate = "hide";
    });

    slideshowImages[currentIndex].dataset.visibilitystate = "show";
}

function moveSlideshowContent(numDirection = 1) {
    currentIndex += numDirection;

    if (currentIndex < 0) currentIndex = slideshowImages.length - 1;
    else if (currentIndex > slideshowImages.length - 1) currentIndex = 0;

    setSlideshowContent(currentIndex);
}