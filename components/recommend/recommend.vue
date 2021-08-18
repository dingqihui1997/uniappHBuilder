<template>
	<!-- 推荐 -->
	<view>
		<scroll-view scroll-x="true" class="wi100">
			<u-sticky offset-top="-25">
				<view class="wi100 flex fff">
					<view class=" flex" v-for="(item,index) in recommend.data.items" :key="index"
						@click="click(item,index)">
						<view class="recbox flex-dji">
							<view class="rectop font-w7 font16"
								:class="{font18 :activeindex==index,show:activeindex==index}">
								<view v-if="index===1">618</view>
								<view v-else>{{item.tabConfig.title}}</view>
							</view>
							<view class="font14 eee" :class="{font16 :activeindex==index,show:activeindex==index}">
								{{item.tabConfig.subtitle}}
							</view>
							<view class="recscroll" v-if="activeindex==index"></view>
						</view>
						<view class="flex-a">|</view>
					</view>
				</view>
			</u-sticky>
		</scroll-view>
<!-- 		<view style="heightrpx;"></view> -->
		<scroll-view scroll-y="true" style="height:100vh;  margin-top: 20px;" @scrolltolower="scroll">
			<view class="flex-w">
				<view class="wap" v-for="(item,index) in arr" :key="index" v-if="item.data.goods" @click="details(item)">
					<view>
						<image :src="item.data.goods.imgSquare" class="imgSquare"></image>
					</view>
					<view class="summary font16 000 font-w7">{{item.data.goods.name}}</view>
					<view class="summary eee ">{{item.data.goods.summary}}</view>
					<view class="mat20 flex-sb">
						<view class="flex">
							<view class="font18 priceMin">￥{{item.data.goods.priceMin/100}}</view>
							<view class="666 text-li flex-ja">￥{{item.data.goods.marketPrice/100}}</view>
						</view>
						<view class="mini_menu mar15 ">
							<image src="../../static/icon/menu/mini_menu.png" class="img100"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			recommend: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				activeindex: 0,
				query_id: '',
				arr: [],
				page: 1
			}
		},
		methods: {
			click(item, index) {//切换导航
				// console.log(item);
				this.activeindex = index
				this.query_id = item.query_id
				this.getFeeds()
			},
			getFeeds() { //获取分类数据
				this.$api.getFeeds(this.page, this.query_id).then(res => {
					// console.log(res);
					this.arr = res.data.feeds.items
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			scroll(){
				this.page++
				this.getFeeds()
			},
			details(item){
				uni.navigateTo({
					url:`/pages/details/details?id=${item.data.goods.gid}`
				})
			}
		},
		mounted() {
			// console.log(this.recommend);
			this.query_id = this.recommend.data.items[0].query_id
			this.getFeeds()
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
	.recscroll {
		margin-top: 10rpx;
		width: 60rpx;
		height: 10rpx;
		border-radius: 5rpx;
		background-color: #B60E1F;
	}

	.priceMin {
		color: #BD0D0D;
	}

	.show {
		color: #B60E1F;
	}

	.recbox {
		width: 120rpx !important;
		margin-left: 10rpx;
		margin-right: 10rpx;
		height: 140rpx;
	}

	.wap {
		width: 47%;
		height: 440rpx;
		margin: 10rpx;
		margin-top:20rpx;
	}

	.imgSquare {
		width: 355rpx;
		height: 300rpx;
	}

	.mini_menu {
		height: 10rpx;
		width: 50rpx;
	}
	.summary{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-left: 10rpx;
	}
</style>
