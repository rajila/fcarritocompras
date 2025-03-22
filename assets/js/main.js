class Main {
    init() {
        // Categorias
        let categoria1 = new Categoria(1, "Informatica")
        let categoria2 = new Categoria(2, "Farmacias")
        let categoria3 = new Categoria(3, "Matematicas")

        let initData = LocalStorageCustomInstance.getInit(ConstantsInstance.INIT_DATA_LBL)
        if(initData === 'N') {
            CategoriaListInstance.add(categoria1)
            CategoriaListInstance.add(categoria2)
            CategoriaListInstance.add(categoria3)

            LocalStorageCustomInstance.setData(ConstantsInstance.INIT_DATA_LBL, 'S')
        }
        
        // Productos
    }
}

const MainInstance = new Main()
Object.freeze(MainInstance)