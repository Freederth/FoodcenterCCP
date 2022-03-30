let cantidadComprada = 0;
let precioTotalVenta = 0;
let listaProductos = [];

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

fetch("../data.json")
	.then(response => response.json())
	.then(data => {
		data.forEach(producto =>
			listaProductos.push(
				new Producto(
					producto.nombre,
					producto.precio,
					producto.stock,
					producto.cantidad,
					producto.categoria,
					producto.id,
					producto.img,
					producto.title
				)
			)
		);
		mostrarProductos();
		console.log(listaProductos);
	});

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
	vaciarCarro();
}

// aquí tengo la función que pasa cuando le meto clicks
function addToCart(precio, id, stock) {
	for (producto of listaProductos) {
		if (producto.id === id) {
			if (stock > 0) {
				carrito.push(precio);
				producto.venta(1);

				precioTotalVenta = carrito.reduce((partialSum, a) => partialSum + a, 0);
				saveInLocalStorage(); //guardo en el local storage
				impresorPrecios();
				mostrarProductos();
				tostadita("Agregaste '" + producto.title + "' al carro");
			} else {
				stockInsuficiente(producto);
			}
		}
	}
}

function saveInLocalStorage() {
	//acumulador, recorre el array del carrito y va sumando los precios.
	let total = 0;
	for (let i = 0; i < carrito.length; i++) {
		total = total + carrito[i];
	}

	JSON.stringify(total); //JSON solo acepta string (comun en las BB.DD). Debo parsearlo, json lo lee como un unico string
	localStorage.setItem("precio_carrito", total); //guardo el array en el storage
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
	let totalDelStorage = 0;
	totalDelStorage = localStorage.getItem("precio_carrito"); //Accedo al valor a traves de la key
	totalDelStorage = parseInt(totalDelStorage); //no uso el JSON.parse porque es para objetos. parseo de string a int
	console.log(totalDelStorage); //vale igual que precioTotalVenta

	let inputPrecio = document.querySelector(".total");
	inputPrecio.innerHTML = "";

	let contenedor = document.createElement("div");

	contenedor.innerHTML = `<div class="elTotal"">
                            <b>El total de su boleta es de: $${totalDelStorage}</b>
							<br>`;
	inputPrecio.appendChild(contenedor);
}

//borro todo del storage desde el html
function clearStorage() {
	console.log("Storage vaciado");
	localStorage.clear();
	impresorPrecios();
	tostadita("Vaciaste el carro!");
}

function vaciarCarro() {
	let vaciador = document.querySelector(".vaciarCarro");
	vaciador.innerHTML = "";

	let contenedor = document.createElement("div");

	contenedor.innerHTML = `<button id="vaciadorCarrito" type="button" class="btn btn-danger" onclick="clearStorage();">Vaciar carro</button>`;
	vaciador.appendChild(contenedor);

	// toast();
}

function tostadita(text) {
	Toastify({
		text,
		duration: 3000,
		position: "center",
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)"
		}
	}).showToast();
}

mostrarProductos();
impresorPrecios();

console.log(carrito);
