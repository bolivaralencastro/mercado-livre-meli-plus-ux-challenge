document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('myCarousel');
    const container = wrapper.querySelector('.andes-carousel-snapped');
    const prevBtn = wrapper.querySelector('.control-prev');
    const nextBtn = wrapper.querySelector('.control-next');
    const slideWidth = 300; // Largura do card + gap aproximado

    nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
});
