import f1 from '../f1'
import isBroker from '../broker'

var delay_ok = false;
const time = new Date().getTime();

if ( isBroker() ) {
    chrome.storage.sync.get(
        [
            'ual_active',
            'ual_username',
            'ual_password'
        ],
        data => {

            if ( data.ual_active ) {

                if(f1.ifElementExists("#username")) {
                    chrome.storage.local.get(['ual_last_timestamp_username'],
                        (timedata) => {
                            
                            if ( (time - timedata.ual_last_timestamp_username) / 1000 < 2 ) {
                                delay_ok = false;
                            } else {
                                delay_ok = true;
                            }
                
                            if ( !delay_ok ) {
                                chrome.storage.sync.set({'ual_active': false }, function() {});
                                alert("Grundet en fejl ved login er autologin blevet slået fra. Tjek om dit brugernavn er korrekt.");
                
                            }
                
                            chrome.storage.local.set({'ual_last_timestamp_username': time});
                            
                            if ( delay_ok ) {
                                document.querySelector("#username").value = data['ual_username'];
                                setTimeout(() => {
                                    document.querySelector('button[type="submit"]').click();
                                }, 100);
                            }
                        }
                    )

                }

                if(f1.ifElementExists("[type='password']")) {
                    chrome.storage.local.get(['ual_last_timestamp_password'],
                        (timedata) => {
                            
                            if ( (time - timedata.ual_last_timestamp_password) / 1000 < 2 ) {
                                delay_ok = false;
                            } else {
                                delay_ok = true;
                            }
                
                            if ( !delay_ok ) {
                                chrome.storage.sync.set({'ual_active': false }, function() {});
                                alert("Grundet en fejl ved login er autologin blevet slået fra. Tjek om dit brugernavn er korrekt.");
                
                            }
                
                            chrome.storage.local.set({'ual_last_timestamp_password': time});
                            
                            if ( delay_ok ) {
                                document.querySelector("[type='password']").value = data['ual_password'];
                                setTimeout(() => {
                                    document.querySelector('button[type="submit"]').click();
                                }, 100);
                            }
                        }
                    )

                }
            }
        }
    )
}
