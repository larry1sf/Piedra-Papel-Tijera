/* eslint-disable no-return-assign */
/* eslint-disable semi */
// anulando el toast por el momento.
// const Toast = document.getElementById("toast")
// Toast.className = "d-none"

const btnDerecha = document.getElementById("btn_derecha")
const btnIzquierda = document.getElementById("btn_izquierda")

const Pizquierda = document.getElementById("izquierda")
const Pderecha = document.getElementById("derecha")

const Pselecion = document.getElementById("seleccion")
const Pcentral = document.getElementById("central")

const crearJugadores = (p = []) => {
  p.forEach(e => e.className = "col-3 d-flex justify-content-center align-items-center")
}

function ajustePage(x = HTMLElement) {
  const classAsignar = "col-6 text-center mt-5 bg-img"
  Pcentral.className = classAsignar
  Pselecion.className = "d-none";
  [x][0].src = "../public/imgs/user-pc.png"
}

const seleccionLado = (lisBtns = []) => {
  const hacerInvisible = (el = "") => {
    const AtaquesPc = document.getElementById(`poderes_${el}`)
    const AvisoPc = document.getElementById(`aviso_${el}`)
    AtaquesPc.className = "hstack justify-content-center gap-0 gap-md-2 gap-lg-4 p-2 mb-5 invisible"
    AvisoPc.className = "my-bord bg-bord fs-7 fw-semibold rounded p-0 p-sm-1 p-lg-2 m-0 m-md-1 invisible"
  }
  const semiAjustePage = (lado = HTMLElement) => {
    const x = [lado][0].children[0].children[0]
    crearJugadores([Pderecha, Pizquierda])
    ajustePage(x)
  }

  btnDerecha.addEventListener("click", () => {
    hacerInvisible("ex")
    semiAjustePage(Pizquierda)
  })

  btnIzquierda.addEventListener("click", () => {
    hacerInvisible("j")
    semiAjustePage(Pderecha)
  })
}

seleccionLado([btnIzquierda, btnDerecha])
// logica del juego
const alerts = (id = "") => {
  const lis = document.querySelectorAll(`${id} button`)
  lis.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      //  alert(btn.title)

      const padreToast = document.getElementById("toast-conte")
      const toastHijo = [padreToast][0].children[0]
      toastHijo.className = "toast show bg-bord"
      toastHijo.children[1].children[1].innerText = btn.title
      toastHijo.children[0].children[0].src = "atacante de turno"
      // usar liniea de abajo con condicional para eliminar el toast.
      // setTimeout(() => { toastHijo.className = "toast bg-bord" }, 2500)

      // console.log(toastHijo.children)
    })
  })
}

alerts("#poderes_j")
alerts("#poderes_ex")
