<template>
<div id="movie-filter">
     <h2>Filter results</h2>
     <h3>By time of day</h3>
     <div class="filter-group">
         <!-- Estamos suscritos al evento check-filter del hijo y le asignamos un manejador -->
            <check-filter v-for="(time, index) in times" :key="index" 
            category="time" v-bind:title="time"
            v-on:check-filter="checkFilter"></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
         <!-- Estamos suscritos al evento check-filter del hijo y le asignamos un manejador -->
            <check-filter v-for="(genre, index) in genres" :key="index" 
            category="genre" v-bind:title="genre"
            v-on:check-filter="checkFilter"></check-filter>
    </div>
</div>
</template>

<script>
import genres from '../util/genres'; // Importamos el mock de generos
import times from '../util/times'; // Importamos los días
import CheckFilter from '../components/CheckFilter.vue';

    export default {

            data: function() {
                return {
                    genres,
                    times
                }
            },
            methods: {
                checkFilter(category, title, checked ){
                    // Volvemos a emitir un evento para pasar datos al padre
                    this.$emit('check-filter', category, title, checked );
                }
            },
            components: {
                'check-filter': CheckFilter
            }
    }
</script>
