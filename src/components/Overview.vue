<template>
     <div id="overview">
        <div id="main">
            <!-- Nos suscribimos a un evento emitido por un hijo-->
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies"
            v-bind:day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>
<script>
    // Importamos componentes
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';

    export default {
        components: {
            MovieList, MovieFilter
        },
        props: ['genre', 'time', 'movies', 'day']
    }
</script>
