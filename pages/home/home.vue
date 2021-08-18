<template>
	<view>
		<!-- 公共头部 -->
		<view class="box">
			<u-navbar :is-back="false" title="" :background="background">
					<view class="youpin flex-ja">
						<view>
							<image src="../../static/navi_title_v6.png" class="navi_title_v6"></image>
						</view>
						<view class="top mal10 flex" @click="search">
							<image src="../../static/icon/search.png" class="imgsearch"></image>
							<!-- #ifdef H5 -->
							<view class="notice">
								<u-notice-bar mode="vertical" class="vertical":list="Search" :volume-icon="false" color="#a0a0a0"bg-color="none"	@click="search"></u-notice-bar>
							</view>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<u-notice-bar mode="vertical" class="vertical":list="Search" :volume-icon="false" color="#a0a0a0"bg-color="none"	@click="search"></u-notice-bar>
							<!-- #endif -->
						</view>
					</view>
			</u-navbar>
		</view>
		<view class="intelligence"></view>
		<!-- 轮播图 -->
		<view class="carousel">
			<carousel :Carousel="Carousel" v-if="Carousel.length>0"></carousel>
		</view>
		<!-- 狂欢分类 -->
		<carnival :carnival="carnival" v-if="carnival.length>0"></carnival>
		<!-- 品牌图片 -->
		<brand :brand="brand" :brand1="brand1" v-if="Object.values(brand1).length>0"></brand>
		<!-- 影音大牌 -->
		<video1 :video="video" v-if="video.length>0"></video1>
		<!-- 众筹 -->
		<microAmoy :Micro="Micro" v-if="Object.values(Micro).length>0"></microAmoy>
		<!-- 好物榜 -->
		<goodThing></goodThing>
		<!-- 热销榜 -->
		<hotsale :hotsale="hotsale" v-if="Object.values(hotsale).length>0"></hotsale>
		<timelimit :timelimit="timelimit" v-if="Object.values(hotsale).length>0"></timelimit>
		<sale :sale="sale" v-if="Object.values(sale).length>0"></sale>
		<recommend :recommend="recommend" v-if="Object.values(recommend).length>0"></recommend>
	</view>

</template>

<script>
	import carousel from "../../components/carousel/carousel.vue"
	import carnival from "../../components/carnival/carnival.vue"
	import brand from "../../components/brand/brand.vue"
	import video1 from "../../components/video/video.vue"
	import microAmoy from "../../components/microAmoy/microAmoy.vue"
	import goodThing from "../../components/goodThing/goodThing.vue"
	import timelimit from "../../components/timelimit/timelimit.vue"
	import sale from "../../components/sale/sale.vue"
	import recommend from "../../components/recommend/recommend.vue"
	export default {
		components: {
			carousel,
			carnival,
			brand,
			video1,
			microAmoy,
			goodThing,
			timelimit,
			sale,
			recommend
		},
		props: {},
		data() {
			return {
				Carousel: [], //轮播图
				carnival: [], //狂欢上新
				brand: {}, //水几图片
				brand1: {},
				video: [], //影音大牌放价
				Micro: {}, //微淘众筹
				hotsale: {}, //热销榜
				timelimit: {},
				sale: {},
				recommend: {}, //推荐
				Search: [], //搜索热词
				background: {
					backgroundColor: '#FF8166',
				}
			}
		},
		methods: {
			getHomeData() {
				this.$api.getHomeData().then(res => {
					// console.log(res)
					this.Carousel = res.homepage.floors[1].data.items //轮播图
					this.carnival = res.homepage.floors[2].data.items
					this.brand = res.homepage.floors[4].data
					this.brand1 = res.homepage.floors[3].data._hotspot
					this.video = res.homepage.floors[5].data.rows //影音大牌放价
					this.Micro = res.homepage.floors[7].data
					this.hotsale = res.homepage.floors[8] //热销榜
					this.timelimit = res.homepage.floors[9]
					this.sale = res.homepage.floors[10]
					this.recommend = res.homepage.floors[11]
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			getHotWords() { //获取搜索占位词
				this.$api.getHotWords().then(res => {
					// console.log(res.data);
					this.Search = res.data.map(item => {
						return item.queryName
					})
					// console.log(this.Search);
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			search(index) { //搜索
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		},
		mounted() {
			this.getHomeData()
			this.getHotWords()
		},
		onLoad() {

		},
		onShow() {},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #FF8166 !important;
		width: 100%;
		height: 88rpx;
		position: fixed;
		top: 0;
		z-index: 999;
		/* #ifdef MP-WEIXIN */
		height: 120rpx;
		/* #endif */
	}

	.one {
		width: 100%;
		height: 47rpx;
		background-color: #FF8166;
	}

	.top {
		height: 65rpx;
		width: 500rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		/* #ifdef MP-WEIXIN */
		width: 410rpx;
		height: 60rpx;
		position: relative;
		top: -10rpx;
		/* #endif */
	}

	.youpin {
		padding-left: 20rpx;
		position: relative;
	}

	.carousel {
		width: 100%;
		background-color: #FF8166;
		padding-top: 20rpx;
	}

	.notice {
		position: absolute;
		left: 170rpx;
}
	.imgsearch {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 140rpx;
		top: 15rpx;
		/* #ifdef MP-WEIXIN */
		position: absolute;
		left: 20rpx;
		top: 12rpx;
		/* #endif */
	}

	.vertical {
		width: 250rpx;
		/* #ifdef MP-WEIXIN */
		padding-left: 50rpx;
		/* #endif */
	}

	.navi_title_v6 {
		width: 100rpx;
		height: 40rpx;
		/* #ifdef MP-WEIXIN */
		position: relative;
		top: -10rpx;
		/* #endif */
	}
</style>
