<template>
	<!-- 详情服务板块 -->
	<view>
		<view class="flex-sb marl25 mat30 a0a0" @click="click">
			<view class="flex">
				<view class="fuwu">服务</view>
				<view class="flex fuwukeys">
					<view v-for="(val,keys) in services" :key="keys" class="flex"  v-if="Object.keys(services).length>0">
						<view>
							<image src="../../static/icon/checkbox_check_hollowred.png" class="hollowred"></image>
						</view>
						<view class="serviceList">
							{{val.text}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex-ja">
				<image src="../../static/icon/arrow_right.png" mode="" class="arrow_right"></image>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14">
			<view style="height:700rpx;" class="mat20">
				<view v-for="(item,index) in serviceInfo.serviceList" class="flex-d" :key="index">
					<view class="flex-a margin-b20 mat20">
						<view>
							<image src="../../static/icon/checkbox_check_hollowred.png" class="hollowred"></image>
						</view>
						<view>{{item.name}}</view>
					</view>
					<view class="marl30 a0a0" v-for="(item1,index1) in item.descList" :key="index1" @click="see(index)">
						{{item1}}
					</view>
				</view>
			</view>
		</u-popup>
		<view class="zizhi flex-ja" v-if="flag" @click="out">
			<image :src="serviceInfo.qualificationPic[0]" class="qualificationPic"></image>
		</view>
		<view class="flex-sba marl30 mat30 static" @click="goto"  v-if="text">
			<view class="flex-a">
				<view >
					<image src="../../static/jiang.png" class="jiang"></image>
				</view>
				<view class="font18 flex-a font-w7 mal10 mar15">排行榜</view>
				<view class="font16 font-w7 mar15">{{text}}</view>
			</view>
				<view class="flex-ja">
					<image src="../../static/icon/arrow_right.png"  class="arrow_right"></image>
				</view>

		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			services: {
				type: Object,
				required: true
			},
			serviceInfo: {
				type: Object,
				required: true
			},
			numid: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				show: false,
				flag: false,
				obj: {},
				text:''
			}
		},
		methods: {
			click() {
				this.show = true
			},
			see(index) { //查看资质
				if (index == 2) {
					this.flag = true
				}
			},
			out() {
				this.flag = false
			},
			getComposeTwo() {//获取排行
				this.$api.getComposeTwo(this.numid).then(res => {
					// console.log(res);
					this.obj = res[1]
					if(this.obj.data){
						this.text=	this.obj.data.text
					}
					// console.log(this.obj);
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			goto(){
				let url=this.obj.data.baseInfo.jumpUrl
				// #ifdef MP-WEIXIN
				    uni.setClipboardData({
				     data: url,
				     success: function() {}
				    });
				    // #endif
				    // #ifndef MP-WEIXIN
				    window.location.href = url
				    // #endif
			}
		},
		mounted() {
			this.getComposeTwo()
			// console.log(this.services);
			// console.log(this.serviceInfo);
		},
		onLoad(e) {
			console.log(e);
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.hollowred {
		margin-left: 20rpx;
		margin-right: 10rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.arrow_right {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
	}

	.serviceList {
		/* #ifdef MP-WEIXIN */
		width: 100rpx;
		text-overflow:clip;
		/* #endif */
	}
	.fuwukeys{
		width: 510rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.zizhi {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10076;
	}

	.qualificationPic {
		width: 90%;
		height: 60%;
	}

	.fuwu {
		width: 50rpx;
		white-space: nowrap;
	}

	.jiang {
		width: 50rpx;
		height: 50rpx;
	}

	.static {
		margin-top: 30rpx;
	}
</style>
