/* eslint-disable no-return-assign */
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
  p.forEach(e => e.className = "col-3 d-flex justify-content-center align-items-center")
}

function ajustePage(x) {
  const classAsignar = "col-6 text-center mt-5 bg-img"
  Pcentral.className = classAsignar
  Pselecion.className = "d-none"
  crearJugadores([Pderecha, Pizquierda])

  console.log([x][0].src = "../public/imgs/user-pc.png")
}

const seleccionLado = (lisBtns = []) => {
  lisBtns.forEach(() => {
    btnIzquierda.addEventListener("click", () => {
      const x = [Pderecha][0].children[0].children[0]
      ajustePage(x)
    })

    btnDerecha.addEventListener("click", () => {
      const x = [Pizquierda][0].children[0].children[0]
      ajustePage(x)
    })
  })
}

seleccionLado([btnIzquierda, btnDerecha])
