import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

new Vue({ // Instanciamos la app
    el: '#app',
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
        },
        prueba() {
            console.log('Probando')
        }
    },
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                        <div class="movie" v-for="movie in filteredMovies">
                            {{ movie.title }}
                        </div>
                    </div>`,
            data: function() {
                return {
                    movies: [
                        { title: 'Pulp Fiction', genre: genres.CRIME },
                        { title: 'Home Alone', genre: genres.COMEDY} ,
                        { title: 'Austin Powers', genre: genres.COMEDY },
                    ]
                }
            },
            props: ['genre', 'time'],
            methods: {
                moviePassesGenreFilter(movie) {
                    if(!this.genre.length) {
                        return true;
                    } else {
                        return this.genre.find(genre => movie.genre === genre)
                    }    
                }
            },
            computed: {
                filteredMovies() {
                    return this.movies.filter(this.moviePassesGenreFilter)
                }
            }
        },
        'movie-filter': {
            // Estamos suscritos al evento check-filter del hijo y le asignamos un manejador
            template: `<div id="movie-filter">
                    <h2>Filter results</h2>
                    <div class="filter-group">
                        <check-filter v-for="(genre, index) in genres" :key="index" v-bind:title="genre"
                        v-on:check-filter="checkFilter"></check-filter>
                    </div>
                </div>`,
            data: function() {
                return {
                    genres
                }
            },
            methods: {
                checkFilter(category, title, checked ){
                    // Volvemos a emitir un evento para pasar datos al padre
                    this.$emit('check-filter', category, title, checked );
                }
            },
            components: {
                'check-filter': {
                    data() {
                        return {
                            checked: false
                        }
                    },
                    props: [ 'title' ],
                    template: `<div v-bind:class="{'check-filter':true, active: checked}" v-on:click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                    methods: {
                        checkFilter() {
                            this.checked = !this.checked;
                            // Publicamos un evento al que se subscribirá el padre. 
                            // De esta forma pasamos información componentes hijos a padres
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
})