/* eslint-disable semi */
const btnDerecha = document.getElementById("btn_derecha")
const btnIzquierda = document.getElementById("btn_izquierda")
const Pizquierda = document.getElementById("izquierda")
const Pderecha = document.getElementById("derecha")
const Pselecion = document.getElementById("seleccion")
const Pcentral = document.getElementById("central")
const avisoGanadores = document.getElementsByClassName("g-p")
const aGanadores = [...avisoGanadores]
aGanadores.forEach((e) => {
  e.className += " invisible"
})
const reinicio = document.getElementById("btn-re-game")
const ganadores = document.getElementById("ganadores")
const cd = document.getElementById("contador-d")
const ci = document.getElementById("contador-i")
const avi = document.getElementById("avisos")
// const data = document.getElementById("data")
const crearJugadores = (p = []) => {
  p.forEach((e) => {
    e.className = "col-3 d-flex justify-content-center align-items-center"
  })
}
const ajustePage = (x = HTMLElement | "posicion imagen") => {
  Pcentral.className = "col-6 text-center mt-5 bg-img"
  Pselecion.className = "d-none"
  const img = [x][0].children[0]
  img.src =
    "https://larry1sf.github.io/Piedra-Papel-Tijera/user-pc-0edf34d2.png"
  img.ariaLabel = img.title = "Ia"
  // console.log([x][0].ariaLabel)
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

  const sacarImg = (lado = HTMLElement) => {
    const x = [lado][0].children[0].children[0]
    const img = [x][0]
    img.ariaLabel = img.title = "Jugador"
  }
  btnDerecha.addEventListener("click", () => {
    hacerInvisible("ex")
    semiAjustePage(Pizquierda)
    sacarImg(Pderecha)
  })
  btnIzquierda.addEventListener("click", () => {
    hacerInvisible("j")
    semiAjustePage(Pderecha)
    sacarImg(Pizquierda)
  })
}

seleccionLado([btnIzquierda, btnDerecha])

let cuentaD = 0
let cuentaI = 0
let contaEmpates = 0
const disCorazonesD = document.querySelectorAll("#conte-corazones_j")
const disCorazonesI = document.querySelectorAll("#conte-corazones_ex")
const alerts = (id = "") => {
  // poderes del lenemigo
  const lisEnemi = new Set()
  const lis = document.querySelectorAll(`${id} button`)
  lis.forEach((btn) => {
    lisEnemi.add(btn.title)
    const quitConteCorazones = () => {
      const darVisionAviso = (pos, pos2 = "Ganador") => {
        let clrm = aGanadores[pos].className
        clrm = clrm.replace(" invisible", " visible")
        aGanadores[pos].className = `${clrm} parpadeo`
        aGanadores[pos].children[0].innerText = pos2
      }
      const verQuitCorazones = (lado, posA, pos1, pos2) => {
        if (lado === 3) {
          posA[0].className += " bg-bord-in"
          darVisionAviso(pos1)
          darVisionAviso(pos2, "Perdedor")
        }
      }
      verQuitCorazones(cuentaI, disCorazonesD, 0, 1)
      verQuitCorazones(cuentaD, disCorazonesI, 1, 0)
    }
    const allandoGanador = () => {
      quitConteCorazones()
      if (cuentaD === 3 || cuentaI === 3) {
        cuentaD = cuentaI = contaEmpates = null
        let mostraR = reinicio.className
        mostraR = mostraR.replace(" d-none", " d-block")
        reinicio.className = mostraR
        ganadores.className = "visible fs-5 fw-medium"
        const susClases = [ci, cd, avi]
        susClases.forEach((e) => {
          let x = e.className
          x = x.replace(" ver", " no-ver")
          e.className = x
        })
      }
    }

    btn.addEventListener("click", (event) => {
      // modificar poder del enemigo cada seleccion de ataque del jugador.
      const p = Math.floor(Math.random() * (2 - 0 + 1)) + 0
      // modificar el toast cuando un jugador elije poder.
      const padreToast = document.getElementById("toast-conte")
      const toastHijo = [padreToast][0].children[0]
      toastHijo.className = "toast show bg-bord"
      // eleciones de jugaores
      const newL = [...lisEnemi]
      const lugarD = document.getElementById("A-derecha")
      const lugarI = document.getElementById("A-izquierda")
      const verGanador = (v1, v2) => {
        if (cuentaD !== null || cuentaI !== null) {
          if (
            (v1 === "Tijeras") & (v2 === "Papel") ||
            (v1 === "Piedra") & (v2 === "Tijeras") ||
            (v1 === "Papel") & (v2 === "Piedra")
          ) {
            cuentaD++
            cd.innerText = cuentaD
            disCorazonesI[0].children[0].remove()
          } else if (
            (v1 === "Piedra") & (v2 === "Papel") ||
            (v1 === "Tijeras") & (v2 === "Piedra") ||
            (v1 === "Papel") & (v2 === "Tijeras")
          ) {
            cuentaI++
            ci.innerText = cuentaI
            disCorazonesD[0].children[0].remove()
          } else {
            contaEmpates++
            avi.innerText = `empates: ${contaEmpates}`
          }
        }
      }
      const dandoleLugar = (pos1, pos2) => {
        lugarI.innerText = pos1
        lugarD.innerText = pos2
      }

      const veriLados = (li, ld, jg = "el jugador", ene = "la IA") => {
        const textGanador = "el ganador es "
        if (li >= 3) {
          ganadores.innerText = `${textGanador} ${ene} `
        }
        if (ld >= 3) {
          ganadores.innerText = `${textGanador} ${jg} `
        }
      }

      if (id === "#poderes_j") {
        dandoleLugar(newL[p], btn.title)
        verGanador(btn.title, newL[p])
        veriLados(cuentaI, cuentaD)
        // histor[cuentaD] = [newL[p], btn.title]
      } else {
        dandoleLugar(btn.title, newL[p])
        verGanador(newL[p], btn.title)
        veriLados(cuentaD, cuentaI)
      }
      allandoGanador()
    })
  })
}

