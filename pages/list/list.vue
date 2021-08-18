<template>
	<!-- 商品列表 -->
	<view>
		<u-navbar title="商品列表" :border-bottom='false'></u-navbar>
		<view class="fiexd">
			<view class="flex-sb">
				<view class="u-tag">
					<u-tag :text="name" type="info" shape="circle" />
				</view>
				<view>
					<image src="../../static/icon/arrange_list_black.png" class="arrange" @click="arrange"></image>
				</view>
			</view>
			<view class="flex-ja wi100">
				<view v-for="(item,index) in list" :key="index" class="all flex-ja" @click="click(item,index)"
					:class="{'active':actveindex==index}">
					{{item.name}}
					<view v-if="index==2">
						<u-icon name="arrow-up" v-if="show"></u-icon>
						<u-icon name="arrow-down" v-if="!show"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view v-if="dataList.length>0" class="wi100" :class="{'dataList':flag}" style="margin-top: 140rpx;">
			<view v-for="(item,index) in dataList" :key="index" class=" mat20  mar15" :class="flag?'left':'left1'" @click="goto(item)">
				<view>
					<image :src="item.data.goodsInfo.img800s" class="goodsInfoimg"></image>
				</view>
				<view class="right">
					<view class="font16  666 font-w7 mat20 name1 overflow" :class="flag?'name2':'name1'">{{item.data.goodsInfo.name}}</view>
					<view class="a0a0 mat20 name1 overflow" :class="flag?'name2':'name1'">{{item.data.goodsInfo.summary}}</view>
					<view class="flex-a mat20">
						<view class="priceMin">￥{{item.data.goodsInfo.priceMin/100}}起</view>
						<view class="text-li a0a0 mal10">￥{{item.data.goodsInfo.marketPrice/100}}</view>
					</view>
					<view class="flex overflow">
						<view v-for="(item1,index1) in item.data.label.normal" :key="index1" class="normal"
							v-if="index1<2">
							{{item1.text}}
						</view>
					</view>
					<view class="flex a0a0">
						<view>{{item.data.comment.count}}条评论</view>
						<view class="marl30">
							{{item.data.comment.positiveRate>0?item.data.comment.positiveRate+'%好评':'' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="dataList.length==0" class="wi100 flex-ja mat30" style="margin-top: 160rpx;">暂无数据</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				actveindex: 0,
				show: true,
				name: '',
				id: 0,
				dataList: [],
				flag:true,
				list: [{ //// sortBy: 综合排序传0 销量排序传8  新品传7 价格降序传2 价格升序传1 信用排序传6
						name: '综合',
						id: 0
					}, {
						name: '新品',
						id: 7
					}, {
						name: '价格',
						id: 1
					},
					{
						name: '信用',
						id: 6
					},
					{
						name: '筛选',
					}
				]
			}
		},
		methods: { //点击大类
			click(item, index) {
				this.actveindex = index
				if (index == 2) { //点击价格时
					this.show = !this.show
					if (this.show) {
						this.id = 1
					} else {
						this.id = 2
					}
				} else {
					this.id = item.id
				}
				this.queryIdSearch()
			},
			queryIdSearch() { //获取综合列表
				this.$api.queryIdSearch(
						[{
							queryName: this.name,
							queryType: 0,
							rule: []
						}],
						this.id,
						'searchPage')
					.then(res => {
						if (res.code === 0) {
							this.dataList = res.data.data.goods
							console.log(this.dataList);
							// console.log(res);
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			arrange(){//切换排列方式
				this.flag=!this.flag
			},
			goto(item){
				uni.navigateTo({
						url:`/pages/details/details?id=${item.data.goodsInfo.gid}`
					})
				
			}
		},
		mounted() {
			this.queryIdSearch()
		},
		onLoad(option) {
			this.name = option.name
			// console.log(this.name);
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.u-tag {
		margin-left: 20rpx;
	}

	.arrange {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.more_spec {
		width: 25rpx;
		height: 25rpx;
	}

	.all {
		flex: 1
	}

	.goodsInfoimg {
		width: 300rpx;
		height: 260rpx;
	}

	.normal {
		padding: 10rpx;
		color: #FFFFFF;
		background-color: #EA6A6D;
		font-size: 12rpx;
		white-space: nowrap;
		margin-right: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.priceMin {
		color: #EF0405;
		font-size: 18px;
		font-weight: 700;
	}

	.active {
		color: #E80F11;
	}
	.dataList{//横向
		display: flex;
		flex-wrap: wrap;
	}
	.left{//横向排列
		width: 45%;
		height: 580rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.left1{//竖向排列
    display: flex;
    justify-content: space-between;
	}
	.name1{//竖向
		width: 430rpx;
	}
	.name2{//横向排列
		width: 320rpx;
	}
	.fiexd{
		position: fixed;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		z-index: 9999;
	}
</style>
