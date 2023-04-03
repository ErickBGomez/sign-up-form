currentIndex = 0;
const slideshowImages = document.querySelectorAll(".slideshow-content");
const slideshowIndicators = document.querySelectorAll(".image-slideshow-indicator")

function setSlideshowContent(newIndex) {
    currentIndex = newIndex;

    slideshowImages.forEach(image => {
        image.dataset.visibilitystate = "hide";
    });

    slideshowImages[currentIndex].dataset.visibilitystate = "show";
}

function moveSlideshowContent(numDirection = 1) {
    // 1 -> Forward.      -1 -> Backwards.
    currentIndex += numDirection;

    if (currentIndex < 0) currentIndex = slideshowImages.length - 1;
    else if (currentIndex > slideshowImages.length - 1) currentIndex = 0;

    setSlideshowContent(currentIndex);
}

slideshowIndicators.forEach((indicator, index) => indicator.addEventListener("click", e => {
    slideshowIndicators.forEach(otherIndicators => otherIndicators.dataset.indicatorstate = "unselected");
    indicator.dataset.indicatorstate = "selected";

    setSlideshowContent(index);
}));