<template>
	<!-- 分类右边板块 -->
	<view style="900rpx">
		<scroll-view scroll-y="true" style="height:1100rpx;" @scrolltolower="click">
			<view class="flex-d">
				<view class="rightscrollimg">
					<image :src="listdata.banner" class="img100"></image>
				</view>
			</view>
			<view v-for="(item,index) in listdata.children" :key="index">
				<view class="name font16 font-w7">
					{{item.name}}
				</view>
				<view class="flex-w">
					<view v-for="(item,index) in item.children" :key="index" class="children flex-dji"
						v-if="item.smallImgCard" @click="goto(item)">
						<view class="imgchildren">
							<image :src="item.smallImgCard.img" class="imglist"></image>
						</view>
						<view class="666 font14 overflow">{{item.smallImgCard.name}}</view>
						<view v-if="item.smallImgCard.badge" class="badge">
							<image :src="item.smallImgCard.badge" class="img100"></image>
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
			listdata: {
				type: Object,
				required: true
			},
			activeindex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			click() {
				this.$emit('send', ''),
					console.log(this.activeindex)
			},
			goto(item) {
				uni.navigateTo({
					url:`/pages/list/list?name=${item.smallImgCard.name}`
				})
				console.log(item);
			}
		},
		mounted() {
			// console.log(this.listdata);
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
	.rightscrollimg {
		margin-top: 20rpx;
		height: 160rpx;
	}

	.children {
		width: 160rpx;
		height: 260rpx;
		position: relative;
	}

	.imgchildren {
		width: 100rpx;
		height: 30prx !important;
	}

	.imglist {
		width: 100rpx;
		height: 160rpx
	}

	.name {
		padding: 20rpx;
	}

	.badge {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 0;
		left: 5rpx;
	}
</style>
