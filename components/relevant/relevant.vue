<template>
	<!-- 详情页相关推荐 -->
	<view>
		<view class="wi100 flex-ja">
			<view class="releva">为你推荐</view>
		</view>
		<swiper style="height:800rpx;">
		<swiper-item  >
		<view class="flex-w" style="height:800rpx;">
				<view class="relevawap" v-for="(item,index) in list" :key="index">
					<view>
						<image :src="item.data.goods.img800s" class="image"></image>
					</view>
					<view class="flex" v-if="item.data.goods.labels.length>0">
						<view v-for="(item1,index1) in item.data.goods.labels" :key="index1" 
							:style="{'background':item1.attrs.bgColor,'height':item1.attrs.height}" class="fff1">{{item1.name}}
						</view>
					</view>
					<view v-if="item.data.goods.labels.length==0" style="height:42rpx;"></view>
					<view class="666 mat10">{{item.data.goods.name}}</view>
					<view class="font14 mat10 priceMin2">￥{{item.data.goods.priceMin/100}}</view>
				</view>
		</view>
		</swiper-item>
		</swiper>
	</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			numid: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				page: 1,
				limit: '6',
				list: [] //相关推荐
			}
		},
		methods: {
			getRecommend() {
				this.$api.getRecommend(this.page).then(res => {
					this.list = res.data.recommendResponseList
					// console.log(this.list);
				}).catch(err => {
					console.log('请求失败', err);
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
	.releva {
		color: #C4B8AB;
		margin: 20rpx auto;
		padding: 10rpx;
		border-bottom: 4rpx solid #C4B8AB;
	}

	.relevawap {
		margin-left: 10rpx;
		width: 240rpx;
		height: 400rpx;
	}

	.image {
		width: 230rpx;
		height: 200rpx;
	}

	.priceMin2 {
		color: #C52C30;
	}
</style>
