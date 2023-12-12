
const dataFromBackend = [
  {
    image_url: 'url_de_la_imagen_1',
    title: 'Título 1',
    price: '$10',
    rating: 4,
  },
  {
    image_url: 'url_de_la_imagen_2',
    title: 'Título 2',
    price: '$15',
    rating: 5,
  },
  {
    image_url: 'url_de_la_imagen_1',
    title: 'Título 1',
    price: '$10',
    rating: 4,
  },
  {
    image_url: 'url_de_la_imagen_2',
    title: 'Título 2',
    price: '$15',
    rating: 5,
  },
  {
    image_url: 'url_de_la_imagen_1',
    title: 'Título 1',
    price: '$10',
    rating: 4,
  },
  {
    image_url: 'url_de_la_imagen_2',
    title: 'Título 2',
    price: '$15',
    rating: 5,
  },
  // Agrega más objetos según sea necesario
];
// Función para cargar las tarjetas en el DOM
async function cargarTarjetas() {
  const response = await fetch('http://localhost:3001/api/recipes');
  const data = await response.json();
  const container = document.querySelector('.art-board__container');

  // Limpiar contenido existente en el contenedor
  container.innerHTML = '';

  data.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';

    // Estructura interna de la tarjeta
    card.innerHTML = `
      <div class="card__image">
        <img src="https://images.pexels.com/photos/4001871/pexels-photo-4001871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Pizza" alt="${item.name}" />
      </div>
      <div class="card__info">
        <div class="car__info--title">
          <h3>${item.name}</h3>
          <p>Fresh & sweet</p>
        </div>
        <div class="card__info--price">
          <p>${item.price}</p>
          ${generateRatingStars(item.rating)}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Después de cargar las tarjetas, inicializa el slider
  showSlides(slideIndex);
}

// Función para generar estrellas de calificación
function generateRatingStars(rating) {
  const stars = Array.from({ length: rating }, (_, index) => `<span class="fa fa-star checked" data-index="${index + 1}"></span>`).join('');
  return stars;
}

// Llama a la función para cargar las tarjetas al cargar la página
cargarTarjetas();
