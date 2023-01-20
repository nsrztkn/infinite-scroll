const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isLoading = false;

const count = 8;
const apiKey = "51ctddiGLqDaU9CRCTL02aVbdk6lBIsRwuHe4iZOO_c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function imageLoaded() {
  console.log("image loaded");
  loader.hidden = true;
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    imagesLoaded = 0;
    totalImages = 0;
    isLoading = false;
    loader.hidden = true;
  }
}

// SetAttributes function

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    isLoading = true;
    loader.hidden = false;

    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

//Scroll near bottom of page

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    !isLoading
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
