import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

// Importamos componentes
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({ // Instanciamos la app
    el: '#app',
    components: {
        MovieList, MovieFilter
    },
    data: {
        genre: [],
        time: []
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
    }

})