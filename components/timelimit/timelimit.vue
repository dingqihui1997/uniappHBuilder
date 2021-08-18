<template>
	<!-- 限时购 -->
	<view class="boxtime">
		<view class="timebox">
			<view class="fff ffftime">
				<view class="timetop flex-sba pad-t10">
					<view><text class="font20 font-w7">限时购</text><text class="666 mal10">10点场</text>
					<text class="times">00</text>
					<text>:</text>
					<text class="times">00</text>
					<text>:</text>
					<text class="times">00</text>
					</view>
					<view>更多<image src="../../static/icon/arrow_right.png" class="timeimg"></image>
					</view>
				</view>
				<scroll-view style="width: 100%;" scroll-x="true">
					<view class="flex">
						<view class="timefor flex-dji" v-for="(item1,index) in timelimit.data.goods" :key="index" @click="goto(item1)">
							<view>
								<image :src="item1.item.imgs.img_square" class="timeimg1"></image>
							</view>
							<view class="custom">
								<text class="flash_price">{{'￥'+item1.item.flash_price/100}}</text><text class="666 text-li">{{'￥'+item1.item.market_price/100}}</text></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			timelimit: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			goto(item1){
				uni.navigateTo({
					url:`/pages/details/details?id=${item1.item.gid}`
				})
			}
		},
		mounted() {
			// console.log(this.timelimit);
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
	.timebox {
		width: 100%;
		height: 430rpx;
		background-color: #DA4847;
		padding: 10rpx 20rpx;
	}
	.ffftime{
		border-radius: 10rpx;
	}
	.timetop{
		height: 100rpx;
		padding-left:10rpx;
		padding-right: 10rpx;
	}
	.timeimg {
		width: 30rpx;
		height: 30rpx;
	}

	.timefor {
		width: 230rpx;
		height: 300rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 10rpx;
	}

	.timeimg1 {
		width: 200rpx;
		height: 200rpx;

	}
	.flash_price{
		color: #E0080B;
	}
	.times{
		background-color: #DA9934;
		color: #fff;
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding: 5rpx;
	}
</style>
