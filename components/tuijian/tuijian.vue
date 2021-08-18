<template>
	<!-- 推荐 -->
  <view>
    <view class="flex-ja tuijian">
			<view><image src="../../static/icon/titile_left.png" class="titile_left"></image></view>
			<view>为您推荐</view>
			<view><image src="../../static/icon/titile_right.png" class="titile_left"></image></view>
		</view>
		<view class="flex-wa">
			<view v-for="(item,index) in list" :key="index" class="wapindex" @click="goto(item)">
				<view class="flex-ja"><image :src="item.data.goods.img800s" class="goosimg"></image></view>
				<view class="flex-a">
					<view v-for="(item1,index1) in item.data.goods.labels"  :key="index1" class="labels">{{item1.name}}</view>
				</view>
				<view>{{item.data.goods.name}}</view>
				<view class="a0a0 summary overflow">{{item.data.goods.summary}}</view>
				<view class="flex  mat20">
					<view class="font-w7 font16 priceMin">￥{{item.data.goods.priceMin/100}}</view>
					<view class="a0a0 mal10 text-li">￥{{item.data.goods.marketPrice/100}}</view>
				</view>
			</view>
		</view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
				page: 1,
				list: [] //相关推荐
			}
    },
    methods: {
			getRecommend() {
				this.$api.getRecommend(this.page).then(res => {
					this.list = res.data.recommendResponseList
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			goto(item){
				uni.navigateTo({
					url:`/pages/details/details?id=${item.data.goods.gid}`
				})
			}
		},
    mounted() {
		this.getRecommend()
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
.tuijian{
	position: relative;
	top: -100rpx;
}
.titile_left{
	width: 50rpx;
	height: 50rpx;
}
.wapindex{
	width: 46%;
	margin-left: 20rpx;
	height: 440rpx;
	margin-bottom: 20rpx;
}
.goosimg{
	width: 200rpx;
	height: 230rpx;
}
.summary{
	width: 300rpx;
}
.labels{
	padding: 10rpx;
	margin-left: 10rpx;
	margin-top: 10rpx;
	color: #FFFFFF;
	background-color: #EB696D;
	border-radius: 10rpx;
	font-size: 14rpx;
}
.priceMin{
	color: #B60101;
}
</style>
