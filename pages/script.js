let cantidadComprada;
let precioTotalVenta = 0;
var var1 = "bla";
var var2 = "bebi";

// estructura de los productos
function Producto(nombre, precio, stock, categoria, id, img, title) {
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
  this.categoria = categoria;
  this.id = id;
  this.img = img;
  this.title = title;

  this.venta = function (cantidadComprada) {
    this.stock -= cantidadComprada;
    console.log("El stock remanente es de: " + this.stock + " " + this.nombre);
  };
}

const producto1 = new Producto(
  "perro cachorro",
  12000,
  10,
  "perro",
  001,
  "../img/img4.png",
  "Vitalcan Complete perro junior razas medianas y grandes"
);
const producto2 = new Producto(
  "perro adulto",
  18000,
  15,
  "perro",
  002,
  "../img/img1.png",
  "Vitalcan Complete perro adulto razas medianas y grandes"
);
const producto3 = new Producto(
  "gato cachorro",
  17000,
  8,
  "gato",
  003,
  "../img/img2.png",
  "Vitalcan Complete gatos cachorros para toda raza"
);
const producto4 = new Producto(
  "gato adulto",
  20000,
  12,
  "gato",
  004,
  "../img/img3.png",
  "Vitalcan Complete gato adulto control peso"
);

const listaProductos = [producto1, producto2, producto3, producto4];
const carrito = [];

function mostrarProductos() {
  let catalogo = document.querySelector(".laGaleria");
  catalogo.innerHTML = "";

  for (const producto of listaProductos) {
    let contenedor = document.createElement("div");

    // descubrí que esto se puede hacer así de forma muy descarada

    contenedor.className = "card col-lg-3";
    contenedor.id = producto.id;
    contenedor.style = "width: 18rem";

    contenedor.innerHTML = `<h3>${producto.nombre}</h3>
                            <b>$${producto.precio}</b>
                            <img class="gallery__img" src="${producto.img}" title="${producto.title}"/>
                            <p>${producto.title}</p>
                            <button type="button" class="btn btn-primary" onclick="addToCart(${producto.precio})">+</button>
                            <br>`;
    // voy a utilizar esto de abajo a futuro
    // contenedor.onclick = () => addToCart(producto);
    catalogo.appendChild(contenedor);
  }
}

function addToCart(precio) {
  console.log(precio);
  carrito.push(precio);
  precioTotalVenta = carrito.reduce((partialSum, a) => partialSum + a, 0);
  console.log(carrito);
  impresorPrecios();
}

// por ahora no la estoy usando, pero tal vez la vuelva a usar a futuro
function stockInsuficiente(stock) {
  alert(
    "No tenemos stock suficiente de ese producto, puede comprar hasta " +
      stock +
      " unidades"
  );
}

// por ahora no la estoy usando, pero tal vez la vuelva a usar a futuro
function stockSuficiente(stock, nombre) {
  stock -= cantidadComprada;
  console.log("Quedan: " + stock + " sacos de alimento para " + nombre);
}

// función para imprimir el total de la boleta
function impresorPrecios() {
  let inputPrecio = document.querySelector(".total");
  inputPrecio.innerHTML = "";

  let contenedor = document.createElement("div");

  contenedor.innerHTML = `<div class="elTotal"">
                            <b>El total de su boleta es de: $${precioTotalVenta}</b>`;
  inputPrecio.appendChild(contenedor);
}

mostrarProductos();
impresorPrecios();

console.log(carrito);
