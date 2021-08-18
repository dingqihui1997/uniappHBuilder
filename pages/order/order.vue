<template>
	<!-- 我的订单 -->
  <view class="box">
    	<u-navbar  title="我的订单" :border-bottom='false'></u-navbar>
			<view class="flex fff">
				<view class="flex1 flex-ja font14" v-for="(item,index) in list" :key="index">
					<view :class="{order1:activeindex==index}" @click="click(index)">{{item}}</view>
				</view>
			</view>
			<view v-for="(item,index) in arr" :key="index" class="orderone">
				<view class="flex-sb">
					<view class="font-w7">订单时间 : {{item.time}}</view>
					<view class="Completed">已完成订单</view>
				</view>
				<view class="flex mat20" v-for="(item1,index1) in item.list" :key="index1">
					<view><image :src="item1.info.img800s"class="imgorder"></image></view>
					<view class="right mat30">
						<view class="font14 font-w7">{{item1.info.shortName}}</view>
						<view class="a0a0 font14 marg-b40 overflow">{{item1.info.Specifications}}</view>
						<view class="flex-sb">
							<view class="Completed">￥{{item1.info.priceMin/100}}</view>
							<view class="a0a0">x{{item1.info.num}}</view>
						</view>
						<view class="sum">总计 : {{item.sum}}.00</view>
					</view>
				</view>
			</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
  export default {
    components: {},
    props: {},
    data() {
      return {
			list:['全部','待付款','待收货','已收货','退款'],
			activeindex:0,
			arr:[]
			}
    },
    methods: {
			click(index){
				this.activeindex=index
			}
		},
    mounted() {
		let a=uni.getStorageSync('order')
		if(a){
			this.arr=a
			this.arr.map(item=>{
				item.time=dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
			})
		}
		console.log(this.arr);
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
.order1{
	padding: 10rpx 20rpx;
	background: #FFD678;
	color: #FFFFFF;
	border-radius: 30rpx;
}
.box{
	background-color: #eeeeee;
	padding-bottom: 20rpx;
}
.orderone{
	padding: 20rpx;
	width: 93%;
	margin: 20rpx auto;
	background-color: #FFFFFF;
	border-radius: 10rpx;
}
.imgorder{
	width: 180rpx;
	height: 200rpx;
}
.right{
	width: 470rpx;
}
.sum{
	text-align: right;
	margin-top: 20rpx;
	color: #E1594F;
	font-weight: 700;
font-size: 16px;
}
.Completed{
	color: #E1594F;
	font-size: 16px;
}
</style>
