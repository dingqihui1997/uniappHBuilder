<template>
	<!-- 详情 -->
  <view>
		<view class="zinde">
			<top><template #left>
			<view class="lefticon flex-ja">
				<view  class="imagdeta flex-a"><image src="../../static/icon/left.png" class="deta" @click="back"></image></view>
				<view class="imagdeta  flex-a" ><image src="../../static/xuanx.png" class="deta"></image></view>
			</view>
			</template></top>
		</view>
		<carouselMapList :carousel="carousel" v-if="carousel.length>0"></carouselMapList>
		<price @send="send" :show="show" :goodsInfo="goodsInfo" v-if="Object.keys(goodsInfo).length>0 " :shopTags="shopTags"></price>
		<service :numid="id":services='services' :serviceInfo="serviceInfo" v-if="Object.keys(services).length>0 && Object.keys(serviceInfo).length>0" :shopTags="shopTags"></service>
		<!-- 评价 -->
		<evaluate :numid="id" :tags="tags":content="content" v-if="content.length>0 &&Object.keys(tags).length>0"></evaluate>
		<ask :numid="id"></ask>
		<!-- 为你推荐 -->
		<relevant :numid="id"></relevant>
		<shop :brand="brand" v-if="Object.keys(brand).length>0"></shop>
		<product :introExt="introExt" v-if="Object.keys(introExt).length>0"></product>
		<view style="height: 84rpx;"></view>
		<view class="flex-a w100 gotocart">
			<view class="flex1 flex">
				<view class="flex1 flex-ja">
					<u-icon name="home"label="首页" label-pos='bottom'size="50rpx"></u-icon>
				</view>
				<view class="flex1 flex-ja">
					<u-icon name="chat"label="客服" label-pos='bottom'	size="50rpx"></u-icon>
				</view>
				<view class="flex1 flex-ja shopping">
					<u-icon name="shopping-cart"label="购物车" label-pos='bottom'size="50rpx"></u-icon>
					<u-badge type="error" :count="badge"  :offset='offset'></u-badge>
				</view>
			</view>
			<view class="flex1 flex">
				<view class="flex1 flex-ja cart" @click="(0)">加入购物车</view>
				<view class="flex1  flex-ja cart1"  @click="buy(1)">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import carouselMapList from '../../components/carouselMapList/carouselMapList.vue'
	import price from '../../components/price/price.vue'
	import service from '../../components/service/service.vue'
	import evaluate from '../../components/evaluate/evaluate.vue'
	import ask from '../../components/ask/ask.vue'
	import relevant from '../../components/relevant/relevant.vue'
	import shop from '../../components/shop/shop.vue'
	import product from '../../components/product/product.vue'
  export default {
    components: {carouselMapList,price,service,evaluate,ask,relevant,shop,product},
    props: {},
    data() {
      return {
				id:'',
				carousel:[],//轮播图
				goodsInfo:{},//价格标题等
				shopTags:[],//商品规格
				services:{},//店铺有的服务
				serviceInfo:{},//所有服务
				evaluate:{},//评论
				content:[],//评论内容
				tags:{},//评论详情
				brand:{},//店铺信息
				introExt:[],//产品详情，
				show:false,//控制规格弹窗
				offset:[-10,10],
				num:null,//购物车数量
			}
    },
    methods: {
			getGoodsDetail(){
				this.$api.getGoodsDetail(this.id).then(res=>{
					// console.log(res);
				this.carousel=res.data.goods.carouselMapList//轮播图
				this.goodsInfo=res.data.goods.goodsInfo//价格
				this.$utils.saveHistory({key:'browse',data:this.goodsInfo,attr:'gid'})
				this.shopTags=res.data.goods.shopTags//规格
				this.services=res.data.goods.services
				this.serviceInfo=res.data.serviceInfo
				if(res.data.comment.content){
					this.content=res.data.comment.content
				}
				if(res.data.comment.index){
					this.tags=res.data.comment.index
				}
				// console.log(this.tags);
				this.brand=res.data.goods.brand//店铺信息
				this.introExt=res.data.goods.goodsInfo.introExt
				}).catch(err=>{
					console.log('请求失败',err);
				})
			},
			back(){//回首页
				uni.switchTab({
					url:"/pages/home/home"
				})
			},
			buy(e){//加入购物车0或者立即购买1
				this.show=true
				uni.setStorageSync('falg',e)
			},
			send(val){
				this.show=val
			}
		},
    mounted() {
		this.getGoodsDetail()
		// this.getCommentTag()
    },
    onLoad(option) {
			this.id=option.id
			// console.log(this.id);
    },
    onShow() {
    },
    filters: {},
    computed: {
			  badge() {
						if (this.$store.state.badge == 0) {
						          return "";
						        } else {
						          return this.$store.state.badge;
						        }
			      
			    },
		},
    watch: {},
  }
</script>

<style scoped lang="scss">
.imagdeta{
	width: 90rpx;
	height: 65rpx;
	padding: 20rpx 20rpx;

}
.deta{
	width: 20rpx;
	height: 30rpx;
	margin: 10rpx;
}
.lefticon{
	background-color: rgba(0,0,0,0.3);
	border-radius: 30rpx;
	position: fixed;
	top: 10rpx;
	/* #ifdef MP-WEIXIN */
	margin-top: 47rpx;
	/* #endif */
}
.zinde{
	position: fixed;
	    top: 0;
	    z-index: 999;
}
.cart{
	background-color:#FFA50E;
	height: 84rpx;
	border-top-left-radius: 30rpx;
	border-bottom-left-radius: 30rpx;
	color: #FFFFFF;
}
.cart1{
	background-color:#FF4429;
	height: 84rpx;
	border-top-right-radius:30rpx;
	border-bottom-right-radius:30rpx;
	margin-right: 10rpx;
	color: #FFFFFF;
}
.gotocart{
	width: 100%;
	position: fixed;
	bottom: 0rpx;
	background-color: #FFFFFF;
	padding: 10rpx;
}
.shopping{
	position: relative;
}
</style>
