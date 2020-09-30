import Vue from 'vue'
import Vuex from 'vuex'

import VueApp from './App.vue'

console.log('=====================================');
console.log(`Auto Unilogin v${chrome.runtime.getManifest().version} indlæst`);
console.log('=====================================');

Vue.use(Vuex)

new Vue({
    render: createElement => createElement(VueApp) 
}).$mount("#app");