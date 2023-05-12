// Obtener el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Obtener la tabla
  const table = document.querySelector('tbody');

  const totalElement = document.querySelector('.cart-total');

  let quantityCell; // Definir la variable antes del if

  // Iterar sobre los productos en el carrito y crear una fila en la tabla para cada uno
  cart.forEach((product) => {
    // Verificar si el producto ya existe en la tabla
    const existingRow = Array.from(table.children).find(row => {
      const nameCell = row.querySelector('td:nth-child(2)');
      return nameCell.textContent === product.name;
    });

    let total = 0; // Inicializar el valor total en 0 para cada iteración

    if (existingRow) {
      // Si el producto ya existe en la tabla, actualizar la cantidad
      quantityCell = existingRow.querySelector('td:nth-child(3)');
      quantityCell.textContent = parseInt(quantityCell.textContent) + 1;

      // Actualizar el valor total solo para los productos que ya estaban en la tabla
      const cantidad = parseInt(quantityCell.textContent);
      const precio = product.price.replace(/\./g, '');
      total += precio * cantidad;
    } else {
      // Si el producto no existe en la tabla, agregar una nueva fila
      const row = document.createElement('tr');

      const imgCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = product.img;
      img.alt = product.name;
      img.width = "100";
      img.height = "100";
      imgCell.appendChild(img);
      row.appendChild(imgCell);

      const nameCell = document.createElement('td');
      nameCell.textContent = product.name;
      row.appendChild(nameCell);

      quantityCell = document.createElement('td');
      quantityCell.textContent = 1;
      row.appendChild(quantityCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = product.price;
      row.appendChild(priceCell);

      table.appendChild(row);

      // No actualizar el valor total para el nuevo producto
      total = 0;
    }

    console.log(total); // Mostrar el valor total en cada iteración
  });

  // Actualizar el valor total después de recorrer el carrito
  const total = Array.from(table.children).reduce((acc, row) => {
    const priceCell = row.querySelector('td:nth-child(4)');
    const price = priceCell.textContent.replace(/\./g, '');
    const quantityCell = row.querySelector('td:nth-child(3)');
    const quantity = parseInt(quantityCell.textContent);
    const productTotal = price * quantity;
    return acc + productTotal;
  }, 0);

  // Actualizar el elemento HTML con el valor total
  totalElement.textContent = `Total: $${total.toLocaleString()}`;
});

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

function comprar() {
  // limpiar el carrito después de 1 segundo
  
  setTimeout(function() {
    clearCart();
  }, 2000);
}

