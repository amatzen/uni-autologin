<template>
    <div class="form-group">
        <label class="form-label icon-link" for="username" id="usernameLabel">Brugernavn</label>
        <input
            class="form-input"
            id="username"
            name="username"
            type="text"
            autocomplete="off"
            aria-labelledby="usernameLabel"
            alt="Brugernavn"

            v-model="data.username"
            @keyup="validateInput()"
        >

   </div>
</template>

<script>
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
            errs: []
        }
    },
    methods: {
        validateInput() {
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

        showErrors() {
            if(!this.valid.usernameLength) {
                this.errs.push(`Brugernavnet skal være 8 tegn. Brugernavnet er lige nu ${this.data.username.length} tegn.`);
            }

            if(!this.valid.usernameAintUndefined) {
                this.errs.push(`Brugernavnet skal udfyldes.`);
            }
        }
    },
    created() {
        this.$on("trigger_validate_username", _ => {
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