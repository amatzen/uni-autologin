import f1 from '../f1'
import isBroker from '../broker'

import Vue from 'vue'
import VueApp from './App.vue'

if(isBroker() && f1.ifElementExists("div.logo") && ( f1.ifElementExists("#username") ||  f1.ifElementExists("[type='password']") && f1.ifElementExists("body > main > div > div > form > div.row") )) {
    var e = document.createElement("div");
    e.id = "al-app";
    document.querySelector("body > div.container-fluid.page-container.outer > div > div > main > form > div.row").insertAdjacentElement("beforebegin", e);

    new Vue({
        render: createElement => createElement(VueApp) 
    }).$mount("#al-app");
}
