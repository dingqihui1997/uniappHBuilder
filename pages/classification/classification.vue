<template>
	<view>
		<view class="topclass">
			<top><template #center>
					<view class="fication">分类</view>
				</template></top>
			<view class="clasearch">
				<u-search placeholder="日照香炉生紫烟" v-model="keyword" :show-action="false"></u-search>
			</view>
		</view>
		<!-- <view style="width: 100%; height: 152rpx;"></view> -->
		<view class="flex-sb">
			<view class="leftscroll" style="height:1100rpx;">
				<scroll-view style="height:100%;" scroll-y="true">
					<view class="onescroll 666 font16" v-for="(item,index) in list" :key="index"
						@click="click(item,index)" :class="{'activeone':activeindex===index}">{{item.name}}</view>
				</scroll-view>
			</view>
			<!-- 右边区域 -->
			<view class="rightscroll" style="height:900rpx;">
				<rightscroll :listdata="listdata" v-if="Object.keys(listdata).length>0" :activeindex="activeindex"
					@send="send"></rightscroll>
			</view>
		</view>
	</view>

</template>

<script>
	import rightscroll from "../../components/rightscroll/rightscroll.vue"
	export default {
		components: {
			rightscroll
		},
		props: {},
		data() {
			return {
				keyword: "衣架",
				list: [],
				activeindex: 0,
				id: "",
				listdata: {}, //二级分类数据
			}
		},
		methods: {
			getCategorylist() { //获取一级分类
				this.$api.getCategorylist().then(res => {
					// console.log(res);
					this.list = res.data
					this.id = res.data[this.activeindex].id
					this.getCategorydetail()
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			click(item, index) {
				this.activeindex = index
				this.id = item.id
				this.getCategorydetail()
			},
			getCategorydetail() { //获取二级分类
				this.$api.getCategorydetail(this.id).then(res => {
					// console.log(res);
					this.listdata = res.data
					// console.log(this.listdata);
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			send() {
				if (this.activeindex < this.list.length) {
					this.activeindex++
					this.getCategorylist()
				}
			}
		},
		mounted() {
			this.getCategorylist()
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
	.fication {
		/* #ifdef MP-WEIXIN */
		margin-top: 55rpx;
		/* #endif */
	}

	.clasearch {
		margin-left: 20rpx;
		width: 400rpx;
		/* #ifdef MP-WEIXIN */
		margin-top: 30rpx;
		/* #endif */
	}

	.onescroll {
		padding: 20rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		border-radius: 30rpx;
	}

	.activeone {
		color: #FFFFFF;
		background-color: #FC2C16;
	}

	.rightscroll {
		width: 510rpx;
		margin-left: 40rpx;
		padding-right: 20rpx;
	}

	.topclass {
		// position: fixed;
	}
</style>
