let cantidadComprada = 0;
let precioTotalVenta = 0;

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

// aquí tengo la función que pasa cuando le meto clicks
function addToCart(precio, id, stock) {
	for (producto of listaProductos) {
		if (producto.id === id) {
			stock > 0
				? (carrito.push(precio),
				  producto.venta(1),
				  (precioTotalVenta = carrito.reduce(
						(partialSum, a) => partialSum + a,
						0
				  )),
				  saveInLocalStorage(),
				  impresorPrecios(),
				  mostrarProductos())
				: stockInsuficiente(producto);
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
}

function vaciarCarro() {
	let vaciador = document.querySelector(".vaciarCarro");
	vaciador.innerHTML = "";

	vaciador.innerHTML = `<button id="vaciadorCarrito" type="button" class="btn btn-danger" onclick="clearStorage()">Vaciar carro</button>`;
	inputPrecio.appendChild(vaciador);
}

mostrarProductos();
impresorPrecios();
vaciarCarro();

console.log(carrito);
