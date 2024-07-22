/* eslint-disable semi */
const btnDerecha = document.getElementById("btn_derecha")
const btnIzquierda = document.getElementById("btn_izquierda")
const Pizquierda = document.getElementById("izquierda")
const Pderecha = document.getElementById("derecha")
const Pselecion = document.getElementById("seleccion")
const Pcentral = document.getElementById("central")

const crearJugadores = (p = []) => {
  p.forEach((e) => { e.className = "col-3 d-flex justify-content-center align-items-center" })
}

const ajustePage = (x = HTMLElement) => {
  const classAsignar = "col-6 text-center mt-5 bg-img"
  Pcentral.className = classAsignar
  Pselecion.className = "d-none";
  [x][0].src = "../public/imgs/user-pc.png"
}

const seleccionLado = () => {
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
  let cuentaD = 0; let cuentaI = 0; let contaEmpates = 0

  const lisEnemi = new Set()
  const avi = document.getElementById("avisos")
  const lis = document.querySelectorAll(`${id} button`)

  lis.forEach((btn) => {
    // poderes del lenemigo
    lisEnemi.add(btn.title)

    btn.addEventListener("click", (event) => {
      // modificar poder del enemigo cada seleccion de ataque del jugador.
      const p = Math.floor(Math.random() * (2 - 0 + 1)) + 0
      // modificar el toast cuando un jugador elije poder.
      const padreToast = document.getElementById("toast-conte")
      const toastHijo = [padreToast][0].children[0]
      toastHijo.className = "toast show bg-bord"
      // eleciones de jugaores
      const newL = [...lisEnemi]
      const data = document.getElementById("data")
      const ganadores = document.getElementById("ganadores")
      const lugarD = document.getElementById("A-derecha")
      const lugarI = document.getElementById("A-izquierda")
      const cd = document.getElementById("contador-d")
      const ci = document.getElementById("contador-i")

      const verGanador = (v1, v2) => {
        if (v1 === "Tijeras" & v2 === "Papel" || v1 === "Piedra" & v2 === "Tijeras" || v1 === "Papel" & v2 === "Piedra") {
          if (cuentaD !== null) { cuentaD++ } cd.innerText = cuentaD
        } else if (v1 === "Piedra" & v2 === "Papel" || v1 === "Tijeras" & v2 === "Piedra" || v1 === "Papel" & v2 === "Tijeras") {
          if (cuentaI !== null) { cuentaI++ } ci.innerText = cuentaI
        } else {
          if (contaEmpates !== null) { contaEmpates++; avi.innerText = `empates: ${contaEmpates}` }
        }
      }
      const terna = (p) => {
        const x = p === 3 ? "el Jugador" : "la IA"
        ganadores.innerText = `el ganador es ${x}`
      }

      if (id === "#poderes_j") {
        lugarI.innerText = newL[p]
        lugarD.innerText = btn.title
        verGanador(btn.title, newL[p])
        terna(cuentaD)
      } else {
        lugarI.innerText = btn.title
        lugarD.innerText = newL[p]
        verGanador(newL[p], btn.title)
        terna(cuentaI)
      }

      if (cuentaD === 3 || cuentaI === 3) {
        setTimeout(() => { data.className = avi.className = ci.className = cd.className = "invisible" }, 1500)
        ganadores.className = "visible"
        cuentaD = cuentaI = contaEmpates = null
      }
      // toastHijo.children[1].children[1].innerText = `{btn.title} ${newL[eleccionP - 1]}`
      // toastHijo.children[0].children[0].src = "atacante de turno"
    })
  })
}

alerts("#poderes_j")
alerts("#poderes_ex")
