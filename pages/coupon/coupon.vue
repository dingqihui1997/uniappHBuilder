<template>
	<!-- 优惠券 -->
	<view>
		<u-navbar title="优惠券"></u-navbar>
		<view class="flex mat10">
			<view class="flex1 flex-di" v-for="(item,index) in list" :key='index' @click="click(item,index)">
				<view class="flex-ja" :class="{'activecolor':activeindex==index}">{{item.name}}</view>
				<view class="flex-ja active" :class="{'color':activeindex==index}"></view>
			</view>
		</view>
		<apply :coupon="coupon" v-if="coupon.length>0&&activeindex==0"></apply>
		<apply :coupon="coupon" v-if="coupon.length>0&&activeindex==1"></apply>
	</view>
</template>

<script>
	import apply from '../../components/apply/apply.vue'
	import dayjs from "dayjs"
	export default {
		components: {apply},
		props: {},
		data() {
			return {
				list: [{
					name: '未使用',
					type: 0
				}, {
					name: '不可用',
					type: 1
				}],
				activeindex: 0,
				type: 0,
				coupon: []
			}
		},
		methods: {
			click(item, index) {
				this.activeindex = index
				this.getCoupon()
			},
			getCoupon() {
				this.$api.getCoupon(this.list[this.activeindex].type).then(res => {
					this.coupon = res.data.couponInfos
					this.coupon.map(item=>{//未过期数据
						item.endTime=dayjs(item.endTime).format('YYYY.MM.DD/HH:mm')
						item.Expired=this.list[this.activeindex].type
					})
					// console.log(this.coupon);
				}).catch(err => {
					console.log('请求失败', err);
				})
			}
		},
		mounted() {
			this.getCoupon()
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
	.active {
		width: 50rpx;
		height: 10rpx;
		background-color: transparen;
		margin-top: 10rpx;
	}

	.color {
		background-color: #C6A36E;
	}

	.activecolor {
		color: #C6A36E;
	}

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
</style>
