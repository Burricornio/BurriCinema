import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

new Vue({ // Instanciamos la app
    el: '#app',
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
            template: `<div id="movie-filter">
                    <h2>Filter results</h2>
                    <div class="filter-group">
                        <check-filter v-for="(genre, index) in genres" :key="index" v-bind:title="genre"></check-filter>
                    </div>
                </div>`,
            data: function() {
                return {
                    genres
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
                    template: `<div v-bind:class="{'check-filter':true, active: checked}" v-on:click="checked = !checked">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                }
            }
        }
    }
})