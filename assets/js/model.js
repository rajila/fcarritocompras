class Categoria {
    constructor(id, nombre){
        this.id = id
        this.nombre = nombre
    }
}

class Producto {
    constructor(){}
}

class CategoriaList {
    KEY_LIST = ConstantsInstance.CATEGORIA_LIST_LBL
    KEY_DIM = ConstantsInstance.CATEGORIA_LIST_DIM_LBL
    
    getAll() {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [ ...dataList ]
    }

    add(eData) {
        let data = CategoriaListInstance.getById(eData.id)
        if (data === null) {
            let _dim = LocalStorageCustomInstance.getDim(this.KEY_DIM)
            eData.id = _dim
            _dim++
            LocalStorageCustomInstance.setData(this.KEY_DIM, _dim)
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            dataList.push(eData)
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    update(eData) {
        let data = CategoriaListInstance.getById(eData.id)
        if (data !== null) {
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            let d = dataList.filter(el => el.id === eData.id)[0]
            d.nombre = eData.nombre
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    getById(eId){
        eId = isNaN(parseInt(eId)) ? null : parseInt(eId)
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [...dataList].filter(el => el.id === eId)[0] || null
    }

    deleteById(eId) {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        dataList = dataList.filter(el => el.id !== eId)
        LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
    }
}

const CategoriaListInstance = new CategoriaList()
Object.freeze(CategoriaListInstance)