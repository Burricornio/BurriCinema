<template>
  <div id="day-select">
      <ul class="days">
          <li class="day" v-for="(day, index) in days" :key="index">{{ formatDay(day) }}</li>
      </ul>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                days: [0,1,2,3,4,5,6].map( num => this.$moment().add(num, 'days'))
            }
        },
        methods: {
            formatDay(raw) {
                if(raw.isSame(this.$moment(), 'day')) {
                    return 'Today';
                } else {
                    return raw.format('ddd DD/MM');
                }      
            }
        }
    }
</script>
