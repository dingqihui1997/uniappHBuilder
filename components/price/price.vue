<template>
	<!-- 详情的收藏价格 -->
	<view>
		<view class="flex-sba pricebox">
			<view class="flex-a">
				<view class="font18 goodsInfoMin">{{'￥'+goodsInfo.priceMin/100}}</view>
				<view class="font14 text-li marl30">{{'￥'+ goodsInfo.marketPrice/100}}</view>
			</view>
			<view>
				<view v-if="flag">
					<image src="../../static/icon/product_favor.png" class="unfavor" @click="Collection"></image>
				</view>
				<view v-else>
					<image src="../../static/icon/product_unfavor.png" class="unfavor" @click="Collection"></image>
				</view>
			</view>
		</view>
		<view class="marl30">
			<view class="font16 margin-b20 font-w7">{{goodsInfo.shortName}}</view>
			<view class="font14 a0a0 margin-b20">{{goodsInfo.summary}}</view>
			<view class="font14 pal20 business">{{goodsInfo.businessName}}</view>
		</view>
		<view class="flex-sba" @click="Popup(3)" style="height: 70rpx;">
			<view class="marl30 mat30 a0a0 flex-ja">{{name?'已选'+name+" 数量x"+value:'请选择商品'}}</view>
			<view class="flex-ja">
				<image src="../../static/icon/arrow_right.png" mode="" class="arrow_right"></image>
			</view>
		</view>
		<!-- 选择商品规格 -->
		<u-popup v-model="showPopup" mode="bottom" border-radius="14" height="1000" :closeable="true" @close="close">
			<view class="marl30" style="height: 1000rpx;">
				<view class="flex">
					<view class="mat10">
						<image :src="goodsInfo.img800s" class="img800s"></image>
					</view>
					<view class="marl30 flex-dj padt25">
						<view>{{'￥'+goodsInfo.priceMin/100}}</view>
						<view>已选：{{name?name+" 数量x"+value:''}}</view>
					</view>
				</view>
				<view v-if="shopTags.length>0">
					<view v-for="(item,index) in shopTags" :key="index">
						<view class="a0a0 margin-b20 font16">{{item.name}}</view>
						<view class="flex-w">
							<view v-for="(item1,index1) in item.tags" :key="index1" class="tags"
								@click="click(item1,index,index1)" :class="{'red':check(index,index1)}">{{item1.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex-sb u-number">
					<view>数量</view>
					<view>
						<u-number-box v-model="value" @change="valChange" :min="1"></u-number-box>
					</view>
				</view>
				<view style="height:90rpx;"></view>
				<view class="fff wi100 deder">
					<view class="determine flex-ja" @click="determine">确定</view>
				</view>
			</view>
		</u-popup>
		<view class="flex-sba" style="height: 70rpx;">
			<view class="marl30 mat30 a0a0">送至河南 郑州市 有货</view>
			<view class="flex-ja">
				<image src="../../static/icon/arrow_right.png" mode="" class="arrow_right"></image>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {
			goodsInfo: {
				type: Object,
				required: true
			},
			shopTags: {
				type: Array,
				required: true
			},
			show: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				flag: false, //收藏
				value: 1, //数量
				arr: [],
				name: '', //商品名称
				list: [],
				showPopup: this.show,
			}
		},
		methods: {
			Popup(e) { //控制弹出层
				this.showPopup = true
				console.log(e);
				uni.setStorageSync('falg',e)
			},
			determine() { //点击确定
				if (this.arr.length !== this.shopTags.length) { //未选择商品提示用户
					this.$refs.uToast.show({
						title: '请选择商品详情',
					})
				} else {
					this.$set(this.goodsInfo,'Specifications',this.name)
					this.$set(this.goodsInfo,'num',this.value)
					let info = {
						info: this.goodsInfo,
						name:this.arr
					}
					let obj = { //直接购买
						list: [{info:this.goodsInfo}],
						sum: (this.goodsInfo.priceMin / 100) * this.value,
						time: new Date(),
					}
					this.showPopup = false
					if (uni.getStorageSync('falg')===1) { //是直接购买就直接储存价格信息
						let arr1 = []
						let a = uni.getStorageSync('order')
						if (a) { //如果已经储存
							arr1 = a
							arr1.unshift(obj)
						} else { //没有储存，就储存成数组
							arr1.unshift(obj)
						}
						this.$refs.uToast.show({
							title:`结算成功，共支付${(this.goodsInfo.priceMin / 100) * this.value}元`,
						})
						uni.setStorageSync('order', arr1)//订单
						uni.navigateTo({
							url: `/pages/order/order`
						})
					} else if(uni.getStorageSync('falg')===2) { //加入购物车，
						console.log(this.arr);
						let flag = false
						let list = null
						let num = 0
						let Cart = uni.getStorageSync('Cart')
						console.log(Cart);
						if (Cart) { //如果储存过
							Cart.map(item => {
								if (item.info.gid === this.goodsInfo.gid) { //如果有一样的id
									this.arr.map(item1 => {
										let temp = item.name.some(item2 => { //查找是否有一样的规格
											return item1.name === item2.name
										})
										if (temp) num++
										if (num === this.arr.length) { //如果name和和num的数量一样，就表示规格一样让num++
											flag = true
											item.info.num = item.info.num + this.value
										}
									})
								}
							})
							if (flag) {
								uni.setStorageSync('Cart', Cart)
							} else {
								Cart.unshift(info)
								uni.setStorageSync('Cart', Cart)
							}
						} else { //没储存过
							Cart = [info]
							uni.setStorageSync('Cart', Cart)
						}
						uni.setStorageSync('num', Cart.length)
						this.$store.commit("setBadge", Cart.length)
						this.$refs.uToast.show({
							title:`添加成功`,
						})
					}
				}
			},
			click(item, index, index1) { //选择规格
				this.arr = this.arr.filter(a => {
					return a.i1 !== index
				})
				this.arr.push({
					i1: index,
					i2: index1,
					name: item.name
				})
				let str = ''
				this.arr.map(item => { //拼接选择的商品信息
					str += ` ${item.name}`
				})
				this.name = str//商品规格
			},
			check(index, index1) {
				return this.arr.some(item => {
					return item.i1 == index && item.i2 == index1
				})
			},
			valChange(e) { //控制数量
				// console.log(e);
				if (e.value !== 0) {
					this.value = e.value
				}
			},
			Collection() {
				this.flag = !this.flag
				if (this.flag) { //点击收藏
					this.$refs.uToast.show({
						title: '收藏成功',
					})
					this.$utils.saveHistory({
						key: 'Collection',
						data: this.goodsInfo,
						attr: 'gid'
					})
				} else { //点击取消收藏，找到元素删除
					this.$utils.Clearsingle({ //清除单个收藏
						key: 'Collection',
						data: this.goodsInfo,
						attr: 'gid'
					})
				}
			},
			close() { //点击关闭弹框
				this.$emit('send', false)
			}
		},
		mounted() {
			console.log(this.goodsInfo);
			console.log(this.shopTags);
			let arr = this.$utils.getHistory({
				key: 'Collection'
			})
			if (arr) { //判断是否收藏
				this.list = arr
				let b = arr.some(item => {
					return item.gid === this.goodsInfo.gid
				})
				this.flag = b
			}
			// console.log(this.bur);
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			show(val) {
				this.showPopup = val
			}
		},
	}
</script>

<style scoped lang="scss">
	.unfavor {
		width: 80rpx;
		height: 80rpx;
	}

	.pricebox {
		height: 140prx;
		padding: 20rpx;
	}

	.goodsInfoMin {
		color: #E40003;
	}

	.business {
		color: #E40003;
	}

	.img800s {
		margin-left: 30rpx;
		width: 180rpx;
		height: 180rpx;
	}

	.tags {
		padding: 20rpx;
		border: 1px solid transparent;
	}

	.determine {
		width: 90%;
		border-radius: 30rpx;
		background-color: #C81D1F;
		height: 80rpx;
		color: #FFFFFF;
	}

	.deder {
		padding-bottom: 20rpx;
		position: fixed;
		bottom: 0rpx;
	}

	.u-number {
		margin-bottom: 30rpx;
	}

	.red {
		border: 1px solid #9A2123;
		color: #9A2123;
	}

	.arrow_right {
		width: 35rpx;
		height: 35rpx;
		margin-right: 30rpx;
	}
</style>
