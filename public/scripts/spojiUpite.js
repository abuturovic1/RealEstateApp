const isLogin = (error, data) => {
    if(data === "false") {
        const div = document.getElementById('novi-upiti');
        div.style.display = 'none';
    }
}

PoziviAjax.getLoggedIn(isLogin);
