let cantidadComprada;
let precioTotalVenta = 0;

function Producto(nombre, precio, stock, categoria, id) {
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
  this.categoria = categoria;
  this.id = id;

  this.venta = function (cantidadComprada) {
    this.stock -= cantidadComprada;
    console.log("El stock remanente es de: " + this.stock + " " + this.nombre);
  };
}

const producto1 = new Producto("perro cachorro", 12000, 10, "perro", 001);
const producto2 = new Producto("perro adulto", 18000, 15, "perro", 002);
const producto3 = new Producto("gato cachorro", 17000, 8, "gato", 003);
const producto4 = new Producto("gato adulto", 20000, 12, "gato", 004);

const listaProductos = [producto1, producto2, producto3, producto4];
const carrito = [];

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
}

listadoProductos();
comprarProductos();

console.log(carrito);
