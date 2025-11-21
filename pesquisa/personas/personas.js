const container = document.getElementById('slider-container');
let currentIndex = 0;
const totalSlides = 6; // Total number of personas
const sectionElements = document.querySelectorAll('.persona-section');

function updateUI() {
    // Move the slider to show the current section
    container.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update the counter display
    updateNavigation();
}

function updateNavigation() {
    // Update counters for all navigation elements
    const allCounters = document.querySelectorAll('.slide-counter');
    allCounters.forEach(counter => {
        counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
    });

    // Update button states based on currentIndex
    const allPrevBtns = document.querySelectorAll('.prev-btn');
    const allNextBtns = document.querySelectorAll('.next-btn');

    allPrevBtns.forEach(btn => {
        btn.disabled = currentIndex === 0;
    });

    allNextBtns.forEach(btn => {
        btn.disabled = currentIndex === totalSlides - 1;
    });
}

// Navigation event listeners for buttons
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateUI();
    }
    if (e.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
        currentIndex++;
        updateUI();
    }
});

// Add click event to navigation buttons
document.querySelectorAll('.prev-btn').forEach((btn, index) => {
    btn.onclick = function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updateUI();
        }
    };
});

document.querySelectorAll('.next-btn').forEach((btn, index) => {
    btn.onclick = function(e) {
        e.stopPropagation();
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateUI();
        }
    };
});

// Initialize the first slide
updateUI();