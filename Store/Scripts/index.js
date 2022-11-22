const pages = {
    home: "home.html",
    login: "login.html",
    favorites: "favorites.html",
    cart: "cart.html",
    notifications: "notifications.html"

}

let menuId;
const activeTab = "text-white bg-blue-700"
const activeMenu = "border-2 border-blue-500 text-blue-500 rounded-lg"

$(document).ready(() => {
    pageLoader()
    $("#home").click()
    $("#menu").click(() => {
        $("nav").removeClass("hidden")
        $(".menu-overlay").click(() => {
            $("nav").addClass("hidden")
        })

        // Menu behavior control
        $(".menu-items > div").each((index, menuItem) => {
            $(menuItem).click(() => {
                $(menuItem).attr("id")
                $(".menu-items > div").each((index, item) => {
                    if($(item).hasClass(activeMenu)){
                        $(item).removeClass(activeMenu)
                    }
                })
                $(menuItem).addClass(activeMenu)
                $("nav").addClass("hidden")
            })
        })
    })
})

function pageLoader(){
        $(".tab span:first-child").each((index, tab) => {
        let id = $(tab).attr("id")
        let tabIcon = $(tab)
        $(tab).click(() => {
            $(".tab span:first-child").each((index, tab) => {
                let tabIcon = $(tab)
                if(tabIcon.hasClass(activeTab)){
                    tabIcon.removeClass(activeTab)
                }
            })
            tabIcon.addClass(activeTab)
            $.get(`./pages/${pages[id]}`,
                (data) => {
                    // Page content loading stage
                    $(".main-display").html(data)

                    // Menu item appearance control
                    $(".menu-items > div").each((index, item) => {
                        if($(item).hasClass(activeMenu)){
                            $(item).removeClass(activeMenu)
                        }
                        $(item).click(() => {
                            menuId = $(item).attr("id") 
                            overlayRunner("item")
                        })
                    })

                    // Account switching
                    $(".logging > div").each((index, status) => {
                        let statusId = $(status).attr("id")
                        $(status).click(() => {
                            $.get(`./pages/login.html`,
                            (data) => {
                                if(statusId == "login"){
                                    overlayRunner("signIn")
                                    if($(".login-screen").hasClass("hidden")){

                                    } else {
                                        menuId = statusId
                                        let login_page = document.createElement("div")
                                        login_page.setAttribute("class", "login-screen")
                                        login_page.innerHTML = data
                                        $(".overlay-main").prepend(login_page)
                                    }

                                    // Create account
                                    $("#sign-up").click(() => {
                                        $(".login-form").addClass("hidden")
                                        $(".sign-up").toggleClass("hidden")
                                    })
                                    $(".overlay-header > span:first-child").click(() => {
                                        $(".login-screen").addClass("hidden")
                                    })
                                    
                                } else {
                                    console.log("logged out")
                                }
                                $("nav").addClass("hidden")
                            }
                        )
                        })
                    })

                    //Image display control 
                    $("img").click(() => {
                        overlayRunner("image")
                    })
                }
            )
        })
    })
}

function overlayRunner(mode){
    $(".overlay").removeClass("hidden")
    if(mode == "image"){
        $(".section-title").html("Nice Product")
        $(".this-item").removeClass("hidden")
        $(".overlay-header > span:first-child").click(() => {
            $(".section-title").html("")
            $(".this-item, .overlay").addClass("hidden")
        })
    } else {
        $(".section-title").html(menuId)
        $(".overlay-footer").addClass("hidden")
        $(".overlay-header > span:first-child").click(() => {
            $(".section-title").html("")
            $(".overlay").addClass("hidden")
            $(".overlay-footer").removeClass("hidden")
        })
    }
}