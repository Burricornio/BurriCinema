<template>
     <div id="overview">
        <day-select></day-select>
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
    import DaySelect from './DaySelect.vue';

    export default {
        components: {
            MovieList, 
            MovieFilter,
            DaySelect
        },
        props: ['genre', 'time', 'movies', 'day']
    }
</script>
