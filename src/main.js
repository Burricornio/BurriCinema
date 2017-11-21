import Vue from 'vue'; // Importamos Vue
import './style.scss'; // Importamos Sass
import genres from './util/genres'; // Importamos el mock de generos

// Importamos la librería 'MomentJS'components
import moment from 'moment-timezone';
// Configuramos la time zone
moment.tz.setDefault("UTC");
// De esta manera hacemos la librería accesible desde cualquier componente
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment } });


//Importamos Vue resource para hacer peticiones HTTP
import VueResource from 'vue-resource';
// Instalamos el recurso - Se genera el objeto $http
Vue.use(VueResource);

// Importamos el modulo con las rutas
import routes from './util/routes';

//Importamos 'Vue-router' y lo instanciamos
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter ({ routes })

import { checkFilter, setDay } from './util/bus';

// CReamos un bus para comunicarnos entre componentes
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get(){ return this.$root.bus}})

new Vue({ // Instanciamos la app
    el: '#app',
    router,
    data: {
        genre: [],
        time: [],
        movies: [],
        // Compartimos la instancia de 'MomentJS'
        moment,
        day: moment(),
        // Compartimos el bus
        bus
    },
    created() {
        this.$http.get('/api')
                  .then( response => {
                      this.movies = response.data;
                  });
        // Nos suscribimos a los evento del bus
		this.$bus.$on('check-filter', checkFilter.bind(this))
		this.$bus.$on('set-day', setDay.bind(this))
    }

})

import { addClass, removeClass } from './util/helpers';

let mouseOutHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName('span')[0];
	removeClass(span, 'tooltip-show');
}

let mouseOverHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName('span')[0];
	addClass(span, 'tooltip-show');
	
}

Vue.directive('tooltip', {
	bind(el, bindings) {
		let span = document.createElement('span');
		let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
		span.appendChild(text);
		addClass(span, 'tooltip');
		el.appendChild(span);
		let div = el.getElementsByTagName('div')[0];
		div.addEventListener('mouseover', mouseOverHandler);
		div.addEventListener('mouseout', mouseOutHandler );
		div.addEventListener('touchstart', mouseOverHandler);
		div.addEventListener('touchend', mouseOutHandler );
	},
	unbind(el) {
		let div = el.getElementsByTagName('div')[0];
		div.removeEventListener('mouseover', mouseOverHandler);
		div.removeEventListener('mouseout', mouseOutHandler );
		div.removeEventListener('mouseover', mouseOverHandler);
		div.removeEventListener('mouseout', mouseOutHandler );
	}
})