import f1 from '../f1'
import isBroker from '../broker'

import Vue from 'vue'
import VueApp from './App.vue'

const targetElementSelector = body > div.container-fluid.page-container.outer > div > div > main > form > div.row;

if(isBroker() && f1.ifElementExists("div.logo") && ( f1.ifElementExists("#username") ||  f1.ifElementExists("[type='password']") && f1.ifElementExists(targetElementSelector) )) {
    const e = document.createElement("div");
    e.id = "al-app";
    document.querySelector(targetElementSelector).insertAdjacentElement("beforebegin", e);

    new Vue({
        render: createElement => createElement(VueApp) 
    }).$mount("#al-app");
}
