<template>
	<!-- 详情问答 -->
  <view>
    <view class="flex-sb  marl30" @click="goto" v-if="list.length>0">
			<view class="font-w7 font16">问大家({{list.length}})</view>
			<view>
					<image src="../../static/icon/arrow_right.png" mode="" class="arrow_right"></image>
			</view>
		</view>
		<view v-for="(item,index) in list" :key="index" >
			<view class="flex-sb">
				<view class="flex-a">
					<view><image src="../../static/icon/ask_question.png" class="question"></image></view>
					<view class="itemask overflow">{{item.ask}}</view>
				</view>
				<view class="flex-a mar30 a0a0">{{item.reply_total}}回答</view>
			</view>
		</view>
	</view>

</template>

<script>
  export default {
    components: {},
    props: {
			numid: {
				type: String,
				required: true
			}
		},
    data() {
      return {
				list:[]
			}
    },
    methods: {
			getAskInfo(){
				this.$api.getAskInfo(this.numid).then(res=>{
					// console.log(res);
					if(res.data.list){
						this.list=res.data.list.slice(0,2)
					}
					// console.log(this.list);
				}).catch(err=>{
					console.log("请求失败",err);
				})
			},
			goto(){
				uni.navigateTo({
					url:`/pages/askeveryone/askeveryone?id=${this.numid}`
				})
			}
		},
    mounted() {
		this.getAskInfo()
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
	.arrow_right {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
	}
	.question{
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	.itemask{
		width: 480rpx;
	}
</style>
