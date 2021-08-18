<template>
  <view>
    <view v-for="(item,index) in coupon" :key="index" class="boxcoupon">
    	<view class="flex Price">
    		<view>
    			<image src="../../static/usable_left.png" class="usable_left" v-if="!item.Expired"></image>
					<image src="../../static/disabled_left.png" class="usable_left"  v-if="item.Expired"></image>
    			<view class="bottomPrice fff1">
    				<view class="font20 font-w7">￥{{(item.value/100).toFixed(2)}}</view>
    				<view class="font16 mat30">买满{{item.bottomPrice/100}}可用</view>
    			</view>
    		</view>
    		<view class="marl30 padt25 position">
    			<view class="font16 marg-b40">{{item.couponDesc.nameDesc}}</view>
    			<view class="flex mat30 padt25">
    				<view class="nowrap font12 flex-ja">有效期至{{item.endTime}}</view>
    				<view class="goto" v-if="!coupon[0].Expired">去使用</view>
    			</view>
					<view class="Expired flex-ja" v-if="coupon[0].Expired">已过期</view>
    		</view>
    	</view>
    	<view class="marg-b30 w100 pal20 mat10 margin-r20 marg-b40 a0a0">{{item.couponDesc.scopeDesc}}</view>
    </view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			coupon:{
				type:Array,
				required:true
			}
		},
    data() {
      return {}
    },
    methods: {},
    mounted() {
		// console.log(this.coupon);
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
.usable_left {
		width: 280rpx;
		height: 240rpx;
		margin-left: 20rpx;
	}

	.Price {
		position: relative;
	}

	.bottomPrice {
		position: absolute;
		top: 60rpx;
		left: 60rpx;
	}
	.goto{
		padding: 10rpx 10rpx;
		background-color: #F6C45B;
		color: #FFFFFF;
		border-radius: 20rpx;
		margin-left: 10rpx;
	}
	.boxcoupon{
		margin-top: 20rpx;
	}
	.Expired{
		width: 90rpx;
		color: #FFFFFF;
		background-color: #A2A0A3;
		font-size: 12px;
		border-radius: 10rpx;
		position: absolute;
		top: -15rpx;
		right: 10rpx;
	}
	.position{
		position: relative;
	}
</style>
