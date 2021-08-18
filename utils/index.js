//模块化导入和导出

export default {
    // 检测用户是否登录了
    //next函数需要的参数item
    // checkLogin({ key, next, item }) {
    //     //检测本地是否有登录有没有登录
    //     let user = wx.getStorageSync(key)//本地储存
    //     if (user) {//已经登录，继续下一步操作
    //         next(item)
    //     } else {
    //         //没登录提示用户
    //         Dialog.confirm({
    //             title: '检测到您未登录',
    //             message: '是否立即登录？',
    //         })
    //             .then(() => { //点击确定跳登录
    //                 router.push('/register')
    //             })
    //             .catch(() => {//取消操作
    //                 // on cancel
    //             });
    //     }
    // },
    // 储存记录(浏览记录browse，搜索记录search)
    // key:储存的历史
    // attr:判断元素是否存在的属性名
    saveHistory({
           key,
           data,
           attr
       }) {
           // 如果是其余的数据 判断的属性可能就不叫name了
   
           // 拼接一个名字
           let name = key + 'History'
           let history = uni.getStorageSync(name)
           if (history) {
               // 之前已经存储过了
               let arr = (uni.getStorageSync(name))
               // 检测数据是否已经存在
               let item = null
               if (typeof data === 'string') {
                   item = arr.find(i => {
                       return i[attr] === data
                   })
               } else {
                   item = arr.find(i => {
                       return i[attr] === data[attr]
                   })
               }
               // 数组当中没有当前数据
               if (!item) {
                   if (typeof data === 'string') {
                       let obj = {
                           [attr]: data
                       }
                       arr.unshift(obj)
                   } else {
                       arr.unshift(data)
                   }
                   uni.setStorageSync(name, arr)
               }
           } else {
               // 第一次存储
               // 把存储的数据都转换成对象
               let arr = []
               if (typeof data === 'string') {
                   let obj = {
                       name: data
                   }
                   arr.unshift(obj)
               } else {
                   arr.unshift(data)
               }
               uni.setStorageSync(name, arr)
           }
       },
       // 获取存储记录
       getHistory({
           key
       }) {
           let name = key + 'History'
           let arr = uni.getStorageSync(name)
           if (arr) return arr
           else return null
       },
			 Clearsingle({key,data,attr}){//清除单个收藏
				 let name = key + 'History'
				 let arr=uni.getStorageSync(name)
				 let num=	arr.filter(item=>{
				 		return item[attr] !== data[attr]
				 	})
				 	if(arr.length>0){
				 		uni.setStorageSync('CollectionHistory',num)
				 	}else{
						uni.removeStorageSync('CollectionHistory')
					}
			 }
}