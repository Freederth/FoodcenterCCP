function validateForm() {
  let nombre = document.forms.formis;
  //   let nombre = nombref.nombre.value;
  let apellido = document.forms["formis"]["sname"].value;
  let correo = document.forms["formis"]["mail"].value;
  let mensaje = document.forms["formis"]["mensaje"].value;
  if (nombre === "") {
    console.log("Ingresa tu nombre");
    console.log("caca", nombre);
    return false;
  } else if (apellido === "") {
    console.log("Ingresa tu apellido");
    return false;
  } else if (correo === "") {
    console.log("Ingresa tu correo");
    return false;
  } else if (mensaje === "") {
    console.log("Manda un mensaje");
    return false;
  }
}
console.log("aparezco");
validateForm();
