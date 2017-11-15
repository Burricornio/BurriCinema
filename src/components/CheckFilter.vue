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
                    props: [ 'title', 'category' ],
                    template: ``,
                    methods: {
                        checkFilter() {
                            this.checked = !this.checked;
                            // Publicamos un evento al que se subscribirá el padre. 
                            // De esta forma pasamos información por un bus
                            this.$bus.$emit('check-filter', this.category , this.title, this.checked);
                        }
                    }

    }
</script>
