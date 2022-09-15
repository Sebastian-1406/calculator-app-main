let selectores = document.querySelectorAll(".selector")
let contenedor = document.querySelector("body")

let teclado = document.querySelector(".contenedor-seccion-03")
let pantallaOperacion = document.querySelector(".pantalla-operacion")
let pantallaTotal = document.querySelector(".pantalla-total")
 
let resultado = document.querySelector(".resultado")
let reset = document.querySelector(".reset")
let eliminar = document.querySelector(".del")


a = []
b = []

numero1 = ""
numero2 = ""
 
signo = ""

selectores.forEach(element => {
    element.addEventListener("click", () => {
       selectores.forEach(sele => {
           sele.classList.add("disable") 
           sele.classList.remove("activo")
           if(element.classList[1] == "selector-1"){
               contenedor.classList.add("tema-01")
               contenedor.classList.remove("tema-02")
               contenedor.classList.remove("tema-03")
           }else if(element.classList[1] == "selector-2"){
            contenedor.classList.remove("tema-01")
            contenedor.classList.add("tema-02")
            contenedor.classList.remove("tema-03")
           }else if(element.classList[1] == "selector-3"){
               contenedor.classList.remove("tema-01")
               contenedor.classList.remove("tema-02")
               contenedor.classList.add("tema-03")
           }
       })
       
       element.classList.add("activo")
       element.classList.remove("disable") 
    })
});


teclado.addEventListener("click", (evt) => {
    valor = evt.target
    if(valor.tagName == "BUTTON"){
        if(valor.value == "+" || valor.value == "-" || valor.value == "x" || valor.value == "/"){
            signo = valor.value
        }
        else{
            if (a.length < 9 && signo == "" && valor.value != "=" && valor.value != "RESET" && valor.value != "DEL"){
                a.push(valor.value)
            }else {
                if(b.length < 9 && signo != "" && valor.value != "=" && valor.value != "RESET" && valor.value != "DEL"){                
                    b.push(valor.value)
                }
        }
    }   
        pantallaOperacion.innerHTML = `<p>${a.join("") + " " + signo + " " + b.join("")}</p>`
    }
})
reset.addEventListener("click", () => {
    restablecerOperacion("limpiar", 1)
})

eliminar.addEventListener("click", () => {
    if(signo == "" && a.length > 0){
        a.pop()
        pantallaOperacion.innerHTML = `<p>${a.join("") + " " + signo + " " + b.join("")}</p>`
    }else if(signo != "" && b.length > 0){
        b.pop()
        pantallaOperacion.innerHTML = `<p>${a.join("") + " " + signo + " " + b.join("")}</p>`
    }
})

const restablecerOperacion = (tipo, metodo) => {

    if(tipo == "restablecer" && metodo == 0){
        signo = ""
        numero1 = ""
        numero2 = ""
    }else if(tipo == "limpiar" && metodo == 1) {
        a = []
        b = []
        signo = ""
        numero1 = ""
        numero2 = ""
        pantallaOperacion.innerHTML = ""
        pantallaTotal.innerHTML = ""
        desactivarOperacion(signo)
    }
}

const operaciones = () => {
    
    if(signo != ""){
        desactivarOperacion()
        numero1 =  Number(a.join(""))
        numero2 =  Number(b.join(""))
        pantallaOperacion.innerHTML = ""
        a  = []
        b  = []
        
        if(signo == "+"){
            pantallaTotal.innerHTML = `<p>${numero1 + numero2}</p>`
        }else if(signo == "-"){
            pantallaTotal.innerHTML = `<p>${numero1 - numero2}</p>`
        }else if(signo == "x"){
            console.log("---");
            pantallaTotal.innerHTML = `<p>${numero1 * numero2}</p>`
        }else if(signo == "/"){
            pantallaTotal.innerHTML = `<p>${numero1 / numero2}</p>`
        }
        restablecerOperacion("restablecer", 0)
    }
    
    

}

const desactivarOperacion = (valor) => {
    let listaBotones = document.querySelectorAll("button")
    listaBotones.forEach(boton => {
        if(valor == ""){
            boton.disabled = false
            reset.style.animationName = ""

        }else {
            boton.disabled = true
            if(boton.classList[0] == "reset"){
                boton.disabled = false
                console.log("----");
                reset.style.animationName = "palpitar"
            }
        }
        
    })
    
}


resultado.addEventListener("click", operaciones)