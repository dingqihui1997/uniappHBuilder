<template>
	<!-- 搜索 -->
	<view class="box1">
		<u-navbar title="搜索" :border-bottom="false" :background="background"></u-navbar>
		<view class="flex-sba sousuo1">
			<view class="sousuo">
				<u-search  v-model="value" bg-color="#ffffff"  :show-action="false" 
					class="u-search" @change="change" @search="search"></u-search>
			</view>
			<view class="searcherror">
				<u-button type="error" shape="circle" class="u-button" @click="search">搜索</u-button>
			</view>
		</view>
		<view v-if="falg">
			<view class="flex-sb history">
				<view class="font16 font-w7">历史记录</view>
				<view><image src="../../static/icon/del.png" class="del" @click="del"></image></view>
			</view>
			<view class="flex-w" v-if="list.length>0" >
				<view class="record" v-for="(item,index) in list" :key="index" @click="goto(item)">{{item.name}}</view>
			</view>
			<view class="font16 font-w7 marl30 mat30">搜索发现</view>
			<view class="flex-w">
				<view class="record" v-for="(item,index) in HotWords" :key="index" v-if="item.queryName" @click="hot(item)">
				<image src='../../static/icon/hot.png' class="hotpng" v-if="item.hot"></image>
				{{item.queryName}}</view>
			</view>
		</view>
		<view v-if="!falg">
			<view class="flex-a hotwork" v-for="(item,index) in arr" :key="index">
				<image src="../../static/icon/search.png" class="searchimg"></image>
				<view class="marl25" v-html="item.queryName.replace(value,`<span style='color:#AFB4B1'>${value}</span>`)" @click="queryName(item)"></view>
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
				value: '',
				background: {
					backgroundColor: '#eeeee',
				},
				list:[],//历史记录
				HotWords:[],
				falg:true,
				arr:[]
			}
		},
		methods: {
			change(e){
				this.value=e
				if(this.value){
					this.falg=false
					this.$api.getSuggest(e).then(res=>{
						console.log(res);
						this.arr=res.data
					}).catch(err=>{
						console.log('请求失败',err);
					})
				}else{
					this.falg=true
				}				
			},
			search(){//点击搜索和回车跳转商品列表
				if(this.value.replace(/\s+/g, '')){
				this.$utils.saveHistory({
					key:'search',
					data:this.value.trim(),
					attr:'name'
				})
				let a=this.$utils.getHistory({key:'search'}) //获取本地储存
				if(a){
					this.list=a
				}
				uni.navigateTo({
					url:`/pages/list/list?name=${this.value}`
				})
				}
			},
			del(){//清空历史记录
				uni.showModal({
				    title: '提示',
				    content: '确认删除历史记录吗',
				    success: () => {
				    	uni.removeStorageSync('searchHistory')
							this.list=[]
				    }
				});
			},
			getHotWords(){//获取搜索热词
				this.$api.getHotWords().then(res=>{
					// console.log(res.data);
					this.HotWords=res.data
				}).catch(err=>{
					console.log('请求失败',err);
				})
			},
			goto(item){//点击搜索历史
				this.value=item.name
				uni.navigateTo({
					url:`/pages/list/list?name=${this.value}`
				})
			},
			hot(item){//点击热词
				this.value=item.queryName
				this.$utils.saveHistory({
					key:'search',
					data:this.value,
					attr:'name'
				})
				uni.navigateTo({
					url:`/pages/list/list?name=${this.value}`
				})
			},
			queryName(item){
				// console.log(item);
				uni.navigateTo({
					url:`/pages/list/list?name=${item.queryName}`
				})
			}
		},
		mounted() {
		let a=this.$utils.getHistory({key:'search'}) //获取本地储存
		if(a){
			this.list=a
		}
		
		this.getHotWords()
		},
		onLoad(option) {
			// this.value = Object.keys(option)[0]
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.box1 {
	}
.sousuo1{
	background-color: #eeeeee;
}
	.sousuo {
		margin-left: 30rpx;
		padding: 10rpx;
		/* #ifdef MP-WEIXIN */
		width:570rpx !important;
		/* #endif */
		padding-bottom: 30rpx;
	}
	.u-search {
		width: 570rpx;
	}

	.history {
		margin: 20rpx;
	
	}
	.del{
		width: 50rpx;
		height: 50rpx;
	}
	.u-button{
		width: 100rpx;
		height: 60rpx;
		margin-right: 20rpx;
		background-color: #FA3534;
		color: #FFFFFF;
		/* #ifdef MP-WEIXIN */
		position: relative;
		height: 40rpx;
		top: -15rpx;
		/* #endif */
	}
	.searcherror{
		/* #ifdef MP-WEIXIN */
		margin-right: 20rpx;
		width: 100rpx;
		height: 40rpx;
		margin-right: 20rpx;
		/* #endif */
	}
	.record{
		padding:10rpx 20rpx;
		background-color: #F4F4F4;
		margin:10rpx;
		border-radius: 20rpx;
	}
	.hotpng{
		width: 35rpx;
		height: 35rpx;
	}
	.searchimg{
		width: 50rpx;
		height: 50rpx;
	}
	.hotwork{
		height: 80rpx;
		width: 100%;
		border-bottom: 1px #eee solid;
		padding:20rpx 30rpx ;
	}
</style>
