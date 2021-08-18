import fly from './index.js';


export default {
	// 获取搜索推荐关键词
	// query	string	是
	getSuggest(query) {
		return fly.get(`/Search/suggest?query=${query}`)
	},
	// 获取搜索输入框占位词
	getHotWords() {
		return fly.get("/Search/hotWords")
	},
	// 获取可用优惠券数量
	getCouponCount() {
		return fly.get("/User/couponCount")
	},
	// 更新记录
	// data.type	0新增 1优化 2修复
	getUpdateHistory(type) {
		return fly.get(`/User/updateHistory?type=${type}`)
	},
	// 获取用户优惠券
	// type	string	是	类型 0可用 1不可用
	getCoupon(type) {
		return fly.get(`/User/coupon?type$={type}`)
	},
	// 推荐文章
	// uuid	string	是	当前文章ID
	// page	string	是	页数
	// pageSize	string	是	数据条数
	getSimilarFeed(uuid, page, pageSize) {
		return fly.get(`/Life/getSimilarFeed?uuid=${uuid}&page=${page}&pageSize=${pageSize}`)
	},
	// 文章详情
	// uuid	string	是	文章ID
	getDetail(uuid) {
		return fly.get(`/Life/detail?uuid=${uuid}`)
	},
	// 生活板块
	// tab	string	是	tabID
	// page	string	是	页数
	// pageSize	string	是	数据条数
	getHomeTab(tab, page, pageSize) {
		return fly.get(`/Life/getHomeTab?tab=${tab}&page=${page}&pageSize=${pageSize}`)
	},
	// 生活首页数据
	getBktrSimple() {
		return fly.get("/Life/bktrSimple")
	},
	// 商品详情图
	// gid	string	是
	// title	string	是
	// type	string	是
	getLifeDetailImg(gid, title, type) {
		return fly.get(`/Life/getHomeTab?gid=${gid}&title=${title}&type=${type}`)
	},
	// 分类获取商品列表
	getQueryIdSearch() {
		return fly.post("/Goods/queryIdSearch")
	},
	// 搜索获取商品列表
	getDoSearch() {
		return fly.post("/Goods/doSearch")
	},
	// 视频时长
	// file	string	是
	getGetTime(file) {
		return fly.get(`/Common/getTime?file=${file}`)
	},
	// 获取更多问答列表
	// gid	string	是
	getAskInfo(gid) {
		return fly.get(`/Goods/askInfo?gid=${gid}`)
	},
	// 通过评价标签获取评价列表
	// gid	string	是
	// page	string	是
	// pageSize	string	是
	// tagId	string	是
	getCommentContent(gid, page, pageSize, tagId) {
		return fly.get(`/Goods/commentContent?gid=${gid}&page=${page}&pageSize=${pageSize}&tagId=${tagId}`)
	},
	// 获取更多评价标签
	// gid	string	是
	getCommentTag(gid) {
		return fly.get(`/Goods/commentTag?gid=${gid}`)
	},
	// 详情页推荐商品-排行榜-问答
	// gid	string	是
	getComposeTwo(gid) {
		return fly.get(`/Goods/composeTwo?gid=${gid}`)
	},
	// 获取商品详情图
	// type	string	是
	// gid	string	是
	// title	string	是
	getDetailImg(type, gid, title) {
		return fly.get(`/Goods/detailImg?type=${type}&gid=${gid}&title=${title}`)
	},
	// 商品详情
	// gid	string	是
	getGoodsDetail(gid) {
		return fly.get(`/Goods/detail?gid=${gid}`)
	},
	// 按商品ID查询商品
	// gids	string	是
	getGoodsQueryByGids({
		gids
	}) {
		return fly.post(`/Goods/queryByGids`)
	},
	// 推荐商品
	// type	string	是
	// offset	string	是
	// limit	string	是
	// gid_list	string	是
	getRecommend(offset) {
		return fly.get(`/Goods/recommend?type=7&offset=${offset}&limit=6`)
	},
	// 通过一级分类获取二级分类
	// catId	string	是
	getCategorydetail(catId) {
		return fly.get(`/Category/detail?catId=${catId}`)
	},
	// 一级分类
	getCategorylist() {
		return fly.get("/Category/list")
	},
	// BEST商品列表
	getBestGoods() {
		return fly.post("/HomePage/bestGoods")
	},
	// APP首页数据
	// User-Agent	string	是
	getAppHomeData(Agent) {
		return fly.get(`/HomePage/appHomeData?Agent=${Agent}`)
	},
	// BEST
	getHomePagebest() {
		return fly.get("/HomePage/best")
	},
	// 总榜商品列表
	// offset	string	是
	// limit	string	是
	getTopGoodsList(offset, limit) {
		return fly.get(`/HomePage/topGoodsList?offset=${offset}&limit=${limit}`)
	},
	// 总榜
	getTopList() {
		return fly.get("/HomePage/topList")
	},
	// 直播列表
	getLive() {
		return fly.get("/HomePage/live")
	},
	// 秒杀
	// offset	string	是	数据偏移量（分页）	1
	// limit	string	是	数据条数	10
	// plan_id	string	是	type为1时，传入秒杀计划ID	30384
	// type	string	是	类型，0为秒杀首页，1为列表数据	1
	getSeckill(offset, limit, plan_id, type) {
		return fly.get(`/HomePage/seckill?offset=${offset}&limit=${limit}&plan_id=${plan_id}&type=${type}`)
	},
	// 众筹
	getCrowdfunding() {
		return fly.get("/HomePage/crowdfunding")
	},
	// 每日上新
	getNew() {
		return fly.get("/HomePage/new")
	},
	// 按分类获取首页底部商品列表
	// index	string	是	页数
	// query_id	string	是
	getFeeds(index, query_id) {
		return fly.get(`/HomePage/feeds?index=${index}&query_id=${query_id}`)
	},
	// 首页数据
	getHomeData() {
		return fly.get("/HomePage/homeData")
	},
	// 测试
	getYiyan() {
		return fly.get("/HomePage/yiyan")
	},
	//sortBy: 综合排序传0 销量排序传8  新品传7 价格降序传2 价格升序传1 信用排序传6 
	queryIdSearch(query, sortBy, source) {
		return fly.post('/Goods/doSearch', {
			filter: {
				attr: [],
				brands: [],
				category1: [],
				category2: [],
				category3: [],
				maxPrice: null,
				minPrice: null,
				services: [],
				special: [],
				specialCoupon: [],
				tags: []
			},
			query: query,
			sortBy: sortBy,
			source: source
		})
	},
}
