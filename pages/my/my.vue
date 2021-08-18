<template>
	<view>
		<u-navbar :is-back="false" title="我的" :border-bottom="false" class='mytop' :background="{background:''}">
		</u-navbar>
		<view class="my">
			<view>
				<image src="../../static/top-bg.png" class="myimg"></image>
			</view>
			<view class="flex-a marl30 imgwd">
				<view>
					<!-- #ifdef H5 -->
					<image src="../../static/avatar_default.png" class="default"></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<image src="../../static/avatar_default.png" class="default" v-if="!userInfo.avatarUrl"></image>
					<image :src="userInfo.avatarUrl" class="default" v-if="userInfo.avatarUrl"></image>
					<!-- #endif -->
				</view>
				<!-- #ifdef H5 -->
				<view class="mal10">dingding</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view >
					<view class="mal10"  @tap="getUserProfile">{{nickName?nickName:'请登录'}}</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<view class="order flex-sb marl30 mar30 padt25" @click="order">
			<view class="font16 font-w7">我的订单</view>
			<view>全部订单></view>
		</view>
		<view class="flex w100 pay">
			<view class="flex1 flex-di">
				<view>
					<image src="../../static/user/daifukuan.png" class="daifukuan"></image>
				</view>
				<view>待付款</view>
			</view>
			<view class="flex1 flex-di">
				<view>
					<image src="../../static/user/daishouhuo.png" class="daifukuan"></image>
				</view>
				<view>待付款</view>
			</view>
			<view class="flex1 flex-di">
				<view>
					<image src="../../static/user/daipingjia.png" class="daifukuan"></image>
				</view>
				<view>待付款</view>
			</view>
			<view class="flex1 flex-di">
				<view>
					<image src="../../static/user/shouhou.png" class="daifukuan"></image>
				</view>
				<view>待付款</view>
			</view>
		</view>
		<view class="font16 font-w7 function margin-b20">我的功能</view>
		<view class="flex w100 pay1">
			<view class="flex1 flex-di" @click="goto">
				<view>
					<image src="../../static/user/youhuiquan.png" class="daifukuan"></image>
				</view>
				<view>{{count}}张优惠券</view>
			</view>
			<view class="flex1 flex-di">
				<view>
					<image src="../../static/user/hongbao.png" class="daifukuan"></image>
				</view>
				<view>我的红包</view>
			</view>
			<view class="flex1 flex-di">
				<view @click="Collection('我的收藏')">
					<image src="../../static/user/shoucang.png" class="daifukuan"></image>
				</view>
				<view>我的收藏</view>
			</view>
			<view class="flex1 flex-di" @click="Collection('浏览记录')">
				<view>
					<image src="../../static/user/liulanjilu.png" class="daifukuan"></image>
				</view>
				<view>浏览记录</view>
			</view>
		</view>
		<view class="marl30 more font-w7 font16">更多工具</view>
		<view class="marl30 mar30 flex-w">
			<view v-for="(item,index) in list" :key="index" class="mroe flex-dji mat20">
				<view><image :src="item.url" class="imgname"></image></view> 
				<view>{{item.name}}</view>
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
				userInfo:{},
				hasUserInfo:false,
				nickName:'',
				list: [{
					name: '我的钱包',
					url: "../../static/user/qianbao.png",
				},{
					name: '官方客服',
					url: "../../static/user/kefu.png",
				},{
					name: '用户反馈',
					url: "../../static/user/yonghufankui.png",
				},
				{
					name: '资质证照',
					url: "../../static/user/zizhizhengzhao.png",
				},
				{
					name: '协议规则',
					url: "../../static/user/xieyiguize.png",
				},
				{
					name: '线下门店',
					url: "../../static/user/xianxiamendian.png",
				},
				{
					name: '更新日志',
					url: "../../static/user/update.png",
				},
				],
				count:0,//优惠券数量
			}
		},
		methods: {
			goto() { //优惠券页面
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				})
			},
			Collection(item){//去收藏或浏览页面
				uni.navigateTo({
					url: `/pages/collectionBrowse/collectionBrowse?name=${item}`
				})
			},
			getCouponCount(){//获取优惠券数量
				this.$api.getCouponCount().then(res=>{
					// console.log(res);
					this.count=res.data.count
				}).catch(err=>{
					console.log('请求失败',err);
				})
			},
			order(){//跳转我的订单
				uni.navigateTo({
					url: `/pages/order/order`
				})
			},
			 getUserProfile(e) {
			    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			    wx.getUserProfile({
			      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			      success: (res) => {
			        this.userInfo= res.userInfo
			        this.hasUserInfo=true
							this.nickName=res.userInfo.nickName
							// console.log(this.userInfo);
			      }
			    })
			  },
		},
		mounted() {
		this.getCouponCount()
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
	.myimg {
		width: 100%;
		height: 400rpx;
	}

	.mytop {
		position: fixed;
		z-index: 99999;
	}

	.default {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
	}

	.my {
		position: relative;
	}

	.imgwd {
		position: absolute;
		bottom: 120rpx;
	}

	.order {
		padding-bottom: 50rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		background-color: #fff;
		position: relative;
		top: -90rpx;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
	}

	.pay {
		width: 100%;
		height: 120rpx;
		position: relative;
		top: -90rpx;
	}

	.pay1 {
		width: 100%;
		height: 120rpx;
	}

	.daifukuan {
		width: 100rpx;
		height: 100rpx;
	}

	.function {
		margin-left: 50rpx;
	}
	.more{
		margin-top: 50rpx;
	}
	.imgname{
		width: 80rpx;
		height: 80rpx;
	}
	.mroe{
		width: 25%;
	}
</style>
