<template>
  <div class="compass">
    <transition name="fade">
      <section class="compass-wrap" v-if="show">
        <div class="compass">
          <div style="font-size:.3rem">{{latitude}}</div>
          <div style="font-size:.3rem">{{longitude}}</div>
          <div style="font-size:.3rem">{{alpha}}</div>
          <div style="font-size:.3rem">{{direction}}</div>
          <div style="font-size:.3rem">{{heading}}</div>
          <i class="compass__pointer" :style="degree"></i>
        </div>
        <span class="direction__text">向{{ heading | formateDirection}}方{{ distances | formateMile}}</span>
      </section>
    </transition>
    <transition name="fade">
      <div class="open-wrapper" v-if="showopen">
        <section class="chest-wrap">
          <div class="chest">
            <span class="chest__open" @click="open">开启</span>
            <transition>
              <div class="chest__upper">
                <img src="static/img/beans_up.png" alt="">
              </div>
            </transition>
            <transition>
              <div class="chest__lower">
                <img src="static/img/beans_down.png" alt="">
              </div>
            </transition>
            <div class="chest__result">
              <img src="static/img/final2.png" alt="">
            </div>
          </div>
        </section>
      </div>
    </transition>
    <transition name="move">
      <section class="result-wrap" v-if="showresult">
        <div class="result-show">
          <img src="static/img/final2.png">
        </div>
      </section>
    </transition>
    <transition name="move">
      <footer class="footer-clue" v-if="showfooter">
        <div class="clue">
          <img class="clue__img" src="static/img/clue.png" alt="线索">
          <div class="clue__text">
            <p>这是谁的衣物？</p>
            <p>找到完整图案即有大奖</p>
          </div>
        </div>
        <p class="copyright">
          Powered by MOYA Studio | Starbucks <i class="starbucks-logo"></i>
        </p>
      </footer>
    </transition>
    <transition name="move">
      <footer class="footer-clue footer-result" v-if="showresult">
        <div class="congratulation">
          <p>凭此页面买任意饮品邀您品尝新品 <span>嘛哩嘛哩轰</span></p>
          <p>活动有效期截止2017年1月25日</p>
        </div>
        <p class="copyright">
          Powered by MOYA Studio | Starbucks <i class="starbucks-logo"></i>
        </p>
      </footer>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formateMile, formateDirection} from 'common/js/utils';
  import {getBearing, getCompassDirection, getDistance} from 'Geolib';

  export default {
    props: {
//      seller: {
//        type: Object
//      },
        location: {
            type: Array
        },
        initData: {
            type: Object
        }
    },
    data() {
      return {
        latitude: 0,
        longitude: 0,
        distance: 100,
        alpha: 0,
        currentToTargetAndPhoneAlpha: 0, //当前位置与目标位置直线与手机头部直线夹角
        beta: 0,
        gamma: 0,
        heading: 0,
        direction: 'N',
        accuracy: 0,
        show: true,
        showopen: false,
        showfooter: true,
        showresult: false
      };
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this._initCompass();
            this._initDeviceOrientationEvent();
        });
    },
    computed: {
      degree() {
        return 'WebkitTransform: rotate(' + this.heading + 'deg)';
      },
      distances() {
        return this.distance;
      }
    },
    filters: {
      formateMile(meter) {
        return formateMile(meter);
      },
      formateDirection(heading) {
        return formateDirection(heading);
      }
    },
    methods: {
      _initCompass() {
           console.log(this.location);
          if (navigator.geolocation) {
              let watchId = navigator.geolocation.watchPosition((position) => {
                  if (position) {
                      this.latitude = position.coords.latitude;// 纬度
                      this.longitude = position.coords.longitude; // 经度

                      let resultBearing = getCompassDirection(
                          {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                          },{
                              latitude: this.location[0],
                              longitude: this.location[1]
                          });

                      this.direction = resultBearing.exact;
                      this.heading = resultBearing.bearing;

                      console.log(resultBearing);
                      console.log(this.direction);
                      console.log(this.heading);

                      this.distance = getDistance(
                          {
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude
                          },{
                              latitude: this.location[0],
                              longitude: this.location[1]
                          });

                      if(this.distance < 20){
                          this.show = false;
                          this.showopen = true;
                          this.showfooter = false;
                          navigator.geolocation.clearWatch(watchId);
                      }
                  }
              },(err) => {
                  console.log(err);
              },{
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0
              });
          }
      },
      _initDeviceOrientationEvent() {
        if (window.DeviceOrientationEvent) {
          window.addEventListener('deviceorientation', this._handleOrientation, true);
        }
      },
      _handleOrientation(orientData) {
        //this.alpha = orientData.alpha;
        this.currentToTargetAndPhoneAlpha = orientData.alpha;
        // 指北针方向
        //this.heading = orientData.webkitCompassHeading;
        //this.heading = orientData.alpha;

      },
      open() {
        this.showopen = false;
        this.showresult = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .compass
    .compass-wrap
      display block
      width 100%
      height 4.1728rem
      overflow hidden
      position relative
      opacity 1
      &.fade-enter-active, &.fade-leave-active
        transition all 0.8s
      &.fade-enter, &.fade-leave-active
        opacity 0
      .compass
        display block
        width 2.0821rem
        height 2.5rem
        margin 0 auto
        background url('compass2.png') no-repeat top center, url('compass_shadow.png') no-repeat .085333rem .512rem
        background-size 2.0821rem 1.7408rem
        position absolute
        top .768rem
        left 50%
        margin-left -.85333rem
        .compass__pointer
          display block
          width .324267rem
          height 1.664rem
          background url('needle.png') no-repeat center center
          background-size .324267rem 1.664rem
          position absolute
          top -.512rem
          left 50%
          margin-left -.3rem
          transform-origin 50% 80%
      .direction__text
        display block
        margin .08533rem auto
        width 2.69227rem
        height 1.02827rem
        line-height 1.02827rem
        background url('beans.png') no-repeat center center
        background-size 2.69227rem 1.02827rem
        font-size .256rem
        text-align center
        color #e5bc79
        font-weight 600
        position absolute
        left 0
        right 0
        bottom 0
    .footer-clue
      display block
      width 100%
      height .98133rem
      overflow hidden
      color #fff
      background rgba(9, 113, 105, .6)
      position fixed
      bottom 0
      left 0
      right 0
      z-index 8
      transform translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s linear
      &.move-enter, &.move-leave-active
        transform translate3d(0, 100%, 0)
      .clue
        width 100%
        height .78507rem
        overflow hidden
        .clue__img
          width 1.01973rem
          float left
        .clue__text
          display block
          float left
          padding .1792rem 0
          p
            margin: 0
            &:first-child
              font-size .19627rem
              text-align left
            &:last-child
              font-size .128rem
              text-align left
      .congratulation
        height .72rem
        padding .1366rem .18773rem
        box-sizing border-box
        p:first-child
          display block
          width auto
          height auto
          font-size .128rem
          margin-bottom .08533rem
          span
            display inline-block
            margin 0 0 0 .05973rem
            font-size .1536rem
        p:last-child
          font-size .1024rem
      .copyright
        display block
        width 100%
        height .19627rem
        line-height .19627rem
        margin 0
        padding 0 .290133rem
        font-size .0768rem
        text-align right
        box-sizing border-box
        position relative
        .starbucks-logo
          display inline-block
          width .1792rem
          height .1792rem
          background url('starbucks_logo.png') no-repeat center center
          background-size .1792rem .1792rem
          position absolute
          right .06rem
          bottom .06rem
    .open-wrapper
      position fixed
      top 0
      left 0
      bottom 0
      z-index 30
      width 100%
      height 100%
      background transparent
      opacity 1
      &.fade-enter-active, &.fade-leave-active
        transition all 0.6s
      &.fade-enter, &.fade-leave-active
        opacity 0
      .chest-wrap
        display block
        width 100%
        height 100%
        .chest
          display block
          width 100%
          height 100%
          position relative
          .chest__upper
            display block
            width 100%
            height 50%
            position absolute
            top 0
            left 0
            right 0
            z-index 2
            img
              margin 0 auto
              z-index 8
              left 50%
              display: block
              width 2.15467rem
              height 1.43787rem
              position absolute
              bottom -.08533rem
              margin-left -1.077335rem
          .chest__open
            display block
            width 1.3653rem
            height .512rem
            line-height .512rem
            background rgba(9, 113, 105, .6)
            border .008533rem solid rgba(255, 255, 255, .6)
            border-radius .0256rem
            font-size .256rem
            color #fff
            font-weight 600
            text-align center
            position absolute
            top 50%
            left 50%
            margin-top -.256rem
            margin-left -.68265rem
            z-index 9
          .chest__lower
            display block
            width 100%
            height 50%
            position absolute
            bottom 0
            left 0
            right 0
            z-index 2
            img
              margin 0 auto
              z-index 8
              left 50%
              display block
              width 2.1888rem
              height 1.51893rem
              position absolute
              top -.08533rem
              margin-left -1.0944rem
          .chest__result
            display block
            width 100%
            height 100%
            z-index 1
            img
              display block
              width 1.48053rem
              height 1.8816rem
              position absolute
              top 50%
              left 50%
              margin-top -.9408rem
              margin-left -.740265rem
    .result-wrap
      display block
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 10
      transform translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s linear
      &.move-enter, &.move-leave-active
        transform translate3d(0, -100%, 0)
      .result-show
        display block
        width 100%
        height 100%
        overflow hidden
        position relative
        img
          display block
          width 2.820267rem
          height 3.5712rem
          position absolute
          top 50%
          left 50%
          margin-top -1.7856rem
          margin-left -1.41rem
</style>
