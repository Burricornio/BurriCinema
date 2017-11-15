<template>
    <div id="detal" v-if="movie">
        <movie-item v-bind:movie="movie.movie" v-bind:sessions="[]"></movie-item>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue';

    export default {
        props: [ 'movies' ],
        computed: {
            movie() {
                let movie =  this.movies.find( movie => movie.id === this.$route.params.id);
                return movie ? movie : null;
            
            }
        },
        created() {
            console.log(this.$route.params.id);
        },
        components: {
            MovieItem
        }
    }
</script>