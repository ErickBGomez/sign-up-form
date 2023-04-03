currentIndex = 0;
const slideshowImages = document.querySelectorAll(".slideshow-content");
const slideshowIndicators = document.querySelectorAll(".image-slideshow-indicator")

function setSlideshowContent(newIndex = 0) {
    currentIndex = newIndex;    
    if (newIndex < 0 || newIndex > slideshowImages.length - 1) currentIndex = 0;

    slideshowImages.forEach(image => {
        image.dataset.visibilitystate = "hide";
    });

    slideshowImages[currentIndex].dataset.visibilitystate = "show";

    selectIndicator(currentIndex);
}

function moveForwardSlideshow() {
    currentIndex++;
    if (currentIndex < 0) currentIndex = slideshowImages.length - 1;
    else if (currentIndex > slideshowImages.length - 1) currentIndex = 0;

    setSlideshowContent(currentIndex);
}

function selectIndicator(indicatorIndex = 0) {
    slideshowIndicators.forEach(otherIndicators => {
        otherIndicators.dataset.indicatorstate = "unselected";
    });

    slideshowIndicators[indicatorIndex].dataset.indicatorstate = "selected";
}

slideshowIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", e => setSlideshowContent(index));
});

// Initial slideshow image
setSlideshowContent(currentIndex);