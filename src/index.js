/* eslint-disable semi */
// anulando el toast por el momento.
const Toast = document.getElementById("toast")
Toast.className = "d-none"

const btnDerecha = document.getElementById("btn_derecha")
const btnIzquierda = document.getElementById("btn_izquierda")

const Pizquierda = document.getElementById("izquierda")
const Pderecha = document.getElementById("derecha")

const Pselecion = document.getElementById("seleccion")
const Pcentral = document.getElementById("central")

const crearJugadores = (p = []) => {
  p.forEach((e) => { e.className = "col-3 d-flex justify-content-center align-items-center" })
}

function ajusteCentral() {
  const classAsignar = "col-6 text-center mt-5 bg-img"
  Pcentral.className = classAsignar
  crearJugadores([Pderecha, Pizquierda])
  Pselecion.className = "d-none"
}

const seleccionLado = (btn = []) => {
  btn.forEach((e) => { e.addEventListener("click", ajusteCentral) })
}

seleccionLado([btnIzquierda, btnDerecha])

const e = document.querySelectorAll("#poderes_j button")

console.log(e)
