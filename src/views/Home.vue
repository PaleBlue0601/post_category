<template>
  <div>
    <div class="container">
      <div class="col-1-4">
        <!-- 分类侧边栏 -->
        <classification :category-list="categoryList" @screenPostList="screenPostList"></classification>
      </div>
      <div class="col-3-4">
        <!-- 文章列表 -->
        <!-- 文章详情页 -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
const Classification = () => import('../components/Classification')
import { request } from '../network/request' //导入网络连接模块
export default {
  name: 'home',
  data() {
    return {
      dataList: [], // 网络请求数据
      categoryList: [], //左边导航栏分类数据
    }
  },
  created() {
    // 请求数据
    this.getData()
  },
  methods: {
    async getData() {
      await request({
        url: 'list',
        method: 'GET'
      }).then(res => {
        this.dataList = res.data.dataList
        // console.log(this.dataList)
        this.getCategoryList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取分类导航栏数据
    getCategoryList() {
      let retList = []
      this.dataList.forEach(item => {
        item.children.forEach(sub_item => {
          let push_obj = {}
          if(item.id < 9) {
            push_obj.id = '0' + item.id
          } else {
            push_obj.id = '' + item.id
          }
          push_obj.content = push_obj.id + item.name + ' | ' + sub_item.name + ' '
          push_obj.count = sub_item.children.length
          push_obj.sub_id = sub_item.id 
          retList.push(push_obj)
        })
      });
      // console.log(retList)
      this.categoryList =  retList
    },
    // 根据sub_id跳转路由
    screenPostList(sub_id) {
      this.$router.push({ 
        path:`/postlist/${sub_id}`
      })
    }
  },
  components: {
    Classification
  }
}
</script>

<style scope>
  .container {
    margin-top: 100px;
    width: 1030px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
  .col-3-4 {
    width: 75%;
  }
  .col-1-4 {
    width: 25%;
  }
</style>