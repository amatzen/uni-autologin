import isBroker from './broker'
import './app.scss'

console.log('=====================================');
console.log(`Auto Unilogin v${chrome.runtime.getManifest().version} indlæst`);
console.log('=====================================');

if ( isBroker() ) {
    document.querySelector("body").classList.add("broker");
}

import './advertisement-autologin/index'
import './feature-autologin/index'