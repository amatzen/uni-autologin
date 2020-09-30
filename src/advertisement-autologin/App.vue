<template>
    <div class="al-adv">
        <hr>
        <div class="al-adv-container">
            <h3>
                <span class="accent">Auto</span>login</h3>
                <p class="small">Denne funktion er pålagt af en <a href="https://go.alexander.dk/unilogin-auto">Chrome-udvidelse</a>.</p>
            <a href="#" id="settingsLink" class="button button-primary">
                <svg style="vertical-align:middle;" viewBox="0 0 16 16" height="14px"><use fill="#fff" xlink:href="#pencil" /></svg>
                <span style="margin-left:.8rem;vertical-align:middle;">
                    Opsæt autologin
                </span>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $accent: #0059b3;

    .al-adv {
        margin-top: 1.5rem;

        h3 {
            margin-top: 1.75rem;
            margin-bottom: .25rem;
        }
    }

    .small {
        margin-top: 0;
        font-size: 10pt;
    }
    .accent {
        color: $accent;
    }
    a:not(.button) {
        color: $accent;

        &:hover {
            color: darken($accent, 10%);
        }
    }
</style>

<script>
export default {
    mounted: () => {
        document.querySelector("#settingsLink").setAttribute("href", chrome.runtime.getURL("options.html"));
    }
}
</script>