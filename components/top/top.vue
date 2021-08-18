<template>
  <view>
    <template>
   
      <view>
        <view class="box flex-ja">
          <view class="left"><slot name="left"></slot></view>
          <view class="center"><slot name="center"></slot></view>
          <view class="right"><slot name="right"></slot></view>
        </view>
      </view>
    </template>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    onLoad() {

    },
    onShow() {

    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 88rpx;
  position: relative;
  top: 0;
}
.left {
  position: absolute;
  left: 10px;
}

.right {
  position: absolute;
  right: 10px;
}

</style>
