let cantidadComprada;
let precioTotalVenta = 0;

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
  "Vitalcan Complete gatos cachorros"
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

    contenedor.innerHTML = `<div class="card imagenCatalogo" id="${producto.id} style=width: 18rem">
                            <h3>${producto.nombre}</h3>
                            <b>$${producto.precio}</b>
                            <img class="gallery__img" src="${producto.img}" title="${producto.title}"/>
                            <p>${producto.title}</p>`;
    catalogo.appendChild(contenedor);
  }
}

function listadoProductos() {
  alert(
    "Tenemos 4 tipos de alimentos: \n1. " +
      producto1.nombre +
      "\n2. " +
      producto2.nombre +
      "\n3. " +
      producto3.nombre +
      "\n4. " +
      producto4.nombre
  );
  mostrarProductos();
}
function stockInsuficiente(stock) {
  alert(
    "No tenemos stock suficiente de ese producto, puede comprar hasta " +
      stock +
      " unidades"
  );
}
function stockSuficiente(stock, nombre) {
  stock -= cantidadComprada;
  console.log("Quedan: " + stock + " sacos de alimento para " + nombre);
}

function calcularPrecio(precio) {
  carrito.push(cantidadComprada * precio);
  precioTotalVenta = carrito.reduce((partialSum, a) => partialSum + a, 0);
  //console.log("por ahora, te sale: " + precioTotalVenta);
}

function compra(producto) {
  cantidadComprada = parseInt(
    prompt("Ingrese la cantidad que quiere comprar:")
  );
  if (cantidadComprada <= producto.stock) {
    producto.venta(cantidadComprada);
    calcularPrecio(producto.precio);
  } else {
    stockInsuficiente(producto.stock);
  }
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

function comprarProductos() {
  let cantidadProductosComprados = parseInt(
    prompt("Ingrese la cantidad de productos distintos que quiere comprar")
  );
  for (let i = 0; i < cantidadProductosComprados; i++) {
    let nombreCompra = prompt(
      "Ingrese el nombre del producto que quiere comprar:"
    );
    nombreCompra = nombreCompra.toLowerCase();

    let productoBuscado = listaProductos.find(x => x.nombre == nombreCompra);
    if (productoBuscado) {
      compra(productoBuscado);
    } else {
      alert("No tenemos ese producto");
    }
    alert("El precio de su compra es de: $" + precioTotalVenta);
  }
  impresorPrecios();
}

listadoProductos();
comprarProductos();

console.log(carrito);