reinicio.addEventListener("click", () => {
  ci.innerText = cd.innerText = cuentaD = cuentaI = contaEmpates = 0
  avi.innerText = ""
  reinicio.className = "d-none"
  const newVisibility = [avi, ci, cd]
  newVisibility.forEach((e) => {
    let x = e.className
    x = x.replace(" no-ver", " ver")
    e.className = x
  })
  ganadores.className = "invisible fs-5"
  aGanadores.forEach((e) => {
    let x = e.className
    x = x.replace(" visible", " invisible")
    e.className = x
  })
  const er = [...disCorazonesD, ...disCorazonesI]
  er.forEach((i) => {
    const corazones = `
      <i title="vidas">
            <svg fill="#ffffff" width="100%" height="3rem" viewBox="0 0 512 512" version="1.1" xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                stroke-width="9.216"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="heart_wings-angel-heart-love-valentine">
                  <path
                    d="M230.321,153.667c-7.017-7.196-8.387-18.749-2.105-26.594c7.145-8.922,20.021-9.403,27.784-1.442 c7.763-7.96,20.64-7.479,27.784,1.442c6.283,7.845,4.913,19.398-2.104,26.594l-19.952,20.46c-3.14,3.22-8.315,3.22-11.455,0 L230.321,153.667z M472,162.56v13.36c0,14.24-9.44,26.8-23.2,30.72c-11.308,3.29-3.213,0.954-40.8,11.76l32,3.84v10.8 c0,14.32-9.44,26.88-23.12,30.8c-11.451,3.301-3.294,0.954-40.88,11.76l32,3.84v10.8c0,14.32-9.44,26.88-23.2,30.8l-65.516,18.811 l-34.976,35.079c-7.504,7.496-17.816,11.789-28.309,11.789s-20.805-4.293-28.297-11.777l-34.987-35.091L127.2,321.04 c-13.76-3.92-23.2-16.48-23.2-30.8v-10.8l32-3.84c-37.585-10.806-29.429-8.459-40.88-11.76C81.44,259.92,72,247.36,72,233.04v-10.8 l32-3.84c-37.586-10.806-29.492-8.47-40.8-11.76C49.44,202.72,40,190.16,40,175.92v-13.36c0-5.28,5.12-9.12,10.16-7.68L208.72,200 c5.429,1.558,10.09,4.568,13.876,8.405c2.752,0.284,5.511,0.68,8.267,1.325c9.129,2.059,17.711,6.188,25.137,12.059 c7.43-5.871,16.02-10.004,25.199-12.074c2.735-0.64,5.475-1.031,8.208-1.313c3.785-3.836,8.446-6.844,13.873-8.401l158.56-45.12 C466.88,153.44,472,157.28,472,162.56z M328.496,307.953c17.906-17.98,20.305-45.945,5.578-65.055 c-11.855-15.199-30.734-21.965-49.289-17.59c-8.723,1.969-16.699,6.398-23.129,12.828c-3.125,3.125-8.188,3.125-11.313,0 c-6.43-6.43-14.406-10.859-23.066-12.813c-3.746-0.879-7.504-1.309-11.215-1.309c-14.727,0-28.684,6.75-38.148,18.902 c-14.715,19.078-12.32,47.051,5.594,65.039l55.52,55.676c9,9,24.934,9.012,33.957-0.012L328.496,307.953z M295.766,240 c-4.418,0-8,3.582-8,8s3.582,8,8,8c4.316,0,8.379,1.691,11.441,4.762c6.395,6.41,6.395,16.84,0,23.25 c-3.121,3.125-3.113,8.191,0.016,11.313c3.101,3.101,8.177,3.128,11.313-0.016c12.609-12.637,12.609-33.207,0-45.844 C312.449,243.359,304.363,240,295.766,240z">
                  </path>
                </g>
                <g id="Layer_1"></g>
              </g>
            </svg></i>
        `.repeat(3)
    // const corazones = corazon.repeat(3)
    if (i.children.length < 3) {
      let y = i.className
      y = y.replace(" bg-bord-in", " bg-bord")
      i.className = y
      i.innerHTML = corazones
    }
  })
})

alerts("#poderes_j")
alerts("#poderes_ex")
