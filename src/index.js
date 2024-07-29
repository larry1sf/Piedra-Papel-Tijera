/* eslint-disable semi */
const btnDerecha = document.getElementById("btn_derecha")
const btnIzquierda = document.getElementById("btn_izquierda")
const Pizquierda = document.getElementById("izquierda")
const Pderecha = document.getElementById("derecha")
const Pselecion = document.getElementById("seleccion")
const Pcentral = document.getElementById("central")
const avisoGanadores = document.getElementsByClassName("g-p")
const aGanadores = [...avisoGanadores]
aGanadores.forEach((e) => { e.className += " invisible" })

const reinicio = document.getElementById("btn-re-game")
const crearJugadores = (p = []) => {
  p.forEach((e) => { e.className = "col-3 d-flex justify-content-center align-items-center" })
}

const ajustePage = (x = HTMLElement | "posicion imagen") => {
  Pcentral.className = "col-6 text-center mt-5 bg-img"
  Pselecion.className = "d-none";
  [x][0].src = "https://larry1sf.github.io/Piedra-Papel-Tijera/user-pc-0edf34d2.png"
}

const seleccionLado = () => {
  const hacerInvisible = (el = "") => {
    const AtaquesPc = document.getElementById(`poderes_${el}`)
    const AvisoPc = document.getElementById(`aviso_${el}`)
    AtaquesPc.className += " invisible"
    AvisoPc.className += " invisible"
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
  const lis = document.querySelectorAll(`${id} button`)
  const disCorazonesD = document.querySelectorAll("#conte-corazones_j")
  const disCorazonesI = document.querySelectorAll("#conte-corazones_ex")

  lis.forEach((btn) => {
    // poderes del lenemigo
    lisEnemi.add(btn.title)
    // crear boton de volver a jugar.

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
      const avi = document.getElementById("avisos")

      const verGanador = (v1, v2) => {
        if (v1 === "Tijeras" & v2 === "Papel" || v1 === "Piedra" & v2 === "Tijeras" || v1 === "Papel" & v2 === "Piedra") {
          if (cuentaD !== null) { cuentaD++; cd.innerText = cuentaD; disCorazonesI[0].children[0].remove() }
        } else if (v1 === "Piedra" & v2 === "Papel" || v1 === "Tijeras" & v2 === "Piedra" || v1 === "Papel" & v2 === "Tijeras") {
          if (cuentaI !== null) { cuentaI++; ci.innerText = cuentaI; disCorazonesD[0].children[0].remove() }
        } else {
          if (contaEmpates !== null) { contaEmpates++; avi.innerText = `empates: ${contaEmpates}` }
        }
      }
      const dandoleLugar = (pos1, pos2) => {
        lugarI.innerText = pos1
        lugarD.innerText = pos2
      }

      const quitConteCorazones = () => {
        const darVisionAviso = (pos, pos2 = "Ganador") => {
          let clrm = aGanadores[pos].className; clrm = clrm.replace(" invisible", " visible")
          aGanadores[pos].className = clrm; aGanadores[pos].children[0].innerText = pos2
        }
        const verQuitCorazones = (lado, posA, pos1, pos2) => {
          if (lado === 3) { posA[0].className += " bg-bord-in"; darVisionAviso(pos1); darVisionAviso(pos2, "Perdedor") }
        }
        verQuitCorazones(cuentaI, disCorazonesD, 0, 1)
        verQuitCorazones(cuentaD, disCorazonesI, 1, 0)
      }
      // modificar esto para volver a emezar al llegar a 3 sacar un boton para reiniciar.
      const allandoGanador = () => {
        quitConteCorazones()
        if (cuentaD === 3 || cuentaI === 3) {
          setTimeout(() => { data.className = avi.className = ci.className = cd.className = "invisible" }, 1000)
          cuentaD = cuentaI = contaEmpates = null
          reinicio.className = "d-block"
          ganadores.className = "visible"
        }
        reinicio.addEventListener("click", () => {
          cuentaD = cuentaI = contaEmpates = 0
          ci.innerText = cd.innerText = 0
          data.className = avi.className = ci.className = cd.className = "visible"
          ganadores.className = "invisible"
          reinicio.className = "d-none"
          aGanadores.forEach((e) => { let x = e.className; x = x.replace(" visible", " invisible"); e.className = x })
          // aGanadores[0].className.replace(" invisibles", "invisible")
          // aGanadores[1].className.replace(" invisibles", "invisible")
        })
      }

      const veriLados = (li, ld, jg = "jugador", ene = "la IA") => {
        const textGanador = "el ganador es "
        if (li >= 3) { ganadores.innerText = `${textGanador} ${ene}` }
        if (ld >= 3) { ganadores.innerText = `${textGanador} ${jg}` }
      }
      // const histor = {}
      if (id === "#poderes_j") {
        dandoleLugar(newL[p], btn.title); verGanador(btn.title, newL[p]); veriLados(cuentaI, cuentaD)
        // histor[cuentaD] = [newL[p], btn.title]
      } else {
        dandoleLugar(btn.title, newL[p]); verGanador(newL[p], btn.title); veriLados(cuentaI, cuentaD, "la IA", "el jugador")
        // histor[cuentaI] = [btn.title, newL[p]]
      } allandoGanador()
    })
  })

  // reGame([cuentaD, cuentaI])
}

alerts("#poderes_j")
alerts("#poderes_ex")
