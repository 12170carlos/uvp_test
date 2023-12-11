document.addEventListener('DOMContentLoaded', function () {
  // Tu lógica de carga de recetas aquí
  cargarRecetas();

  // Configurar Swiper después de agregar las diapositivas
  new Swiper(".swiper-container", {
    slidesPerView: 1,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

async function cargarRecetas() {
  try {
    const response = await fetch('http://localhost:3001/api/recipes');
    const data = await response.json();
    console.log('data:', data);

    const recipeCardsContainer = document.querySelector('.swiper-wrapper');

    data.forEach(recipe => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'swiper-slide card';

      const cardImage = document.createElement('div');
      cardImage.className = 'image';
      // Asegúrate de que las imágenes estén completamente cargadas antes de agregarlas
      const image = new Image();
      image.src = recipe.image_url;
      image.alt = recipe.name;
      image.addEventListener('load', function () {
        // Agrega la imagen al contenedor después de que se haya cargado completamente
        cardImage.appendChild(image);
      });

      const cardName = document.createElement('div');
      cardName.className = 'recipe-name';
      cardName.innerHTML = `
        <span class="name">${recipe.name}</span>
      `;

      const cardPrice = document.createElement('div');
      cardPrice.className = 'recipe-price';
      cardPrice.innerHTML = `
        ${recipe.price}
      `;

      const cardRating = document.createElement('div');
      cardRating.className = 'rating';
      cardRating.innerHTML = `
        <i class="fa-solid fa-star"></i>
      `;

      cardContainer.appendChild(cardImage);
      cardContainer.appendChild(cardName);
      cardContainer.appendChild(cardPrice);
      cardContainer.appendChild(cardRating);

      recipeCardsContainer.appendChild(cardContainer);
    });

  } catch (error) {
    console.error('Error al cargar recetas:', error);
  }
}
