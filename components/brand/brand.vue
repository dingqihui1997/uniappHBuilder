<template>
	<!-- 品牌日图片 -->
  <view class="brand">
	  <view class="brandimg"><image :src="brand.pic_url" class="img100"></image></view>
	  <view class="brandimg"><image :src="brand1.image" class="img100"></image></view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		brand:{
			type:Object,
			required:true
		},
		brand1:{
			type:Object,
			required:true
		}
	},
    data() {
      return {}
    },
    methods: {},
    mounted() {
		// console.log(this.brand);
		// console.log(this.brand1);
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
.brandimg{
	width: 96%;
	margin-left: 20rpx; 
	margin-right: 20rpx;
	height: 180rpx;
}
.brand{
	font-size: 0px;
}
</style>
