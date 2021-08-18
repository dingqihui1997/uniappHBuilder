<template>
	<!--微淘众筹 -->
	<view class="Micro" @click="click">
		<view class="Microhead">
			<view class="flex-sb">
				<view class="flex-ja more">微淘众筹</view>
				<view class=" flex-ja">更多<image src="../../static/icon/arrow_right.png" class="Microimg"></image>
				</view>
			</view>
			<view class="Microbox flex-w">
				<view   v-for="(item1,index) in Micro.items" :key="index" :class="{ Microindex: index === 0,Microtop:index!==0}">
					<view class="itemname">{{item1.item.name}}</view>
					<view class="flex-sb study">
						<view>
							<view class="summary font-w7" v-if="index===0"> {{item1.item.summary}}</view>
							<view class="market_price mat20 font16 font-w7">{{'￥'+ item1.item.market_price/100}}
							</view>
						</view>
						<view class="flex-ja" :class="{ pic_url: index === 0 ,pic:index!==0}"> 
							<image :src="item1.item.pic_url" class="img100"></image>
						</view>
					</view>
				<view class="flex">
					<image :src="item1.item.label_url" class="label_url"> </image>
					<view>支持人数  <text class="saled_count">{{item1.item.saled_count}}</text></view>
				</view>
				<view class="attr flex-ja"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			Micro: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {},
		mounted() {
			// console.log(this.Micro);
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
	.Micro {
		margin-top: -10rpx;
		padding-top: 20rpx;
		width: 100%;
		background-color: #DA4847;
	}

	.Microhead {
		width: 95%;
		background-color: #eeeeee;
		margin-left: 20rpx;
		margin-right: 20rpx;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		background: url("https://img.youpin.mi-img.com/jianyu/efaf252fb1ef07bb22395bc3649a127d.png?w=1053&h=180");
		background-size: cover;
	}
	.Microbox{
		width: 100%;
		padding-left: 20rpx;
	}
	.Microindex {
		height: 420rpx;
		width: 100%;
	}

	.Microtop {
		height: 420rpx;
		width: 50%;
	}

	.Microimg {
		width: 30rpx;
		height: 30rpx;
	}

	.more {
		font-size: 20px;
		font-weight: 700;
	}

	.itemname {
		margin-top: 20rpx;
		font-size: 16px;
		color: #666;
	}

	.study {
		height: 270rpx;
	}
	.saled_count{
		color: #CFB29F;
	}
	.summary {
		width: 400rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		background-color: #FFF9E6;
		color: #89663B;
		margin-top: 10rpx;
	}
	.attr{
		width: 95%;
		height: 10rpx;
		background-color: #F08348;
		margin-top: 10rpx;
		border-radius: 5rpx;
	}
	.market_price {
		color: #C01112;
	}
	
	.pic_url {
		width: 280rpx !important;
		height: 300rpx !important;
		position: relative;
		top: -30rpx;
	}

	.pic {
		width: 160rpx;
		height: 160rpx;
	}

	.label_url {
		width: 45rpx;
		height: 45rpx;
	}
</style>
