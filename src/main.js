import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

// Importamos componentes
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

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

new Vue({ // Instanciamos la app
    el: '#app',
    components: {
        MovieList, MovieFilter
    },
    data: {
        genre: [],
        time: [],
        movies: [],
        // Compartimos la instancia de 'MomentJS'
        moment,
        day: moment()
    },
    methods: {
        checkFilter(category, title, checked ) {

            if(checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if(index > -1) {
                    this[category].splice(index, 1)
                }
            }
        }
    },
    created() {
        this.$http.get('/api')
                  .then( response => {
                      this.movies = response.data;
                  });
    }

})