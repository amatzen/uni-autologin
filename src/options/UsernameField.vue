<template>
    <div class="form-group" :class="{ 'form-error': (this.errs.length != 0), 'form-success': this.success }">
        <label class="form-label icon-link" for="username" id="usernameLabel">Brugernavn</label>
        <span class="form-error-message" id="form-error-message-form-error" role="alert" v-if="this.errs.length != 0">{{ this.errs[0] }}</span>
        <input
            class="form-input"
            id="username"
            name="username"
            type="text"
            autocomplete="off"
            aria-labelledby="usernameLabel"
            alt="Brugernavn"

            :disabled="!al_enabled"

            v-model="data.username"
            @keyup="validateInput()"
        >
   </div>
</template>

<script>
import optionsService from './options.service';

export default {
    name: 'UsernameField',
    data() {
        return {
            data: {
                username: ""
            },
            valid: {
                usernameAintUndefined: false,
                usernameLength: false
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
            if( this.data.username.length != 8 ) {
                this.valid.usernameLength = false;
            } else {
                this.valid.usernameLength = true;
            }
        },

        validateAintUndefined() {
            if( this.data.username == undefined || this.data.username == "" ) {
                this.valid.usernameAintUndefined = false;
            } else {
                this.valid.usernameAintUndefined = true;
            }

        },

        async showErrors() {
            if(!this.valid.usernameAintUndefined) {
                this.errs.push(`Brugernavnet skal udfyldes.`);
            }

            if(!this.valid.usernameLength) {
                this.errs.push(`Brugernavnet skal være 8 tegn. Brugernavnet er lige nu ${this.data.username.length} tegn. (${this.data.username.length - 8})`);
            }
        },

        saveUsername() {
            chrome.storage.sync.set({ ual_username: this.data.username });
        }
    },
    created() {
        optionsService.$on("trigger_validate_username", async _ => {
            this.success = false;
            this.errs = [];

            await this.showErrors();

            if( this.errs.length == 0 ) {
                this.success = true;
                optionsService.$emit('return_validate_username', true);
                setTimeout(() => {
                    this.success = false;
                }, 5000);
            } else {
                optionsService.$emit('return_validate_stop', true);
            }

            return {err: true};
        });

        optionsService.$on("trigger_save_details", _ => {
            this.saveUsername();
        });

        optionsService.$on("trigger_al_enable", data => {
            this.al_enabled = data;
        });
        
        chrome.storage.sync.get(['ual_username'], d => { this.data.username = (d.ual_username) ? d.ual_username : ''; this.validateInput(); });

    }
}
</script>