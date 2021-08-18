<template>
	<!-- 详情轮播图 -->
	<view>
		<swiper class="img_img"  indicator-dots="true" interval="2000"
			duration="500" aspectFit="true" circular="true">
			<swiper-item v-if="video!=''">
				<video :src="video" id="myVideo" style="width: 100%; height: 100%;" controls='false' loop='true'
					autoplay='true'></video>
			</swiper-item>
			<swiper-item v-for="(item,index) in image_list" :key="index">
				<image :src="item.url" class="img_img"></image>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			carousel: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				video: '',
				image_list: ''
			}
		},
		methods: {
			 getFileType(fileName) {
						    // 后缀获取
						    let suffix = '';
						    // 获取类型结果
						    let result = '';
						    try {
						      const flieArr = fileName.split('.');
						      suffix = flieArr[flieArr.length - 1];
						    } catch (err) {
						      suffix = '';
						    }
						    // 图片格式
						    const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
						    // 进行图片匹配
						    result = imglist.find(item => item === suffix);
						    if (result) {
						      return 'image';
						    }
						    // 匹配 视频
						    const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
						    result = videolist.find(item => item === suffix);
						    if (result) {
						      return 'video';
						    }
						  }
	},
	mounted() {
			// console.log(this.carousel);
			let p1 = this.carousel[0].url
					// console.log(p1);
					// console.log(this.getFileType(p1))
					if (this.getFileType(p1) == 'video') {
						this.video = p1 
						this.image_list = this.carousel.filter(item => this
							.getFileType(item.url) != 'video')
					} else {
						this.image_list =this.carousel
					}
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
.img_img{
	width: 750rpx;
	height: 550rpx;
}
</style>
