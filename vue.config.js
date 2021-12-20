module.exports = {
    runtimeCompiler: true,
    pages: {
        "index": {
            entry: "./src/pages/index_page/main.js",
            title: "Home",
            template: "./public/index.html"
        },
        "settings": {
            entry: "./src/pages/settings_page/main.js",
            title: "Settings",
            template: "./public/index.html"
        },
        "login": {
            entry: "./src/pages/login_page/main.js",
            title: "Login",
            template: "./public/index.html"
        },
        "register": {
            entry: "./src/pages/register_page/main.js",
            title: "Register",
            template: "./public/index.html"
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: false,
                secure: false
            }
        }
    }
}