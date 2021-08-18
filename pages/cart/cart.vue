<template>
	<view>
		<u-navbar title="购物车" :background="background" class='navbar' :border-bottom='false' :is-fixed="true">
		</u-navbar>
		<view>
			<image src="../../static/top-bg.png" class="top-bg"></image>
		</view>
		<view class="weitao">
			<view class="flex-sb">
				<view>
					<u-checkbox v-model="checked" shape="circle" @change="all">全选</u-checkbox>
				</view>
				<view class="mar15 del" @click="del">删除</view>
			</view>
			<view v-for="(item,index) in list" :key='index' @click="goto(item)">
				<view class="flex-a">
					<view>
						<u-checkbox-group>
							<u-checkbox v-model="item.check" shape="circle" @change="one($event,item)"></u-checkbox>
						</u-checkbox-group>
					</view>
					<view>
						<image :src='item.info.img800s' class="infoimg"></image>
					</view>
					<view class="rightinfo">
						<view>{{item.info.shortName}}</view>
						<view class="Specifications mat30 a0a0 margin-b10 overflow">{{item.info.Specifications}}</view>
						<view class="flex-sba font-w7 priceMin">
							<view>￥{{item.info.priceMin/100}}</view>
							<view>
								<u-number-box v-model="item.info.num" @change="change"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-sba total">
			<view>
				<u-checkbox v-model="checked" shape="circle" @change="all">全选</u-checkbox>
			</view>
			<view class="flex-a">
				<view>合计:￥{{num}}.00</view>
				<view class="mal10 settlement" @click="settlement">结算</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<tuijian></tuijian>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	import tuijian from '../../components/tuijian/tuijian.vue'
	export default {
		components: {},
		props: {},
		data() {
			return {
				background: {
					backgroundColor: 'none'
				},
				list: [],
				checked: false, //全选
			}
		},
		methods: {
			all(e) { //全选
				this.list.map((item) => {
					item.check = e.value;
				});
			},
			one(e, item) { //单选
				item.check = e.value
				this.checked = this.list.every(item => {
					return item.check === true
				})
			},
			change() { //改变数量
				uni.setStorageSync('Cart', this.list)
			},
			del() { //删除商品
				this.list = this.list.filter(item => {
					return item.check !== true
				})
				uni.setStorageSync('Cart', this.list)
			},
			settlement() { //结算
				let arr1 = []
				let arr = this.list.filter(item => {
					return item.check === true
				})
				let obj = {
					list: arr,
					time: new Date, //当前时间
					sum: this.num //总金额
				}
				if (arr.length === 0) {
					this.$refs.uToast.show({
						title: "请选择商品"
					})
				} else {
					let a = uni.getStorageSync('order')
					if (a) {
						arr1 = a
						arr1.unshift(obj)
					} else {
						arr1.unshift(obj)
					}
					uni.setStorageSync('order', arr1)
					console.log(arr1);
				}
				this.list = this.list.filter(item => {
					return item.check !== true
				})
				uni.setStorageSync('Cart', this.list) //订单
				uni.navigateTo({
					url: `/pages/order/order`
				})
			},
			goto(item){
				console.log(item);
				uni.navigateTo({
					url:`/pages/details/details?id=${item.info.gid}`
				})
			}
		
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			let a = uni.getStorageSync('Cart')
			console.log(a);
			if (a) {
				this.list = a
				this.list.map(item => {
					this.$set(item, 'check', false)
				})
			}
		},
		filters: {},
		computed: {
			num() {
				let sum = 0
				this.list.map(item => {
					if (item.check === true) {
						sum += item.info.num * (item.info.priceMin / 100)
					}
				})
				return sum
			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top-bg {
		width: 100%;
		height: 350rpx;
		border-radius: 0 0 50rpx 50rpx;
		z-index: -1;
	}

	.navbar {
		position: fixed;
		top: 0;
		z-index: 99999;
	}

	.weitao {
		width: 90%;
		background-color: #FFFFFF !important;
		z-index: 99;
		margin: auto;
		position: relative;
		top: -150rpx;
		border-radius: 10rpx 10rpx 0 0;
		padding: 20rpx 10rpx;
	}

	.infoimg {
		width: 200rpx;
		height: 200rpx;
	}

	.rightinfo {
		width: 500rpx;
		height: 200rpx;
	}

	.index1name {
		width: 300rpx;
	}

	.priceMin {
		color: #AA262A;
	}

	.del {
		padding: 10rpx;
		background-color: #E2BA60;
		color: #FFFFFF;
		border-radius: 10rpx;
	}

	.settlement {
		padding: 20rpx 60rpx;
		background-color: #DA5037;
		color: #FFFFFF;
		border-radius: 40rpx;
	}

	.total {
		position: fixed;
		bottom: 100rpx;
		left: 0;
		right: 0;
		z-index: 99999999;
		background-color: #FFFFFF;
		width: 100%;
		padding: 10rpx 30rpx;
	}
	.Specifications{
		width: 300rpx;
	}
</style>
