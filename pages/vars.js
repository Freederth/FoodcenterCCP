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
