<template>
	<!-- 详情店铺 -->
  <view>
    <view class="flex-sb" @click="goto">
			<view class="flex-a">
				<view><image :src="brand.brandLogo" class="brandLogo"></image></view>
				<view class="marl25  mat10">
					<view class="font14 flex-a">{{brand.merchantName}}</view>
					<view class="a0a0 font12 flex-a">{{brand.brandSlogan}}</view>
				</view>
			</view>
			<view class="goto flex-a mar30"> 进入店铺 > </view>
		</view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			brand:{
				type:Object,
				required:true
			}
		},
    data() {
      return {}
    },
    methods: {
			goto(){
				let url=this.brand.jumpURL
				// #ifdef MP-WEIXIN
				    uni.setClipboardData({
				     data: url,
				     success: function() {}
				    });
				    // #endif
				    // #ifndef MP-WEIXIN
				    window.location.href = url
				    // #endif
			}
		},
    mounted() {
					// console.log(this.brand);
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
.goto{
	color: #D4A364;
}
.brandLogo{
	width: 120rpx;
	height: 120rpx;
	margin-left: 20rpx;
}
</style>
