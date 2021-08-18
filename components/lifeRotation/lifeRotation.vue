<template>
	<view>
		<view class="wi100" style="background-color:#FFC437 ;">
			<view class="lifeswiper">
				<u-swiper :list="list" :effect3d="true" mode="none" aspectFit="true" effect3d-previous-margin="0" height="300rpx"></u-swiper>
			</view>
		</view>
		<!-- 数码圈子 -->
		<view class="digital flex-ja" >
			<view v-for="(item,index) in digital" :key="index" class="flex1" v-if="digital.length>0">
				<view class="flex-ja"><image :src="item.picUrl" class="picUrlimg"></image></view>
				<view class="flex-ja">{{item.title}}</view>
			</view>
		</view>
	</view>
 
</template>

<script>
  export default {
    components: {},
    props: {
			Rotation:{
				type:Array,
				required:true
			},
			digital:{//数码圈子
				type:Array,
				required:true
			}
		},
    data() {
      return {
				list:[]
			}
    },
    methods: {},
    mounted() {
		this.Rotation.map(item=>{
			this.list.push(item.picUrl)
		})
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
.lifeswiper{
	width: 90%;
	position: relative;
	top: 20rpx;
	padding-top: 20rpx;
	margin-left: 50rpx;
	margin-right: 50rpx;
}
.picUrlimg{
	width: 80rpx;
	height: 80rpx;
}
.digital{
	margin-top: 30rpx;
	/* #ifdef MP-WEIXIN */
	height: 120rpx !important;
	/* #endif */
}
</style>
