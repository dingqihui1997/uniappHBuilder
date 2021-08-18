<template>
	<!-- 热销榜 -->
	<view class="hotsale">
		<view class="fff fffhot">
			<view class="hotsaletop flex-sba">
				<view><text class="font20 font-w7">{{hotsale.data.title}}</text><text
						class="666 mal10">{{hotsale.data.subtitle}}</text></view>
				<view>更多<image src="../../static/icon/arrow_right.png" class="hotimg"></image>
				</view>
			</view>
			<scroll-view style="width: 100%;" scroll-x="true">
				<view class="flex">
					<view class="hotfor flex-dji" v-for="(item1,index) in hotsale.data.items" :key="index" @click="goto(item1)">
						<view>
							<image :src="item1.item.pic_url" class="hotimg1"></image>
						</view>
						<view class="custom">{{item1.item.attr_ext.custom_summary}}</view>
						<view class="custom_name">{{item1.item.attr_ext.custom_name}}</view>
						<view class="numindenx">{{index+1}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			hotsale: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			goto(item1){
				uni.navigateTo({
					url:`/pages/details/details?id=${item1.item.gid}`
				})
			}
		},
		mounted() {
			// console.log(this.hotsale);
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
	.hotsaletop {
		padding: 20rpx;
	}

	.hotsale {
		width: 100%;
		height: 520rpx;
		background-color: #DA4847;
		padding: 10rpx 20rpx;
	}

	.hotimg {
		width: 30rpx;
		height: 30rpx;
	}
	.fffhot{
		border-radius: 10rpx;
	}
	.hotfor {
		width: 230rpx;
		height: 380rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		background-color: #fff;
		border-radius: 10rpx;
		position: relative;
	}

	.hotimg1 {
		width: 230rpx;
		height: 210rpx;
		background-color: #eee;
	}

	.custom {
		width: 230rpx;
		background-color: #FF5A1C;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 10rpx;
	}

	.custom_name {
		width: 230rpx;
		height: 80rpx;
		color: #936B39;
		background-color: #FEDEAF;
		text-align: center;
	}
	.numindenx{
		position: absolute;
		top: 5rpx;
		left: 0;
		color: #FEDEAF;
		font-weight: 700;
		font-size: 20px;
	}
</style>
