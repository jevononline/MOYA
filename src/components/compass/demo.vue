<template>
  <div class="compass">
      <p class="font-color" style="font-size:.2rem">{{innerHTML}}</p>
      <button  class="font-color" style="font-size:.2rem" @click="getLocation">点击获取</button>
  </div>
</template>


<script type="text/ecmascript-6">

  export default {
    data() {
        return {
            innerHTML: "获取当前位置链接："
        };
    },
    created() {
    },
    mounted() {

    },
    computed: {
    },

    methods: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            } else {
                this.innerHTML = "Geolocation is not supported by this browser.";
            }
        },

        showPosition(position) {
            this.innerHTML = "https://520.wmeetu.cn/index.html?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .compass
        .font-color
          color: #fff
</style>
