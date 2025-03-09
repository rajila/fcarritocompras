class Menu {
    handleMenu() {
        const menu = document.querySelector(".menu")
        menu.classList.toggle("active")
    }

    handleOpenCarrito() {
        //document.getElementById("contentCarrito").classList.add("mostrar")
        document.getElementById("contentCarrito").classList.toggle("mostrar")
        const menu = document.querySelector(".menu")
        if (menu.classList.contains("active")){
            menu.classList.toggle("active")
        }
        // const cListado = document.querySelector(".c-listado")
        // cListado.classList.remove("col")
        // cListado.classList.add("col-8")
    }

    handleClosedCarrito() {
        document.getElementById("contentCarrito").classList.remove("mostrar")
        //document.querySelector(".c-listado").classList.remove("col-8").add("col")
    }

}

const MenuInstance = new Menu()
Object.freeze(MenuInstance)