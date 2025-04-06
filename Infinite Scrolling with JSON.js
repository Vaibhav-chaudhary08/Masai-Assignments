const gallery = document.getElementById('gallery');
const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
let page = 1;
const limit = 10;
let loading = false;

async function fetchImages() {
    if (loading) return;
    loading = true;

    try {
        const response = await fetch(`${apiUrl}?_page=${page}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const images = await response.json();
        displayImages(images);
        page++;
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        loading = false;
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        imageItem.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <p>${image.title}</p>
        `;
        gallery.appendChild(imageItem);
    });
}

function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        fetchImages();
    }
}

window.addEventListener('scroll', checkScroll);

fetchImages(); // Initial load
