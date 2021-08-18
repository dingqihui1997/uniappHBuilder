<template>
	<!-- 影音大牌 -->
	<view class="topvideo">
		<view class="videobig">
			<view class="video flex">
				<view class="flex1 videoimg" v-for="(item1,index) in video[0].items " :key="index" @click="click(item1,index)">
					<image :src="item1.item.pic_url" class="img100"></image>
				</view>
			</view>
		</view>
		<view class="videobig">
			<view class="video flex">
				<view class="flex1 videoimg" v-for="(item1,index) in video[1].items" :key="index" @click="click(item1,index)">
					<image :src="item1.item.pic_url" class="img100"></image>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		components: {},
		props: {
			video: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			click(item1){
				let url=item1.item.jump_url
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
			// console.log(this.video);
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
	.topvideo{
		padding-top: 30rpx;
		// margin-top: -10rpx;
		background-color: #DA4847;
	}
	.video {
		width: 95%;
		height: 290rpx;
		margin: 10rpx 20rpx;
	}

	.videoimg {
		height: 100%;
		width: 33%;
		margin-right: 10rpx;
	}
</style>
