<template>
	<!-- 每日上新 -->
  <view>
    每日上新
  </view>

</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {
		
    },
    onLoad(options) {
		console.log(this.options);
		this.$api.getNew().then(res=>{
			console.log(res);
		}).catch(err=>{
			console.log('请求失败',err);
		})
		
    },
    onShow() {

    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>

<style scoped lang="scss">

</style>
