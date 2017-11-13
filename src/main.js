import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass

new Vue({ // Instanciamos la app
    el: '#app',
    data: {
        msg: 'Hello Lemmy!'
    }
})