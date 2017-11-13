import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

new Vue({ // Instanciamos la app
    el: '#app',
    methods: {
        checkFilter(category, title, checked ) {
            console.log(category, title, checked )
        }
    },
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                        <div class="movie" v-for="movie in movies">
                            {{ movie.title }}
                        </div>
                    </div>`,
            data: function() {
                return {
                    movies: [
                        { title: 'Pulp Fiction'},
                        { title: 'Home Alone'},
                        { title: 'Austin Powers'},
                    ]
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