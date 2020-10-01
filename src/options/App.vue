<template>
    <div>
        <div class="contentbox contentbox-shadow inner">
            <h2><span class="accent">Ind</span>stillinger</h2>
            <p class="small">
                Dette er indstillingerne for en uofficiel <a href="https://go.alexander.dk/unilogin-auto">Chrome-udvidelse</a>, og er altså <b>ikke</b> udbudt af eller på nogen måde associeret med Styrelsen for It og Læring.<br>
            </p>
            <div class="alert alert-success" id="success-save" v-if="success">
                <b>Success!</b>
                <br>
                Dine loginoplysninger blev gemt
            </div>
            <div class="form-group">
                <label for="activateAutoLogin" style="user-select:none;cursor:pointer;display:block;">
                    <input type="checkbox" name="activateAutoLogin" id="activateAutoLogin" @change="toggleAutoLogin();" v-model="al_enabled">
                    <span class="checkbox" v-bind:checked="al_enabled"></span>
                    <span style="margin-left:.75rem;vertical-align:middle;">Aktiver auto login</span>
                </label>
            </div>
            <Username></Username>
            <Password></Password>
            <div class="page-navigation">
                <button type="button" class="button button-primary" @click="saveLogin();">
                    Gem indstillinger
                </button>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="footertext">
                        <hr>
                        <p>
                            <strong>Mere om Autologin-udvidelsen</strong>
                            <br>
                            <ul>
                                <li>
                                    <a href="https://go.alexander.dk/unilogin-auto-privacy">Privatlivspolitik</a>
                                </li>
                                <li>
                                    <a href="https://go.alexander.dk/unilogin-auto">Afinstaller denne Chrome-udvidelse</a>
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p style="font-size: 8pt;">
                    <span>Version: {{ version }}</span>
                </p>
            </div>
        </div>
        <div class="developed-by">
            <a href="https://www.alexander.dk/" title="Udviklet af Alexander Matzen">
                <img src="https://cdn.alexander.dk/images/developed-by.svg" height="70px" alt="Udviklet af Alexander Matzen">
            </a>
        </div>
    </div>
</template>

<style lang="scss">
    @import url(https://broker.unilogin.dk/auth/resources/7.3.7.ga/login/unilogin/css/main.css);
    @import url(https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic);

    $accent: #0059b3;

    * {
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    body {
        background: $accent;
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .accent {
        color: $accent;
    }

    .small {
        margin-top: 0;
        font-size: 10pt;
    }

    h2 {
        margin-top: 0;
    }

    .contentbox {
        background: #fff;
        padding: 70px 80px 60px 80px;
    }

    ul {
        list-style-type: none;
        margin: 0;        

        li {
            padding: 0!important;
            margin: 0;
            
            &::before {
                content: "";
                display: none;
            }
        }
    }
    
    a:not(.button) {
        color: $accent;

        &:hover {
            color: darken($accent, 10%);
        }
    }

    .developed-by {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        transition: transform .4s;

        &:hover {
            transform: scale(1.08);
        }

        a,&:active,&:hover,&:focus,&:focus-within {
            border: 0;
            outline: 0;
        }
    }
</style>

<style lang="scss" scoped>
    label[for="activateAutoLogin"] {
        input[type="checkbox"] {
            display: none;
        }

        .checkbox {
            width: 1.5em;
            height: 1.5em;
            border-radius: 2px;
            border: 3px solid #5a5a5a;
            background: transparent;
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
            position: relative;

            &[checked="checked"] {
                border: 3px solid #0059b3;
                background: #0059b3;

                &::before {
                    content: " ";
                    display: block;
                    position: absolute;
                    background: #fff;
                    -webkit-mask-image: url(/assets/check.svg);
                    -webkit-mask-size: contain;
                    -webkit-mask-repeat: no-repeat;
                    mask-image: url(/assets/check.svg);
                    mask-size: contain;
                    mask-repeat: no-repeat;
                    width: 1.5em;
                    height: 1.5em;
                    top: -3px;
                    left: -3px;
                }
            }
        }
    }
</style>

<script>
import UsernameField from './UsernameField.vue'
import PasswordField from './PasswordField.vue'
import optionsService from './options.service'

export default {
    components: {
        Username: UsernameField,
        Password: PasswordField
    },
    data: () => {
        return {
            version: chrome.runtime.getManifest().version,
            al_enabled: false,
            success: false
        }
    },
    methods: {
        saveLogin() {
            let errs = false;

            // Trigger Validation of Username
            optionsService.$emit('trigger_validate_username');

            // If Return
            optionsService.$on('return_validate_username', _ => {
                // Trigger Validation of Username
                optionsService.$emit('trigger_validate_password');
            });

            optionsService.$on('return_validate_password', _ => {
                optionsService.$emit('trigger_save_details');
                this.success = true;
                setTimeout(() => {
                   this.success = false; 
                }, 5000);
            });


            optionsService.$on('return_validate_stop', _ => {
                return;
            });

        },

        toggleAutoLogin() {
            optionsService.$emit('trigger_al_enable', this.al_enabled);
            chrome.storage.sync.set({ ual_active: this.al_enabled });
        }
    },
    created() {
        chrome.storage.sync.get(['ual_active'], d => {
            this.al_enabled = d.ual_active
            optionsService.$emit('trigger_al_enable', this.al_enabled);
        });
    }
}
</script>