<template>
	<view>
		<u-navbar back-text="返回" :title="'问大家'+String(list.length)" :border-bottom="false"></u-navbar>
		<view class="flex-a mat30 a0a0">
			<view>
				<image :src="goods.img800s" class="goodsimg"></image>
			</view>
			<view>{{goods.name}}</view>
		</view>
		<view class="flex-sb a0a0 mar30 marl30 mat20">
			<view>全部{{list.length}}个回答</view>
			<view>{{time}}</view>
		</view>
		<view v-for="(item,index) in list" :key="index" class="mar30 marl30 ask">
			<view class="flex-a">
				<view><image src="../../static/icon/ask_question.png" class="question mar15"></image></view>
				<view class="font-w7 font14 mar15">{{item.ask}}</view>
			</view>
			<view v-for="(item1,index1) in item.top_reply" :key="index1">
				<view class="flex">
					<view class="answer"><image src="../../static/icon/answer.png" class="question mar15"></image></view>
					<view class="mar15">{{item1}}</view>
				</view>
			</view>
			<view class="flex-sb a0a0">
				<view class="top_reply ">全部{{item.top_reply.length}}个回答</view>
				<view class="flex-a">{{item.utime}}</view>
			</view>
		</view>
		</view>
	</view>

</template>

<script>
	import dayjs from "dayjs"
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: [],
				id: '',
				goods: {},
				time: ''
			}
		},
		methods: {
			getAskInfo() {
				this.$api.getAskInfo(this.id).then(res => {
						// console.log(res);
						this.list = res.data.list
						this.list.map(item=>{
							item.utime=dayjs(item.utime).format(
							`YYYY.MM.DD`)
						})
						this.goods = res.data.goods
						this.time = dayjs(res.timestamp).format(
							`YYYY.MM.DD`)
							// console.log(this.list);
						}).catch(err => {
						console.log("请求失败", err);
					})
				}
			},
			mounted() {
				this.getAskInfo()
			},
			onLoad(Option) {
				this.id = Option.id
			},
			onShow() {

			},
			filters: {},
			computed: {},
			watch: {},
		}
</script>

<style scoped lang="scss">
	.goodsimg {
		margin-left: 30rpx;
		width: 90rpx;
		height: 90rpx;
	}
	.answer{
		position: relative;
		top: -15rpx;
	}
	.top_reply{
		margin: 20rpx 60rpx;
	}
	.ask{
		margin-top: 50rpx;
	}
</style>
