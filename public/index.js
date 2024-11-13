// Constants
const DELAY_SECONDS = 3 * 1000; // 3 seconds in milliseconds

// Track clicked images
const clickedImages = new Set();


// Function to initialize the slider with specific images
function initializeSlider(beforeImg, afterImg) {
    const sliderContainer = document.getElementById('mySlider');
    sliderContainer.innerHTML = '';

    new SliderBar({
        el: '#mySlider',
        beforeImg: beforeImg,
        afterImg: afterImg,
        height: "400px",
        lineColor: "rgba(0,0,0,0.5)"
    });
}

function submitToGoogleForm(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    
    const formData = new FormData();
    formData.append('entry.1919113729', email); // Replace 'YOUR_ENTRY_ID' with the actual entry ID from Google Form

    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdTwgT5t26I1LWU6VKRnJr4nJR6d8p0phHE6D2z0IHNkhQPMA/formResponse', { // Replace with your form's action URL
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(() => {
        document.getElementById('messageContainer').innerHTML = '<div class="message success">Thank you for joining the waitlist!</div>';
    })
    .catch(() => {
        document.getElementById('messageContainer').innerHTML = '<div class="message error">There was an error. Please try again.</div>';
    });
}

// Function to handle the thumbnail click with a delay
function handleThumbnailClick(index) {
    const sliderContainer = document.getElementById('mySlider');

    if (clickedImages.has(index)) {
        initializeSlider(`images/before/${index + 1}.jpg`, `images/after/${index + 1}.jpg`);
        return;
    }

    clickedImages.add(index);
    sliderContainer.innerHTML = `<div class="loading" style="display: flex; flex-direction: column; align-items: center">
                                        <div>Working the magic...</div>
                                        <div id="loadingPercentage">0%</div>
                                     </div>`;

    const beforeImg = `images/before/${index + 1}.jpg`;
    const afterImg = `images/after/${index + 1}.jpg`;

    let percentage = 0;
    const interval = setInterval(() => {
        percentage += 10;
        const el = document.getElementById('loadingPercentage')
        if(el) {
            el.textContent = `${percentage}%`;
        }
        if (percentage >= 100) clearInterval(interval);
    }, DELAY_SECONDS / 10);

    setTimeout(() => {
        initializeSlider(beforeImg, afterImg);
    }, DELAY_SECONDS);
}

// Add click event listeners to thumbnails
document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
    thumbnail.addEventListener('click', (event) => {
        event.preventDefault();
        const index = parseInt(thumbnail.getAttribute('data-index'), 10);
        handleThumbnailClick(index);
    });
});

function showMessage(text, type) {
    const message = document.createElement('div');
    message.classList.add('message', type);
    message.textContent = text;
    document.querySelector('#messageContainer').appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Stardust effect
function createStardust(selector) {
    const container = document.querySelector(selector);
    const containerRect = container.getBoundingClientRect();

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('stardust');

        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        const left = Math.random() * containerRect.width;
        const top = Math.random() * containerRect.height;
        star.style.left = `${left}px`;
        star.style.top = `${top}px`;

        star.style.animationDuration = `${Math.random() * 2 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;

        container.appendChild(star);

        setTimeout(() => {
            star.remove();
            createStar();
        }, 5000);
    }

    for (let i = 0; i < 100; i++) {
        setTimeout(createStar, Math.random() * 3000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createStardust('#stardustContainer');
    createStardust('.image-container');
});
