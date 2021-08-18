<template>
	<view class="topswiper">
		<u-swiper :list="list" height="350" class="swiper" img-mode="scaleToFill" @click="click"></u-swiper>
		<!-- #ifdef MP-WEIXIN -->
		<view class="WEIXIN"></view>
		<!-- #endif -->
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			Carousel: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				list: [],
			}
		},
		methods: {
			click(index) {
				let url = this.Carousel[index].item.jump_url
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
			// console.log(this.Carousel);
			this.Carousel.map(item => {
				this.list.push({
					image: item.item.pic_url
				})
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
	.topswiper {
		padding: 0 20rpx;
		/* #ifdef MP-WEIXIN */
		margin-top: 20rpx;
		/* #endif */
	}

	.swiper {
		width: 100%;
	}
</style>
