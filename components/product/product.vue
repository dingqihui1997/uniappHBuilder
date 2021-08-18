<template>
	<!-- 产品详情 -->
	<view>
		<view class="flex wi100 mat20 margin-b10">
			<view class="flex1 flex-dji a0a0" style="height: 60rpx;" v-for="(item,index) in list" :key="index"
				@click="click(index)">
				<view :class="{'actvecolor':actveindex==index}" style="height:40rpx">{{item}}</view>
				<view class="product" :class="{'ground':actveindex==index}"></view>
			</view>
		</view>
		<view v-if="actveindex==0">
			<view v-for="(item,index) in product.imagesArray" :key="index" style="font-size: 0;">
				<image :src='item' class="wi100"></image>
			</view>
		</view>
		<view v-else>
			<view v-for="(item,index) in problem.imagesArray" :key="index" style="font-size: 0;">
				<image :src='item' class="wi100"></image>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			introExt: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				list: ['产品信息', '常见问题'],
				actveindex: 0,
				product: {},
				problem:{}
			}
		},
		methods: {
			click(index) {
				this.actveindex = index
			}
		},
		mounted() {
			this.product = this.introExt[0]
			this.problem=this.introExt[1]
			// console.log(this.problem);
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
	.product {
		width: 70rpx;
		height: 10rpx;
		border-radius: 10rpx;
		background-color: transparent;
		margin-top: 10rpx;
	}

	.actvecolor {
		color: #C59E6E !important;
	}

	.ground {
		background-color: #C59E6E;
	}
</style>
