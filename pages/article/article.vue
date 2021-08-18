<template>
	<!-- 生活文章详情 -->
  <view>
		<view>
			<u-navbar :border-bottom='false' :background="{background:''}" class="flies"></u-navbar>
		</view>
		<view v-if="pic"><image :src="pic"class="pic"></image></view>
		<view class="flex-sba">
			<view class="flex-ja">
				<view><image :src="author.avatar" class="avatar"></image></view>
				<view class="mal10">{{author.nickname}}</view>
			</view>
			<view class="plus mar30"><u-icon name="plus" label="关注" label-color='#ffffff'	color="#ffffff"></u-icon></view>
		</view>
		<view class="marl30 font16 font-w7 mat20">{{title}}</view>
		<view v-for="(item,index) in resource.blocks" :key="index">
			<view v-for="(keys,val) in resource.entityMap" :key="keys">
				{{item.text}}
			
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
				id:'',
				pic:'',//文章大图
				author:{},//作者信息
				title:'',//标题
				resource:null
			}
    },
    methods: {
		getDetail(){
			this.$api.getDetail(this.id).then(res=>{
				// console.log(res);
				this.pic=res.data.pic
				this.author=res.data.author
				this.title=res.data.title
				// #ifndef H5
				this.resource=res.data.resource
				console.log(this.resource);
				// #endif
				 // #ifdef H5
				  this.resource=JSON.parse(res.data.resource)
					console.log(this.resource);
				 // #endif
				 
			}).catch(err=>{
				console.log('请求失败',err);
			})
		}
		},
    mounted() {
		// console.log(this.id);
		this.getDetail()
    },
    onLoad(option) {
		this.id=option.id
    },
    onShow() {

    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>

<style scoped lang="scss">
.pic{
	width: 100%;
	height: 600rpx;
}
.avatar{
	width: 100rpx;
	height: 100rpx;
	margin-top: 20rpx;
	margin-left: 20rpx;
	border-radius: 100%;
}
.flies{
	position: fixed;
	top: 0;
	z-index: 9999999;
}
.plus{
	background-color: #FFC030;
	border-radius: 30rpx;
	padding: 15rpx 20rpx ;
}
</style>
