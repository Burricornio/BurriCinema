import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

//Importamos el componente raiz
import Overview from './components/Overview.vue';

// Importamos la librería 'MomentJS'components
import moment from 'moment-timezone';
// Configuramos la time zone
moment.tz.setDefault("UTC");
// De esta manera hacemos la librería accesible desde cualquier componente
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment } });


//Importamos Vue resource para hacer peticiones HTTP
import VueResource from 'vue-resource';
// Instalamos el recurso - Se genera el objeto $http
Vue.use(VueResource);

// Importamos el modulo con las rutas
import routes from './util/routes';

//Importamos 'Vue-router' y lo instanciamos
import VueRouter from 'vue-router';
Vue.use(VueRouter);
new VueRouter ({ routes })

import { checkFilter } from './util/bus';

// CReamos un bus para comunicarnos entre componentes
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get(){ return this.$root.bus}})

new Vue({ // Instanciamos la app
    el: '#app',
    components: {
        Overview
    },
    routes,
    data: {
        genre: [],
        time: [],
        movies: [],
        // Compartimos la instancia de 'MomentJS'
        moment,
        day: moment(),
        // Compartimos el bus
        bus
    },
    created() {
        this.$http.get('/api')
                  .then( response => {
                      this.movies = response.data;
                  });
        // Nos suscribimos al evento del bus
        this.$bus.$on('check-filter', checkFilter.bind(this))
    }

})