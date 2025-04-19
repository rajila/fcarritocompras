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
        elCard.classList.add("card")

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
        elPortada.setAttribute("src", dataProducto.imagen)
        elPortada.setAttribute("alt", dataProducto.nombre)
        elPortada.classList.add("card-img")
        elImg.appendChild(elPortada)

        let elCardBody = document.createElement("div")
        elCardBody.classList.add("card-body")

        let elCardStock = document.createElement("p")
        //elCardStock.setAttribute(`id-stock-${dataProducto.id}`, `${dataProducto.stock}`)
        elCardStock.classList.add("card-text")
        elCardStock.innerHTML = `<b>Stock: </b><span id-stock-${dataProducto.id}=${dataProducto.stock} >${dataProducto.stock}</span>`
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

        let elCardAddCart = document.createElement("a")
        elCardAddCart.setAttribute("href", "#")
        elCardAddCart.classList.add("btn","btn-primary")
        elCardAddCart.innerHTML = `Añadir carrito`
        elBotones.appendChild(elCardAddCart)
        elCardBody.appendChild(elBotones)

        elCard.appendChild(elCardBody)
        elContenedor.appendChild(elCard)
        elContenedorListado.appendChild(elContenedor)
    }

    handleEditar(id) {
        document.getElementById("formTitle").innerHTML = 'Editar Categoria'
        let data = CategoriaListInstance.getById(id)
        if (data) {
            document.getElementById("idData").value = data.id
            document.getElementById("txtNombre").value = data.nombre
        }
    }

    handleEliminar(id) {
        let data = CategoriaListInstance.getById(id)
        if (data) {
            document.getElementById("idDataDelete").value = data.id
            document.getElementById("data-delete-txt").innerHTML = data.nombre
        }
    }

    handleDelete() {
        let id = document.getElementById("idDataDelete").value
        if (!isNaN(parseInt(id))) {
            let modal = bootstrap.Modal.getInstance(document.getElementById('modalDelete'));
            CategoriaListInstance.deleteById(parseInt(id))
            CategoriaViewInstance.dibujarLista()
            modal.hide()
        }else {
            alert("error al eliminar categoria")
        }
    }

    handleNuevo() {
        CategoriaViewInstance.resetForm()
        document.getElementById("formTitle").innerHTML = 'Nueva Categoria'
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