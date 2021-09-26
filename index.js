function removeResults() {
  const productEl = document.querySelectorAll(".content-product");

  productEl.forEach((prod) => prod.remove());
}

function resultados(result) {
  console.log(result);

  removeResults();
  const contenedor = document.querySelector(".content");
  const template = document.querySelector("#product-template");
  const cantidad = document.querySelector(".cantidad-resultados");
  //contenedor.link.addEventListener("click", (e) => {
  //Window.open(contenedor.permalink);
  //});

  cantidad.textContent = result.length;

  for (const productos of result) {
    console.log(productos);

    const nombreEl = template.content.querySelector(".nombre-producto");
    nombreEl.textContent = productos.title;

    const precioEl = template.content.querySelector(".content-price");
    precioEl.textContent = "$" + productos.price;

    const vendidosEl = template.content.querySelector(".content-vendidos");
    vendidosEl.textContent = productos.available_quantity;

    const condicionEl = template.content.querySelector(".content-estado");
    condicionEl.textContent = productos.attributes[1].value_name;

    const imgEl = template.content.querySelector(".image-product");
    imgEl.src = productos.thumbnail;

    const link = template.content.querySelector(".link");
    link.url = productos.permalink;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
  console.log(contenedor.link);
}

function ok(data) {
  const usar = data.link;
  return window.open(usar);
}

function main() {
  const formEl = document.querySelector(".buscar-form");

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const valorABuscar = e.target.buscar.value;
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + valorABuscar)
      .then((response) => response.json())
      .then((data) => resultados(data.results));
  });
}

main();
