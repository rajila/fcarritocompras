class Constants {
    INIT_DATA_LBL = "INIT_DATA"
    CATEGORIA_LIST_LBL = "CATEGORIA_LIST"
    CATEGORIA_LIST_DIM_LBL = "CATEGORIA_LIST_DIM"
}

const ConstantsInstance = new Constants()
Object.freeze(ConstantsInstance)

class LocalStorageCustom {
    getList(key){
        return localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : []
    }

    getDim(key){
        return localStorage.getItem(key) !== null ? parseInt(localStorage.getItem(key).trim()) : 1
    }

    getInit(key){
        return localStorage.getItem(key) !== null ? parseInt(localStorage.getItem(key).trim()) : 'N'
    }

    setData(key, data){
        localStorage.setItem(key, data)
    }
}

const LocalStorageCustomInstance = new LocalStorageCustom()
Object.freeze(LocalStorageCustomInstance)