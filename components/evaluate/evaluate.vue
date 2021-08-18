<template>
	<!-- 评价-->
	<view>
		<view class="flex-sba marl30 mat30 margin-b10" @click="goto">
			<view class="font16">用户评价({{tags.total_count}})</view>
			<view class="flex a0a0">
				<view>{{tags.positive_rate}}%满意度</view>
				<view class="flex-ja">
					<image src="../../static/icon/arrow_right.png" mode="" class="arrow_right"></image>
				</view>
			</view>
		</view>
			<view class="flex-w wi100" >
				<view v-for="(item,index) in tags.tags" :key="index" class="tagswap">
					{{item.name+(item.count)}}
				</view>
			</view>
			<scroll-view scroll-x="true">
				<view class="flex wi100 scrolleva">
					<view class="hei100 flex-d content1" v-for="(item,index) in content" :key="index" >
						<view class="flex">
							<view v-if="item.avatar"><image :src="item.avatar" class="imgavatar"></image></view>
							<view class="contentnick_name flex-a">{{item.nick_name}}</view>
							<view class="flex-a mal30 score"><u-rate v-model="item.score" :disabled="true" active-color="#FFCE53"></u-rate></view>
						</view>
						<view class="textcontent">{{item.text}}</view>
					</view>
						<view class="gengduo">查看更多评价<image src="../../static/icon/arrow_right_circle.png" style="height: 30rpx;width: 30rpx;"></image></view>
				</view>
			</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			content:{
				type: Array,
				required: true
			},
			tags:{
				type: Object,
				required: true
			},
			numid:{
				type:String,
				required: true
			}
		},
		data() {
			return {
			count:0,
			}
		},
		methods: {
			goto(){
				uni.navigateTo({
					url:`/pages/comment/comment?id=${this.numid}`
				})
			}
		},
		mounted() {
			// console.log(this.id);
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
	.arrow_right {
		width: 35rpx;
		height: 35rpx;
		margin-right: 30rpx;
	}
	.tagswap{
		padding: 15rpx;
		background-color: #FFFBE1;
		margin: 10rpx ;
		border-radius: 10rpx;
	}
	.imgavatar{
		width: 90rpx;
		height: 90rpx;
		border-radius: 100%;
		margin-left: 30rpx;
	}
	.content1{
		width: 730rpx;
		height: 280rpx;
		margin: 20rpx;
	}
	.contentnick_name{
		padding-left:10rpx 20rpx;
		margin-left: 30rpx;
	}
	.score{
		width: 70rpx;
	}
	.textcontent{
		width: 700rpx;
		// height: 40rpx;
		margin-left: 30rpx;
		line-height: 40rpx;
	}
	.gengduo{
		padding: 0 30rpx;
	}
</style>
