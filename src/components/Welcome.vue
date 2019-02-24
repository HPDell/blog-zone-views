<template>
    <q-scroll-area class="fit">
        <div class="welcome q-px-md" v-html="welcome"></div>
    </q-scroll-area>
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
