<template>
    <div id="movie-list">
        <movie-item v-for="(movie, index) in filteredMovies" v-bind:key="index" v-bind:movie="movie.movie"></movie-item>
    </div>
</template>

<script>

    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';

    export default {
            components: {
                MovieItem
            },
            props: ['genre', 'time', 'movies'],
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

    }
</script>





