class CategoriaView {
    init() {
        // Verificamos si hay login
        let isLogin = LocalStorageCustomInstance.getLogin(ConstantsInstance.LOGIN)
        if (isLogin==="N") window.location.href = "/"

        this.dibujarLista()
    }

    dibujarLista() {
        let dataList = [ ...CategoriaListInstance.getAll() ]
        let elTableBody = document.querySelector(".table-responsive > .table tbody")
        elTableBody.innerHTML = ''
        dataList.forEach(el => {
            let elTr = document.createElement("tr")
            let elId = document.createElement("td")
            let elNombre = document.createElement("td")
            let elNumProductos = document.createElement("td")
            let elBtns = document.createElement("td")

            let nroProd = ProductoListInstance.getAllByCategoria(el.id).length
            elBtns.classList.add("text-end")
            elId.innerHTML = `${el.id}`
            elNombre.innerHTML = `${el.nombre}`
            elNumProductos.innerHTML = `${el.nroproductos}`
            elBtns.innerHTML = `
                <input data-bs-toggle="modal" data-bs-target="#modalForm" data-bs-whatever="@mdo" class='btn btn-primary' type='button' value='Editar' onclick="CategoriaViewInstance.handleEditar('${el.id}')" />
                <input data-bs-toggle="modal" data-bs-target="#modalDelete" data-bs-whatever="@mdo" class='btn btn-danger ${nroProd===0?'':'hideElement'}' type='button' value='Eliminar' onclick="CategoriaViewInstance.handleEliminar('${el.id}')" />`
            
            elTr.appendChild(elId)
            elTr.appendChild(elNombre)
            elTr.appendChild(elNumProductos)
            elTr.appendChild(elBtns)
            elTableBody.appendChild(elTr)
        })
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
        this.resetForm()
        document.getElementById("formTitle").innerHTML = 'Nueva Categoria'
    }

    handleGuardar(){
        if (this.isValid()) {
            let modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
            let id = document.getElementById("idData").value
            let valueNombre = document.getElementById("txtNombre").value
            id = isNaN(parseInt(id)) ? 0 : parseInt(id)

            let categoria = new Categoria(id, valueNombre)
            
            if (id > 0) {
                CategoriaListInstance.update(categoria)
            }else {
                CategoriaListInstance.add(categoria)
            }

            this.dibujarLista()
            modal.hide()
            this.resetForm()
        } else {
            alert("Error, verifique todos los campos!!")
        }
    }

    resetForm() {
        document.getElementById("idData").value = 0
        document.getElementById("txtNombre").value = ''
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

const CategoriaViewInstance = new CategoriaView()
Object.freeze(CategoriaViewInstance)