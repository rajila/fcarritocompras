class CartView {
    init() {
        this.dibujarLista()
    }

    dibujarLista(eDataList = undefined) {
        let dataList = eDataList || [ ...CartListInstance.getAll() ]
        console.log(dataList)
        let elDetailsCart = document.getElementById("details-cart")
        elDetailsCart.innerHTML = ''
        dataList.forEach(el => {
            this.dibujarTarjeta(el)
        })

        // Mostrar mensaje de cesta vacia
        if(dataList.length===0) {
            document.getElementById("siCesta").classList.remove("showElement")
            document.getElementById("siCesta").classList.add("hideElement")

            document.getElementById("noCesta").classList.add("showElement")
            document.getElementById("noCesta").classList.remove("hideElement")
        }else {
            let total = dataList.reduce((acum, actual) => acum + actual.total, 0)
            document.getElementById("total-cesta").innerHTML = `${total}`
            document.getElementById("siCesta").classList.add("showElement")
            document.getElementById("siCesta").classList.remove("hideElement")

            document.getElementById("noCesta").classList.remove("showElement")
            document.getElementById("noCesta").classList.add("hideElement")
        }
    }

    dibujarTarjeta(data) {
        let elContenedorListado = document.getElementById("details-cart")
        
        let elContenedor = document.createElement("section")
        elContenedor.classList.add("car-item","row", "d-flex")

        let elImg = document.createElement("div")
        elImg.classList.add("col-md-2", "col-sm-4", "col-3")
        
        let elPortada = document.createElement("img")
        elPortada.setAttribute("id", `img-${data.producto.id}`)
        elPortada.setAttribute("src", data.producto.imagen)
        elPortada.setAttribute("alt", data.producto.nombre)
        elPortada.classList.add("card-img-cart")
        elImg.appendChild(elPortada)
        elContenedor.appendChild(elImg)

        let elCardBody = document.createElement("div")
        elCardBody.classList.add("col-md-10", "col-sm-8", "col-9")

        let elCardTitle = document.createElement("h5")
        elCardTitle.classList.add("card-title")
        elCardTitle.innerHTML = `${data.producto.nombre}`
        elCardBody.appendChild(elCardTitle)

        let elCardCantidad = document.createElement("p")
        elCardCantidad.classList.add("card-text")
        elCardCantidad.innerHTML = `Cantidad: <span id="cant-cart-${data.producto.id}">${data.cantidad}</span>`
        elCardBody.appendChild(elCardCantidad)

        let elCardSubTotal = document.createElement("p")
        elCardSubTotal.classList.add("card-text", "text-end")
        elCardSubTotal.innerHTML = `<span id="total-cart-${data.producto.id}">${data.total}</span> €`
        elCardBody.appendChild(elCardSubTotal)

        let elBotones= document.createElement("div")
        elBotones.classList.add("text-end")
        

        let elCardAddCart = document.createElement("button")
        elCardAddCart.setAttribute("id", `btn-delete-${data.producto.id}`)
        elCardAddCart.classList.add("btn","btn-danger")
        elCardAddCart.addEventListener("click",(e) => CartViewInstance.handleDeleteCart(data.producto.id))
        elCardAddCart.innerHTML = `Eliminar`
        // if ( dataProducto.stock === 0 ) elCardAddCart.disabled = true
        // else elCardAddCart.disabled = false
        elBotones.appendChild(elCardAddCart)
        // elCardBody.appendChild(elBotones)
        elCardBody.appendChild(elBotones)


        elContenedor.appendChild(elCardBody)

        let elHr = document.createElement("hr")
        
        elContenedorListado.appendChild(elContenedor)
        elContenedorListado.appendChild(elHr)
    }

    handleDeleteCart(id) {
        let producto = ProductoListInstance.getById(id)
        if (producto) {
            CartListInstance.deleteByProductoId(id)
            producto = ProductoListInstance.getById(id)
            document.getElementById(`stock-${producto.id}`) && (document.getElementById(`stock-${producto.id}`).innerHTML = `${producto.stock}`)
            // Si se actualiza STOCK producto se activa boton y borde de card
            if ( producto.stock === 0 ) {
                document.getElementById(`card-${producto.id}`) && document.getElementById(`card-${producto.id}`).classList.add("card-red")
                document.getElementById(`btn-add-${producto.id}`) && (document.getElementById(`btn-add-${producto.id}`).disabled = true)
            } else {
                document.getElementById(`card-${producto.id}`) && document.getElementById(`card-${producto.id}`).classList.remove("card-red")
                document.getElementById(`btn-add-${producto.id}`) && (document.getElementById(`btn-add-${producto.id}`).disabled = false)
            }
            this.dibujarLista()
        } else {
            alert(`Error al eliminar producto de carrito`)
        }
    }

    handleLaodModalPagar() {
        let dataList = [ ...CartListInstance.getAll() ]
        let total = dataList.reduce((acum, actual) => acum + actual.total, 0)
        document.getElementById("data-pago").innerHTML=`${total}`
    }

    handlePagar() {
        CartListInstance.vaciarLista()
        window.location.href="/"
    }
}

const CartViewInstance = new CartView()
Object.freeze(CartViewInstance)