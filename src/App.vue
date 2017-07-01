<template>
  <div class="app">
    <lazy :time="1000">
      <router-view :location="location"></router-view>
    </lazy>
  </div>
</template>

<script type="text/ecmascript-6">
  import compass from 'components/compass/compass';
  import lazy from 'components/LazyLoader/LazyLoader';
  import { urlParse } from 'common/js/utils';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        // seller: {},
        location: []
      };
    },
    created() {
//      this.$http.get('/api/seller').then((response) => {
//        response = response.body;
//        if (response.errno === ERR_OK) {
//          this.seller = response.data;
//        }
//      });
//        this.$nextTick(() => {
//            // setTimeout(this.getLocation, 0);
//            this.getLocation();
//        });

    },
      mounted() {
          this.$nextTick(() => {
              this.getLocation();
          });
      },
      methods: {
        getLocation() {
            /**
             * 纬度：latitude => lat ,穿过赤道,斥道以北为北纬(0-90)，以南为南纬(0-90)
             * 经度：longitude => lng, 连接南极北极,0度穿过英国格林威治，东经(0-180),西经(0-180)
             */
            let lat = urlParse(window).lat;
            let lng = urlParse(window).lng;
            this.location = [lat, lng];
        }
      },
    components: {
      compass,
        lazy
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    display block
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background url("../static/img/bg2.png") repeat
    background-size cover
</style>
