<template>
	<view>
		<view class="topcomment">
			<top>
				<template #left>
					<view class="flex-ja">
						<image src="../../static/icon/left.png" class="arrow_right" @click="back"></image>
					</view>
				</template>
				<template #center>
					<view class="font16 font-w7" style="">全部评价</view>
				</template>
			</top>
		</view>
		<view style="height: 88rpx;"></view>
		<view class="pad20-10 flex-sb a0a0">
			<view class="flex-ja ">
				<view>综合评分:</view>
				<view v-if="Object.keys(comment).length>0">
					<u-rate v-model="comment.data.avg_score" active-color="#F8C55C" :disabled="true"></u-rate>
				</view>
			</view>
			<view v-if="Object.keys(comment).length>0">{{comment.data.positive_rate}}%满意</view>
		</view>
		<view class="pad20-10 flex-w">
			<view class="flex-w wi100" v-if="tags.length>0">
				<view v-for="(item,index) in tags" :key="index" class="tagscomment flex-ja" v-if="tags.length>0"
					@click="click(item,index)" :class="{'backclor':actveindex===index}">
					{{item.name+'('+item.count+')'}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" style="height: 100vh;" @scrolltolower="tolower">
			<view v-for="(item,index) in list" :key="index">
				<view class="flex-sb">
					<view class="flex">
						<view>
							<image :src="item.avatar" class="imgavatar"></image>
						</view>
						<view class="flex-d mal10">
							<view class="flex">
								<view>{{item.nick_name}}</view>
								<view>
									<u-rate v-model="item.score" active-color="#F8C55C" :disabled="true">
									</u-rate>
								</view>
							</view>
							<view>已选：{{item.pid_spec}}</view>
						</view>
					</view>
					<view v-if="tags.length>0" class="mar15">{{item.order_create_time}}</view>
				</view>
				<view class="itemtext">{{item.text}}</view>
				<view class="flex-w imgwap">
					<view v-for="(item1,index) in item.comment_imgs">
						<image :src="item1.img" class="itemimg"></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import dayjs from "dayjs"
	export default {
		components: {},
		props: {},
		data() {
			return {
				numid: '',
				comment: {},
				actveindex: 0,
				tags: [],
				page: 1,
				pageSize: 20,
				tagid: '',
				list: [],
			}
		},
		methods: {
			getCommentTag() { //获取评论
				this.$api.getCommentTag(this.numid).then(res => {
					// console.log(res);
					this.comment = res
					this.tags = res.data.tags
					console.log(this.tags);
					this.tagid = this.tags[this.actveindex].id
					this.getCommentContent()
				}).catch(err => {
					console.log('请求失败', err);
				})
			},
			click(item, index) {
				this.actveindex = index
				this.tagid = item.id
				this.list=[]
				this.getCommentContent()
			},
			getCommentContent() { //获取评论内容
				this.$api.getCommentContent(this.numid, this.page, this.pageSize, this.tagid).then(res => {
					this.list =this.list.concat(res.data.list)
					res.data.list.map(item=>{
					return	item.order_create_time=dayjs(item.order_create_time).format('YYYY.MM.DD')
					})
				}).catch(err => {
					// console.log('请求失败', err);
				})
			},
			back(){//返回详情
				uni.navigateTo({
					url:`/pages/details/details?id=${this.numid}`
				})
			},
			tolower(){
				console.log(8888);
				if(this.list.length<this.tags[this.actveindex].count){
					this.page++
					this.getCommentContent()
				}
			}
		},
		mounted() {
			this.getCommentTag()
		},
		onLoad(opotion) {
			this.numid = opotion.id
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.arrow_right {
		width: 30rpx;
		height: 35rpx;
		margin-right: 30rpx;
	}

	.topcomment {
		/* #ifdef MP-WEIXIN */
		margin-top: 47rpx;
		/* #endif */
		position: fixed;
		width: 100%;
		top: 0rpx!important;
		background-color: #FFFFFF !important;
		z-index: 999;
	}

	.tagscomment {
		height: 50rpx;
		padding: 10rpx 20rpx;
		margin: 10rpx;
		border-radius: 20rpx;
		background-color: #FFFBE0;
	}

	.backclor {
		background-color: #F8C55C;
		color: #fff;
	}

	.imgavatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		margin-left: 40rpx;
	}
	.imgwap{
		margin:20rpx 30rpx 20rpx 100rpx;
	}
	.itemimg{
		width: 185rpx;
		height: 185rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}
	.itemtext{
		margin-left:100rpx ;
		margin-right: 30rpx;
	}
</style>
