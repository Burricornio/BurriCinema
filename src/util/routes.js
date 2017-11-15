import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
    { path: '/', component: Overview, name: 'home' },
    { path: '/movie/:id', component: Detail, name:'movie' },
    // Redirijimos a la home en todas las rutas no definidas
    { path: '*', redirect: { name: 'home'}}
]