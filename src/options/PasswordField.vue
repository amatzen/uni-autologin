<template>
    <div class="form-group" :class="{ 'form-error': (this.errs.length != 0), 'form-success': this.success }">
        <label class="form-label icon-link" for="password" id="passwordLabel">Adgangskode</label>
        <span class="form-error-message" id="form-error-message-form-error" role="alert" v-if="this.errs.length != 0">{{ this.errs[0] }}</span>
        <input 
            class="form-input"
            id="password"
            value=""
            name="password"
            autocomplete="off"
            aria-labelledby="passwordLabel"
            alt="Adgangskode"

            :disabled="!al_enabled"

            :type="hover ? 'text' : 'password'"
            :style="`background:${ hover ? 'rgb(255, 255, 174)' : '' };`"
            @mouseover="hover = true"
            @mouseleave="hover = false"

            v-model="data.password"
            @keyup="validateInput()"
        >
        <small style="display:block;">(Hold musen over feltet for at se koden)</small>
    </div>
</template>

<script>
import optionsService from './options.service';

export default {
    name: 'PasswordField',
    data() {
        return {
            hover: false,
            data: {
                password: ""
            },
            valid: {
                passwordAintUndefined: false,
                passwordLength: false
            },
            errs: [],
            success: false,
            al_enabled: false
        }
    },
    methods: {
        validateInput() {
            this.success = false;
            this.errs = [];
            this.validateLength();
            this.validateAintUndefined();
        },

        validateLength() {
            if( this.data.password.length < 8 ) {
                this.valid.passwordLength = false;
            } else {
                this.valid.passwordLength = true;
            }
        },

        validateAintUndefined() {
            if( this.data.password == undefined || this.data.password == "" ) {
                this.valid.passwordAintUndefined = false;
            } else {
                this.valid.passwordAintUndefined = true;
            }
        },

        async showErrors() {
            if(!this.valid.passwordLength) {
                this.errs.push(`Adgangskoden skal minimum være 8 tegn. Koden er lige nu ${this.data.password.length} tegn.`);
            }

            if(!this.valid.passwordAintUndefined) {
                this.errs.push(`Adgangskoden skal udfyldes.`);
            }

            return;
        },

        savePassword() {
            chrome.storage.sync.set({ ual_password: this.data.password });
        }
    },
    created() {
        optionsService.$on("trigger_validate_password", async _ => {
            this.success = false;
            this.errs = [];

            await this.showErrors();

            if( this.errs.length == 0 ) {
                this.success = true;
                optionsService.$emit('return_validate_password', true);
                setTimeout(() => {
                    this.success = false;
                }, 5000);
            } else {
                optionsService.$emit('return_validate_stop', true);
            }

            return {err: true};
        });

        optionsService.$on("trigger_save_details", _ => {
            this.savePassword();
        });

        optionsService.$on("trigger_al_enable", data => {
            this.al_enabled = data;
        });

        chrome.storage.sync.get(['ual_password'], d => { this.data.password = (d.ual_password) ? d.ual_password : ''; this.validateInput(); });
    }
}
</script>

<style lang="scss" scoped>
input[type=password]:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
}
</style>