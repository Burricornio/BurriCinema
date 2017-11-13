<template>
<div id="movie-filter">
     <h2>Filter results</h2>
     <div class="filter-group">
         <!-- Estamos suscritos al evento check-filter del hijo y le asignamos un manejador -->
            <check-filter v-for="(genre, index) in genres" :key="index" v-bind:title="genre"
            v-on:check-filter="checkFilter"></check-filter>
    </div>
</div>
</template>

<script>
import genres from '../util/genres'; // Importamos el mock de generos
import CheckFilter from '../components/CheckFilter.vue';

    export default {

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
                'check-filter': CheckFilter
            }
    }
</script>
