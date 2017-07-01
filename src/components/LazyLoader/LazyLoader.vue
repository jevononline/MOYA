<template>
    <div v-if="show">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            time: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                show: false
            };
        },
        created () {
            window.setTimeout(() => {
                this.show = true;
            }, this.time);
        }
    };
</script>

