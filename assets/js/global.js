class Constants {
    INIT_DATA_LBL = "INIT_DATA"
    // Control de categoras
    CATEGORIA_LIST_LBL = "CATEGORIA_LIST"
    CATEGORIA_LIST_DIM_LBL = "CATEGORIA_LIST_DIM"
    // Control de productoss
    PRODUCTO_LIST_LBL = "PRODUCTO_LIST"
    PRODUCTO_LIST_DIM_LBL = "PRODUCTO_LIST_DIM"
    // Control de carrito
    CART_LIST_LBL = "CART_LIST"
    CART_LIST_DIM_LBL = "CART_LIST_DIM"

    // Login
    LOGIN = "LOGIN"
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

    getLogin(key){
        return localStorage.getItem(key) !== null ? localStorage.getItem(key).trim() : 'N'
    }
}

const LocalStorageCustomInstance = new LocalStorageCustom()
Object.freeze(LocalStorageCustomInstance)