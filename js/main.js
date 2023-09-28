const descuento = x => x * 0.15;
const recargo = x => x * 0.10;
let productos = [
  { idProducto: 1, nombre: "Azul Malbec", descripción: "Color rojo violáceo, sus aromas recuerdan a frutas rojas maduras como ciruelas, guindas y moras. En boca aparecen taninos suaves y dulces, de intensidad media con largo final.", precio: 500, presentación:" - 750ml"},
  { idProducto: 2, nombre: "Azul Cabernet Sauvignon", descripción: "Color rojo rubí profundo, aroma a especias y frutas rojas maduras combinadas con pimiento dulce. En boca aparecen taninos maduros y complejos con una fina acidez que confieren al vino una gran personalidad. De intensidad media, con largo final que llena la boca e invita a seguir bebiendo.", precio: 600, presentación:" - 750ml" },
  { idProducto: 3, nombre: "Azul Sauvignon Blanc", descripción: "A la vista color amarillo, con tonalidades verdosas, brillante. En nariz encontramos intensos aromas cítricos,pomelo rosado, lima, con una interesante nota de ruda. En boca percibimos una entrada cítrica, y fresca de sabores intensos, con un final prolongado. ", precio: 550, presentación:" - 750ml" },
  { idProducto: 4, nombre: "Azul Reserva", descripción: "60% Malbec 40% Cabernet Sauvignon \nVino que nos sorprende por su complejidad e intensidad. De matriz rojo guinda muy intenso, límpido, en la nariz se siente intenso con frutos del bosque y pimienta, ensamblado con aromas a vainilla y chocolate. En la boca los taninos son agradables, de buen cuerpo, complejo, de acidez refrescante, y con largo final.", precio: 700, presentación:" - 750ml" },
];
let opcionCompra = "";
let productosFiltrados = [];
let carrito = [];
let salida = "";
let subtotal = 0;
let totalAPagar = 0;

alert("Bienvenido a Bodega La Azul");
let nombre = prompt("Ingrese su nombre").trim().toUpperCase();
let edad = Number(prompt("Ingrese su edad"));

if (edad >= 18) {
  alert("Bienvenido " + nombre + "\nA continuación podrás realizar la compra. \nCon la compra de tres o más botellas tendrás un descuento del 15%.");
  do {
    opcionCompra = prompt("Ingrese el producto a comprar: \n1-Azul Malbec\n2-Azul Cabernet Sauvignon\n3-Azul Sauvignon Blanc\n4-Azul Reserva\n0-Para finalizar compra");
    switch (opcionCompra) {
      case "1":
        productosFiltrados = productos.filter(producto => producto.nombre === "Azul Malbec");
        productosFiltrados.forEach(producto =>
          producto.venta = Number(prompt("Ingrese la cantidad de " + producto.nombre + " " + producto.presentación + "\n" + producto.descripción + "\nPrecio: $ " + producto.precio))
        );
        carrito = carrito.concat(productosFiltrados.filter(producto => producto.venta > 0));
        break;
      case "2":
        productosFiltrados = productos.filter(producto => producto.nombre === "Azul Cabernet Sauvignon");
        productosFiltrados.forEach(producto =>
          producto.venta = Number(prompt("Ingrese la cantidad de " + producto.nombre + " " + producto.presentación + "\n" + producto.descripción + "\nPrecio: $ " + producto.precio))
        );
        carrito = carrito.concat(productosFiltrados.filter(producto => producto.venta > 0));
        break;
      case "3":
        productosFiltrados = productos.filter(producto => producto.nombre === "Azul Sauvignon Blanc");
        productosFiltrados.forEach(producto =>
          producto.venta = Number(prompt("Ingrese la cantidad de " + producto.nombre + " " + producto.presentación + "\n" + producto.descripción + "\nPrecio: $ " + producto.precio))
        );
        carrito = carrito.concat(productosFiltrados.filter(producto => producto.venta > 0));
        break;
      case "4":
        productosFiltrados = productos.filter(producto => producto.nombre === "Azul Reserva");
        productosFiltrados.forEach(producto =>
          producto.venta = Number(prompt("Ingrese la cantidad de " + producto.nombre + " " + producto.presentación + "\n" + producto.descripción + "\nPrecio: $ " + producto.precio))
        );
        carrito = carrito.concat(productosFiltrados.filter(producto => producto.venta > 0));
        break;
      case "0":
        break;
      default:
        alert("Por favor ingrese alguna de las opciones válidas");
        break;
    }
  } while (opcionCompra !== "0");

  let cantidadTotalComprada = carrito.reduce((acumulador, producto) => acumulador + producto.venta, 0);
  carrito.forEach(producto => { salida += producto.venta + " unidades de " + producto.nombre + " " + producto.presentación + "\n" });

  if (cantidadTotalComprada < 3 && cantidadTotalComprada > 0) {
    alert(salida);
    carrito.forEach(producto => { subtotal += producto.venta * producto.precio });
    totalAPagar = subtotal;
    alert("Usted ha comprado " + carrito.reduce((acumulador, producto) => acumulador + producto.venta, 0) + " unidades. \nNo posee descuento\nTotal a pagar: $ " + totalAPagar);
  }
  
  if (cantidadTotalComprada >= 3) {
    alert(salida);
    carrito.forEach(producto => { subtotal += producto.venta * producto.precio });
    totalAPagar = subtotal - descuento(subtotal);
    alert("Usted ha comprado " + carrito.reduce((acumulador, producto) => acumulador + producto.venta, 0) + " unidades. \nHa sido beneficiado por un descuento de $ " + descuento(subtotal).toFixed(2) + "\nTotal a pagar: $ " + totalAPagar);

    cantidadCuotas = Number(prompt("Por favor ingrese la cantidad de cuotas en las que desea abonar"));
    if (cantidadCuotas === 1) {
      alert("Usted abonará en un pago el total de: $" + totalAPagar + "\nNo se han sumado cargos por financiación");
    } else {
      let totalAPagarFinanciado = totalAPagar + recargo(totalAPagar);
      alert("Usted abonará en " + cantidadCuotas + " cuotas el total de: $" + totalAPagarFinanciado + "\nSe han sumado cargos por financiación por $ " + recargo(totalAPagar).toFixed(2));
      for (let i = 0; i < cantidadCuotas; i++) {
        let salidaCuotas = "Pagará en " + cantidadCuotas + " cuotas de $" + (totalAPagarFinanciado / cantidadCuotas).toFixed(2) + "\nCuota " + (i + 1) + " de $ " + (totalAPagarFinanciado / cantidadCuotas).toFixed(2);
        alert(salidaCuotas);
      }
    }
  }
  alert("Muchas gracias " + nombre + " por comprar en Bodega La Azul \nEsperamos que disfrute de nuestros productos");
} else {
  alert("Para comprar debe ser mayor de edad");
}


