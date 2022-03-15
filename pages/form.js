function validateForm() {
  let nombre = document.forms.formis;
  let apellido = document.forms["formis"]["sname"].value;
  let correo = document.forms["formis"]["mail"].value;
  let mensaje = document.forms["formis"]["mensaje"].value;
  if (nombre === "") {
    console.log("Ingresa tu nombre");
    console.log("caca", nombre);
    return false;
  } else {
    let print = document.getElementById("print");
    print.innerHTML = `${nombre}`;
  }

  if (apellido === "") {
    console.log("Ingresa tu apellido");
    return false;
  } else {
    let print = document.getElementById("print");
    print.innerHTML = `${apellido}`;
  }
  if (correo === "") {
    console.log("Ingresa tu correo");
    return false;
  } else {
    let print = document.getElementById("print");
    print.innerHTML = `${correo}`;
  }
  if (mensaje === "") {
    console.log("Manda un mensaje");
    return false;
  } else {
    let print = document.getElementById("print");
    print.innerHTML = `${mensaje}`;
  }
  event.preventDefault(); //importante, evita que se recargue la pagina
}
console.log("aparezco");
validateForm();
