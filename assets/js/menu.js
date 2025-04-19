class Menu {
    init() {
        let isLogin = LocalStorageCustomInstance.getLogin(ConstantsInstance.LOGIN)
        if (isLogin === 'N' ) {
            document.querySelectorAll(".menu-admin").forEach(el => {
                el.classList.add("hideElement")
                el.classList.remove("showElement")
            })
            document.getElementById("btn-login").classList.add("showElement")
            document.getElementById("btn-login").classList.remove("hideElement")

            document.getElementById("btn-logout").classList.remove("showElement")
            document.getElementById("btn-logout").classList.add("hideElement")
        } else {
            document.querySelectorAll(".menu-admin").forEach(el => {
                el.classList.remove("hideElement")
                el.classList.add("showElement")
            })
            document.getElementById("btn-login").classList.remove("showElement")
            document.getElementById("btn-login").classList.add("hideElement")

            document.getElementById("btn-logout").classList.add("showElement")
            document.getElementById("btn-logout").classList.remove("hideElement")
        }
    }

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
    }

    handleClosedCarrito() {
        document.getElementById("contentCarrito").classList.remove("mostrar")
    }

    login() {
        let modal = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
        let user = document.getElementById("user").value
        let password = document.getElementById("password").value
        if (`${user}`.toLowerCase() ==="admin" && `${password}` === "12345") {
            LocalStorageCustomInstance.setData(ConstantsInstance.LOGIN, 'S')
            this.init()
            modal.hide()
            document.getElementById("user").value=''
            document.getElementById("password").value=''
        } else {
            alert("Datos incorrectos!!")
        }
    }

    logout() {
        LocalStorageCustomInstance.setData(ConstantsInstance.LOGIN, 'N')
        this.init()
        window.location.href="/"
    }
}

const MenuInstance = new Menu()
Object.freeze(MenuInstance)