<template>
    <div class="form-group">
        <label class="form-label icon-link" for="password" id="passwordLabel">Adgangskode</label>
        <input 
            class="form-input"
            id="password"
            value=""
            name="password"
            autocomplete="off"
            aria-labelledby="passwordLabel"
            alt="Adgangskode"

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
                passwordLength: false,
                passwordHasUppercase: false,
                passwordHasNumber: false
            },
            errs: []
        }
    },
    methods: {
        validateInput() {
            this.validateLength();
            this.validateAintUndefined();
        },

        validateLength() {
            if( this.data.password.length < 8 ) {
                this.valid.password = false;
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

        showErrors() {
            if(!this.valid.passwordLength) {
                this.errs.push(`Adgangskoden skal minimum være 8 tegn. Koden er lige nu ${this.data.password.length} tegn.`);
            }

            if(!this.valid.passwordAintUndefined) {
                this.errs.push(`Adgangskoden skal udfyldes.`);
            }

            if(!this.valid.passwordHasUppercase) {
                this.errs.push(`Adgangskoden skal minimum have ét stort bogstav.`);
            }

            if(!this.valid.passwordAintUndefined) {
                this.errs.push(`Adgangskoden skal minimum have ét tal.`);
            }
        }
    },
    created() {
        this.$on("trigger_validate_password", _ => {
            this.validateInput();
            this.showErrors();

            if( errs.length == 0 ) {
                return {err: false};
            }

            return {err: true};
        });
    }
}
</script>