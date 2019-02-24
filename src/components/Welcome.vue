<template>
    <div class="welcome q-px-md q-pb-lg" v-html="welcome"></div>
</template>

<script>
import welcomeMD from "./welcome.md"
export default {
    data () {
        return {
            welcome: welcomeMD
        }
    },
    mounted () {
        this.$prism.highlightAll();
        this.$renderABC();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}
</script>
