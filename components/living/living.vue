<template>
  <view class="livi">
		<!-- {{list}} -->
		<scroll-view scroll-y="true" style="height:100vh;" @scrolltolower="send">
    <u-waterfall v-model="list" ref="uWaterfall">
    	<template v-slot:left="{leftList}">
    		<view v-for="(item, index) in leftList" :key="index" class="marg-b30 leftList" @click="click(item)">
					<view> <image :src="item.pic" class="listimg"></image></view>
					<view class="font14 font-w7 ">{{item.title}}</view>
					<view class="flex-sba read">
						<view class="flex-a" >
							<view><image :src="item.author.avatar" class="author"></image></view>
							<view class="font12 mal10">{{item.author.nickname}}</view>
						</view>
						<view class="font12 666 nowrap margin-r10">{{item.readingNum}}阅读</view>
					</view>
    			<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
    		</view>
    	</template>
    	<template v-slot:right="{rightList}">
    		<view v-for="(item, index) in rightList" :key="index" class="marg-b40 rightList" @click="click(item)">
    			<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					<view> <image :src="item.pic" class="listimg"></image></view>
					<view class="font14 font-w7">{{item.title}}</view>
					<view class="flex-sba read">
						<view class="flex-a" >
							<view><image :src="item.author.avatar" class="author"></image></view>
							<view class="font12 mal10">{{item.author.nickname}}</view>
						</view>
						<view class="font12 666 nowrap margin-r10">{{item.readingNum}}阅读</view>
					</view>
    		</view>
    	</template>
    </u-waterfall>
		</scroll-view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			list:{
				type:Array,
				required:true
			}
		},
    data() {
      return {
				flowList:[]
			}
    },
    methods: {
			send(){
				this.$emit('send','')
			},
			click(item){
				let url=item.detailUrl
				// #ifdef MP-WEIXIN
				    uni.setClipboardData({
				     data: url,
				     success: function() {}
				    });
				    // #endif
				    // #ifndef MP-WEIXIN
				    window.location.href = url
				    // #endif
				
				// uni.navigateTo({
				// 	url:`/pages/article/article?id=${item.contentId}`
				// })
				console.log(item);
			}
		},
    mounted() {
		// console.log(this.list);
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
	.livi{
		padding-left: 28rpx;
		padding-right: 20rpx;
		margin-top: 30rpx;
	}
.listimg{
	height:260rpx;
	width: 340rpx;
	border-top-right-radius: 10rpx;
	border-top-left-radius: 10rpx;
}
.title1{
	width: 310rpx;
	padding: 20rpx;
}
.author{
	width: 50rpx;
	height: 50rpx;
	border-radius: 100%;
	margin-top: 20rpx;
}
.read{
	width: 340rpx;
}
.rightList::first-child{
	margin-top:20rpx!important;
}
.leftList::first-child{
	margin-top:20rpx!important;
}
</style>
