document.addEventListener('DOMContentLoaded', function () {
  // Tu lógica de carga de recetas aquí
  cargarRecetas();


  

  // Configurar Swiper después de agregar las diapositivas
  new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
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
      
      const condition  = recipe.condition;

      const cardImage = document.createElement('div');
      cardImage.className = 'image';
      
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
        <span class="name"><strong>${recipe.name}</strong></span>
      `;

      const cardPrice = document.createElement('div');
      cardPrice.className = 'recipe-price';

      let offerPrice = condition === 'oferta' ? conditionValidate(parseFloat(recipe.price), recipe.condition, parseFloat(recipe.discount_percentage)) : recipe.price;
      offerPrice = parseFloat(offerPrice);
      const originalPrice = condition === 'oferta' ? parseFloat(recipe.price) : null;


      cardPrice.innerHTML = `
        <span class='offerPrice'>S/${offerPrice.toFixed(2)}</span>
        ${originalPrice ? ` <span class="original-price">${originalPrice.toFixed(2)}</span>` : ""}
      `;

      const cardDiscountBadge = document.createElement('div');
      cardDiscountBadge.className = 'discount-badge';
  
      // Verifica si la receta está en oferta antes de mostrar el porcentaje de descuento
      if (recipe.condition === 'oferta' && recipe.discount_percentage) {
        cardDiscountBadge.innerHTML = `<span>${recipe.discount_percentage}% OFF</span>`;
        cardContainer.appendChild(cardDiscountBadge);
      }

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

    function conditionValidate(price, condition, discount_percentage){
      let offerPrice = price;
      if(condition === 'oferta'){
         offerPrice = price - price * (discount_percentage / 100);
      }

      return offerPrice;
    }

    function generateRatingStars(rating) {
      const stars = Array.from({ length: rating }, (_, index) => `<span class="fa fa-star checked" data-index="${index + 1}"></span>`).join('');
      return stars;
    }

  } catch (error) {
    console.error('Error al cargar recetas:', error);
  }
}
