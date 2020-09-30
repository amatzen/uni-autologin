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
        }
    }
}
</script>