<template>
    <div v-bind:class="{'check-filter':true, active: checked}" v-on:click="checkFilter">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{ title }}</span>
    </div>
</template>

<script>
    export default {

                    data() {
                        return {
                            checked: false
                        }
                    },
                    props: [ 'title' ],
                    template: ``,
                    methods: {
                        checkFilter() {
                            this.checked = !this.checked;
                            // Publicamos un evento al que se subscribirá el padre. 
                            // De esta forma pasamos información componentes hijos a padres
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }

    }
</script>
