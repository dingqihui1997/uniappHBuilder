<template>
	<view>
		<view class="pflex marb zind9">
			<view class="life">
				<top><template #center>
						<view class="life1">
							<image src="../../static/life_title.png" class="img100 lifeimg"></image>
						</view>
					</template></top>
			</view>
			<view class="lifetop">
				<scroll-view scroll-x="true" style="width:100%;">
					<view class="flex">
						<view v-for="(item,index) in tab" :key="index" class="tab flex-dji" @click="click(item,index)">
							<view class="tab1 flex-ja font16">
								{{item.title}}
							</view>
							<view class="tabborder" v-if="actveindex===index"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view style="height:170rpx; width: 100%;"></view>
		<lifeRotation :Rotation='Rotation' v-if="Rotation.length>0&&digital.length>0" :digital="digital"></lifeRotation>
		<Living :list="list" v-if="list.length>0" @send="send"></Living>
	</view>
</template>

<script>
	import lifeRotation from "../../components/lifeRotation/lifeRotation.vue"
	import Living from "../../components/living/living.vue"
	export default {
		components: {
			lifeRotation,
			Living
		},
		props: {},
		data() {
			return {
				tab: [], //标签页
				actveindex: 0,
				Rotation: [], //轮播图
				page: 1, //页数
				tabID: '',
				pageSize: 10, //数据条数
				list: [], //生活板块
				digital: []
			}
		},
		methods: {
			getBktrSimple() { //获取生活首页数据
				this.$api.getBktrSimple().then(res => {
					// console.log(res);
					this.tab = res.data.tab
					this.Rotation = res.data.banner //轮播图
					this.digital = res.data.kkong //数码圈子
					this.tabID = res.data.tab[this.actveindex].id
					this.getHomeTab()
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			getHomeTab() { //获取生活板块
				this.$api.getHomeTab(this.tabID, this.page, this.pageSize).then(res => {
					// console.log(res);
					this.list = this.list.concat(res.data)
					// console.log(this.life);
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			click(item, index) {
				this.actveindex = index
				this.tabID = item.id
				console.log(item.id);
				this.list = []
				this.getHomeTab()
			},
			send() {
				this.page++
				this.getHomeTab()
			}
		},
		mounted() {
			this.getBktrSimple()
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
	.life {
		width: 100%;
		height: 88rpx;
		background-color: #FFC437;
		/* #ifdef MP-WEIXIN */
		height: 115rpx;
		padding-top: 88rpx;
		/* #endif */
	}

	.life1 {
		width: 150rpx;
		height: 50rpx;
	}

	.lifeimg {
		/* #ifdef MP-WEIXIN */
		position: relative;
		top: -50rpx;
		/* #endif */
	}

	.lifetop {
		width: 100%;
		height: 100rpx;
		background-color: #FFC437;
	}

	.tab1 {
		padding-top: 30rpx;
		width: 80rpx;
		width: 100rpx;
		color: #fff;
	}

	.tabborder {
		height: 10rpx;
		width: 50rpx;
		background-color: #FFFFFC;
		border-radius: 10rpx;
		margin-top: 10rpx;
	}
</style>
