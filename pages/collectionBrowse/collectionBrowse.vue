<template>
	<!-- 收藏和浏览页面 -->
	<view>
		<u-navbar :title="title" :border-bottom="false"></u-navbar>
		<view v-for="(item,index) in list" :key="index" @click="goto(item)">
			<view class="flex boxclose">
				<view>
					<image :src="item.img800s" class="Collection"></image>
				</view>
				<view class="mar15">
					<view class="mat10">{{item.shortName}}</view>
					<view class="a0a0 mat10">{{item.name}}</view>
					<view class="flex price">
						<view class="priceMin font18 font-w7">￥{{item.priceMin}}</view>
						<view class="a0a0 text-li marl25">￥{{item.marketPrice}}</view>
					</view>
				</view>
				<view class="close" @click="close(item,index)">
					<u-icon name="close"></u-icon>
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
				list: [],
				title: ''
			}
		},
		methods: {
			close(item, index) {
				this.list.splice(index, 1)
				this.$utils.Clearsingle({
					key: 'Collection',
					data: item,
					attr: 'gid'
				}) //删除单个
			},
			goto(item) {
				uni.navigateTo({
					url: `/pages/details/details?id=${item.gid}`
				})
			}
		},
		mounted() {
			if(this.title=='我的收藏'){
				let arr = this.$utils.getHistory({
					key: "Collection"
				})
				if (arr) {
					this.list = arr
				}
			}else{
				let arr = this.$utils.getHistory({
					key: "browse"
				})
				if (arr) {
					this.list = arr
				}
			}
			
		},
		onLoad(option) {
			this.title = option.name
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.Collection {
		width: 240rpx;
		height: 300rpx;
	}

	.price {
		margin-top: 70rpx;
	}

	.priceMin {
		color: #EC6A6B;
	}

	.close {
		position: absolute;
		right: 30rpx;
		bottom: 60rpx;
		display: none;
	}

	.boxclose {
		position: relative;

		&:hover {
			.close {
				display: block;
			}
		}
	}
</style>
