
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.purify = o => JSON.parse(JSON.stringify(o))


import Vue from 'vue';
import VueAxios from 'vue-axios';
import vSelect from 'vue-select';
import router from './route'
import store from './store/store';
import App from './App';

import './style.css';

Vue.use(VueAxios, axios);

Vue.component('v-select', vSelect);

var app = new Vue({
    el: '#voice-talent',
    router,
    store,
    render: h => h(App),
/*    mounted: function () {
        this.getAllTalents();
        this.dragDropImage();
    },
    methods: {
        getAllTalents() {
            axios.get("http://localhost:8000/wp-json/vtm/v1/voice-talents/0/10").then(
            function(response) {
                if (response.data.error) {
                    app.errorMsg = response.data.message;
                }
                else
                {
                    //console.log(response.data.talents);
                    app.talents = response.data.talents;
                }
            });
        },
        loadAvatar (event) {
            var image = document.getElementById('output_avatar');
            image.src = URL.createObjectURL(event.target.files[0]);
        },
        dragDropImage () {
            let dropArea = document.getElementById('drag-drop-area')

            dropArea.addEventListener('dragenter', handlerFunction, false)
            dropArea.addEventListener('dragleave', handlerFunction, false)
            dropArea.addEventListener('dragover', handlerFunction, false)
            dropArea.addEventListener('drop', handlerFunction, false)
        }
    }*/
})