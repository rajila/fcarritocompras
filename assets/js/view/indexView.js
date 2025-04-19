class IndexView {
    init() {
        this.loadCategorias()
        this.dibujarLista()
    }

    dibujarLista(eDataList = undefined) {
        let dataList = eDataList || [ ...ProductoListInstance.getAll() ]
        console.log(dataList)
        let elTableBody = document.getElementById("contenedor-productos")
        elTableBody.innerHTML = ''
        dataList.forEach(el => {
            this.dibujarTarjeta(el)
        })
    }

    dibujarTarjeta(dataProducto) {
        let elContenedorListado = document.getElementById("contenedor-productos")
        
        let elContenedor = document.createElement("div")
        elContenedor.classList.add("col-md-3", "col-sm-12", "mb-3")

        let elCard = document.createElement("div")
        elCard.setAttribute("id", `card-${dataProducto.id}`)
        elCard.classList.add("card")
        if ( dataProducto.stock === 0 ) elCard.classList.add("card-red")
        else elCard.classList.remove("card-red")

        let elTitle = document.createElement("div")
        elTitle.classList.add("text-center", "title-content")
        elCard.appendChild(elTitle)

        let elCardTitle = document.createElement("h5")
        elCardTitle.classList.add("card-title")
        elCardTitle.innerHTML = `${dataProducto.nombre}`
        elTitle.appendChild(elCardTitle)

        let elImg = document.createElement("div")
        elImg.classList.add("content-img")
        elCard.appendChild(elImg)

        let elPortada = document.createElement("img")
        elPortada.setAttribute("id", `img-${dataProducto.id}`)
        elPortada.setAttribute("src", dataProducto.imagen)
        elPortada.setAttribute("alt", dataProducto.nombre)
        elPortada.classList.add("card-img")
        if ( dataProducto.stock === 0 ) elPortada.classList.add("img-trans")
        else elPortada.classList.remove("img-trans")
        elImg.appendChild(elPortada)

        let elCardBody = document.createElement("div")
        elCardBody.classList.add("card-body")

        let elCardStock = document.createElement("p")
        elCardStock.classList.add("card-text")
        elCardStock.innerHTML = `<b>Stock: </b><span id="stock-${dataProducto.id}">${dataProducto.stock}</span>`
        elCardBody.appendChild(elCardStock)

        let elCardPrecio = document.createElement("p")
        elCardPrecio.classList.add("card-text")
        elCardPrecio.innerHTML = `<b>Precio: </b>${dataProducto.precio} €`
        elCardBody.appendChild(elCardPrecio)

        let elCardDescripcion = document.createElement("p")
        elCardDescripcion.classList.add("card-text", "text-j")
        elCardDescripcion.innerHTML = `${dataProducto.descripcion}`
        elCardBody.appendChild(elCardDescripcion)

        let elBotones= document.createElement("div")
        elBotones.classList.add("text-center")
        elCard.appendChild(elBotones)

        let elCardAddCart = document.createElement("button")
        elCardAddCart.setAttribute("href", "#")
        elCardAddCart.setAttribute("id", `btn-add-${dataProducto.id}`)
        elCardAddCart.classList.add("btn","btn-primary")
        elCardAddCart.addEventListener("click",(e) => IndexViewInstance.handleAddCart(dataProducto.id))
        elCardAddCart.innerHTML = `Añadir carrito`
        if ( dataProducto.stock === 0 ) elCardAddCart.disabled = true
        else elCardAddCart.disabled = false
        elBotones.appendChild(elCardAddCart)
        elCardBody.appendChild(elBotones)

        elCard.appendChild(elCardBody)
        elContenedor.appendChild(elCard)
        elContenedorListado.appendChild(elContenedor)
    }

    handleAddCart(id) {
        let producto = ProductoListInstance.getById(id)
        if (producto && producto.stock > 0) {
            let cart = new CartItem(producto, 1)
            CartListInstance.add(cart)
            producto.stock--
            ProductoListInstance.update(producto)
            document.getElementById(`stock-${producto.id}`).innerHTML = `${producto.stock}`
            if ( producto.stock === 0 ) {
                document.getElementById(`card-${producto.id}`).classList.add("card-red")
                document.getElementById(`btn-add-${producto.id}`).disabled = true
            } else {
                document.getElementById(`card-${producto.id}`).classList.remove("card-red")
                document.getElementById(`btn-add-${producto.id}`).disabled = false
            }
            // Dibujamos en panel de carrito
            CartViewInstance.dibujarLista()
        } else {
            alert(`El libro "${producto.nombre || 'XXX'}" no disponible!!`)
        }
    }

    handleCategoriaChange() {
        let valueCat = document.getElementById("categoria").value
        let dataList = [ ...ProductoListInstance.getAllByCategoria(parseInt(valueCat)) ]
        this.dibujarLista(dataList)
    }

    loadCategorias() {
        let contentSelect = `<option value='0'>Todas Categorias</option>`
        let listCategorias = [ ...CategoriaListInstance.getAll() ]
        listCategorias.forEach(el => {
            contentSelect += `<option value='${el.id}'>${el.nombre}</option>`
        })
        document.getElementById("categoria").innerHTML = contentSelect
    }
}

const IndexViewInstance = new IndexView()
Object.freeze(IndexViewInstance)