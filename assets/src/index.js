
window._ = require('lodash')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.purify = o => JSON.parse(JSON.stringify(o))


import Vue from 'vue';
import VueAxios from 'vue-axios';
import vSelect from 'vue-select';
import VueTailwindPicker from 'vue-tailwind-picker'
import router from './route'
import store from './store/store';
import App from './App';

import './style.css';

Vue.use(VueAxios, axios);
Vue.use(VueTailwindPicker)
Vue.component('v-select', vSelect);

var app = new Vue({
    el: '#voice-talent',
    router,
    store,
    render: h => h(App)
})
