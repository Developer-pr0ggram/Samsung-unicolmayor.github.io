$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})


// Obtener todos los botones de "COMPRAR"
const buyButtons = document.querySelectorAll('.buy-button');

buyButtons.forEach((buyButton) => {
  buyButton.addEventListener('click', () => {
    // Obtener la información del producto
    const productName = buyButton.parentNode.parentNode.querySelector('.nombre-producto').textContent;
    const productImg = buyButton.parentNode.parentNode.querySelector('.img-producto').getAttribute('src');
    const productPrice = buyButton.parentNode.parentNode.querySelector('.precio-producto').textContent;

    // Obtener el carrito desde localStorage o crear uno vacío si no existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Agregar el producto al carrito
    const product = {
      img: productImg,
      name: productName,
      price: productPrice
    };
    cart.push(product);

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart)

    // Redirigir a la página de envío
    window.location.href = 'carrito.html';
  });
});
