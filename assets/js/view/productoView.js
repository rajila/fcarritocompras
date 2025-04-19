class ProductoView {
    init() {
        this.dibujarLista()
        this.loadCategorias()
    }

    dibujarLista() {
        let dataList = [ ...ProductoListInstance.getAll() ]
        console.log(dataList)
        let elTableBody = document.querySelector(".table-responsive > .table tbody")
        elTableBody.innerHTML = ''
        dataList.forEach(el => {
            let elTr = document.createElement("tr")
            let elId = document.createElement("td")
            let elCodigo = document.createElement("td")
            let elNombre = document.createElement("td")
            let elCategoria = document.createElement("td")
            let elPrecio = document.createElement("td")
            let elStock = document.createElement("td")
            let elImagen = document.createElement("td")
            let elBtns = document.createElement("td")
            elId.innerHTML = `${el.id}`
            elCodigo.innerHTML = `${el.codigo}`
            elNombre.innerHTML = `${el.nombre}`
            elCategoria.innerHTML = `${el.categoria}`
            elPrecio.innerHTML = `${el.precio}`
            elStock.innerHTML = `${el.stock}`
            elImagen.innerHTML = `<img className="size-32" src='${el.imagen}' />`
            elBtns.innerHTML = `
                <input data-bs-toggle="modal" data-bs-target="#modalForm" data-bs-whatever="@mdo" class='btn btn-primary' type='button' value='Editar' onclick="ProductoViewInstance.handleEditar('${el.id}')" />
                <input data-bs-toggle="modal" data-bs-target="#modalDelete" data-bs-whatever="@mdo" class='btn btn-danger' type='button' value='Eliminar' onclick="ProductoViewInstance.handleEliminar('${el.id}')" />`

            elTr.appendChild(elId)
            elTr.appendChild(elCodigo)
            elTr.appendChild(elNombre)
            elTr.appendChild(elCategoria)
            elTr.appendChild(elPrecio)
            elTr.appendChild(elStock)
            //elTr.appendChild(elImagen)
            elTr.appendChild(elBtns)
            elTableBody.appendChild(elTr)
        })
    }

    handleEditar(id) {
        document.getElementById("formTitle").innerHTML = 'Editar Producto'
        let data = ProductoListInstance.getById(id)
        if (data) {
            document.getElementById("idData").value = data.id
            document.getElementById("txtCodigo").value = data.codigo
            document.getElementById("txtNombre").value = data.nombre
            document.getElementById("txtImagenB64").value = data.imagen
            document.getElementById("txtPrecio").value = data.precio
            document.getElementById("txtStock").value = data.stock
            document.getElementById("txtDescripcion").value = data.descripcion
            document.getElementById("imagenB64").setAttribute("src", data.imagen)
            document.getElementById("imagenB64").classList.remove("hideElement")
            document.getElementById("imagenB64").classList.add("showElement")

            document.getElementById("txtCategoria").value = data.idCategoria
        }
    }

    handleEliminar(id) {
        let data = ProductoListInstance.getById(id)
        if (data) {
            document.getElementById("idDataDelete").value = data.id
            document.getElementById("data-delete-txt").innerHTML = data.nombre
        }
    }

    handleDelete() {
        let id = document.getElementById("idDataDelete").value
        if (!isNaN(parseInt(id))) {
            let modal = bootstrap.Modal.getInstance(document.getElementById('modalDelete'));
            ProductoListInstance.deleteById(parseInt(id))
            this.dibujarLista()
            modal.hide()
        }else {
            alert("error al eliminar categoria")
        }
    }

    handleNuevo() {
        this.resetForm()
        let _dim = LocalStorageCustomInstance.getDim(ConstantsInstance.PRODUCTO_LIST_DIM_LBL)
        document.getElementById("txtCodigo").value = `PROD-${_dim}`
        document.getElementById("formTitle").innerHTML = 'Nueva Producto'
    }

    async handleGuardar() {
        if (this.isValid()) {
            let modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
            let id = document.getElementById("idData").value
            let valueCodigo = document.getElementById("txtCodigo").value
            let valueNombre = document.getElementById("txtNombre").value
            let descripcion = document.getElementById("txtDescripcion").value
            let precio = document.getElementById("txtPrecio").value
            let stock = document.getElementById("txtStock").value
            let imagen = document.getElementById("txtImagen")
            let imgB64 = document.getElementById("txtImagenB64")
            let categoriaId = document.getElementById("txtCategoria").value

            let imagenB64 = ""
            try{
                imagenB64 = await UtilInstance.FileToUrlBase64(imagen.files[0])
                if (imagenB64.trim() === "") {
                    imagenB64 = imgB64.value
                }
            }catch(e) {
                imagenB64 = imgB64.value
            }

            id = isNaN(parseInt(id)) ? 0 : parseInt(id)

            let producto = new Producto(id, valueCodigo, valueNombre, imagenB64, descripcion, precio, stock, parseInt(categoriaId))

            if (id > 0) {
                ProductoListInstance.update(producto)
            }else {
                ProductoListInstance.add(producto)
            }

            this.dibujarLista()
            modal.hide()
            this.resetForm()
        }else {
            alert("error al guardar!!")
        }
    }

    resetForm() {
        document.getElementById("idData").value = 0
        document.getElementById("txtCodigo").value = ''
        document.getElementById("txtNombre").value = ''
        document.getElementById("txtPrecio").value = ''
        document.getElementById("txtStock").value = ''
        document.getElementById("txtImagenB64").value = ''
        document.getElementById("imagenB64").setAttribute("src","")
        document.getElementById("imagenB64").classList.add("hideElement")
        document.getElementById("imagenB64").classList.remove("showElement")
        document.getElementById("txtDescripcion").value = ''
        document.getElementById("txtImagen").value = ''
        document.getElementById("txtCategoria").value = '0'
        //this.loadCategorias()
    }

    loadCategorias(idCategoria=0) {
        let contentSelect = `<option value='0'>Seleccionar Categoria</option>`
        let listCategorias = [ ...CategoriaListInstance.getAll() ]
        listCategorias.forEach(el => {
            contentSelect += `<option value='${el.id}'>${el.nombre}</option>`
        })
        document.getElementById("txtCategoria").innerHTML = contentSelect
    }

    isValid() {
        let valueNombre = document.getElementById("txtNombre").value
        let result = true
        if (valueNombre.trim() === "") {
            result = false
        }
        return result
    }
}

const ProductoViewInstance = new ProductoView()
Object.freeze(ProductoViewInstance)