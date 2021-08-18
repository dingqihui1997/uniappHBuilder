<template>
	<!-- 特卖会 -->
	<view class="sale">
		<view class="flex salebox fff">
			<view v-for="(item,index) in sale.data.items" :key="index" class="flex1 flex-dji">
				<view class="font18 font-w7 mat10">{{item.item.title}}</view>
				<view class="subtitle">{{item.item.subtitle}}</view>
				<view><image :src="item.item.pic_url1" class="saleimg"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			sale: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {},
		mounted() {
			// console.log(this.sale);
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
	.sale {
		width: 100%;
		height: 330rpx;
		background-color: #DA4847;
		padding: 10rpx 20rpx;
	}
	
.saleimg{
	width: 150rpx;
	height: 200rpx;
}
	.salebox {
		width: 100%;
		// margin-left: 8rpx;
		// margin-right: 8rpx;
		border-radius: 10rpx;
	}
	.subtitle{
		color: #D1AB6F;
	}
</style>
