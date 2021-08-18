<template>
	<!-- 狂欢 -->
	<view class="box1">
		<view class="carnival flex-w">
			<view class="carnival-one " v-for="(item1,index) in carnival" :key="index" @click="click(item1)">
				<view class="carnival1 flex-dji">
					<view class="image">
						<image :src="item1.item.pic_url" class="img100"></image>
					</view>
					<view> {{item1.item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			carnival: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			click(item1) {//点击跳转网页
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: item1.item.jump_url,
					success: function() {}
				});
				// #endif
				// #ifndef MP-WEIXIN
				window.location.href = item1.item.jump_url
				// #endif
			}
		},
		mounted() {
			// console.log(this.carnival);
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
	.box1 {
		margin-top: 20rpx;
	}

	.carnival {
		padding: 20rpx;
		width: 100%;
	}

	.image {
		width: 80rpx !important;
		height: 80rpx !important;
	}

	.carnival1 {
		height: 150rpx;
		width: 140rpx;
	}
</style>
