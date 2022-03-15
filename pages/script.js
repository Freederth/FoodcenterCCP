let cantidadComprada = 0;
let precioTotalVenta = 0;
var var1 = "bla";
var var2 = "bebi";

// estructura de los productos
function Producto(nombre, precio, stock, cantidad, categoria, id, img, title) {
	this.nombre = nombre;
	this.precio = precio;
	this.stock = stock;
	this.cantidad = cantidad;
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
	0,
	"perro",
	001,
	"../img/img4.png",
	"Vitalcan Complete perro junior razas medianas y grandes"
);
const producto2 = new Producto(
	"perro adulto",
	18000,
	15,
	0,
	"perro",
	002,
	"../img/img1.png",
	"Vitalcan Complete perro adulto razas medianas y grandes"
);
const producto3 = new Producto(
	"gato cachorro",
	17000,
	8,
	0,
	"gato",
	003,
	"../img/img2.png",
	"Vitalcan Complete gatos cachorros para toda raza"
);
const producto4 = new Producto(
	"gato adulto",
	20000,
	12,
	0,
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
                            <p>Quedan: ${producto.stock} unidades</p>
                            <img class="gallery__img" src="${producto.img}" title="${producto.title}"/>
                            <p>${producto.title}</p>
                            <button id="boton${producto.id}" type="button" class="btn btn-primary" onclick="addToCart(${producto.precio},${producto.id},${producto.stock})">+</button>
                            <br>`;
		// voy a utilizar esto de abajo a futuro
		// contenedor.onclick = () => addToCart(producto);
		catalogo.appendChild(contenedor);
	}
}

function addToCart(precio, id, stock) {
	for (producto of listaProductos) {
		if (producto.id === id) {
			if (stock > 0) {
				carrito.push(precio);
				producto.venta(1);

				precioTotalVenta = carrito.reduce((partialSum, a) => partialSum + a, 0);
				impresorPrecios();
				mostrarProductos();
			} else {
				stockInsuficiente(producto);
			}
		}
	}
}

function stockInsuficiente(producto) {
	console.log("No nos queda de eso ):");
	let inputPrecio = document.querySelector(".total-2");
	inputPrecio.innerHTML = "";

	let contenedor = document.createElement("div");

	contenedor.innerHTML = `<div class="elTotal-2"">
                            <b>No tenemos stock suficiente de ${producto.title} ):</b>`;
	inputPrecio.appendChild(contenedor);
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
