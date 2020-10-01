import Vue from 'vue'
import VueApp from './App.vue'

console.log('=====================================');
console.log(`Auto Unilogin v${chrome.runtime.getManifest().version} indlæst`);
console.log('=====================================');

new Vue({
    render: createElement => createElement(VueApp) 
}).$mount("#app");