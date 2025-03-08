class Menu {
    handleMenu() {
        const menu = document.querySelector(".menu")
        menu.classList.toggle("active")
    }

    handleCarrito() {
        alert("Carrito compras: en desarrollo")
    }

}

const MenuInstance = new Menu()
Object.freeze(MenuInstance)