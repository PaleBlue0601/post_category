<template>
  <div class="content_container">
    <div class="post" v-for="(item, index) in postList" :key="index">
      <h1 class="post-title">
        <a href="">{{item['post-title']}}</a>
      </h1>
      <div class="post-meta">
        <i class="fa fa-calendar" aria-hidden="true"> {{item['post-time']}}</i>
      </div>
      <div class="post-content">{{item['post-description']}}</div>
      <div class="readmore">
        <a href="javascript:(0);" @click="toPost(item.sub_id, item.post_id)">阅读全文 <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../network/request'
export default {
  name: 'PostList',
  props: ['sub_id'], //接受路由参数
  data() {
    return {
      dataList: [],
      postList: [] //文章列表数据
    }
  },
  created() {
    // 请求数据
    this.getData()
  },
  // 组件路由守卫，更新改组件时触发
  beforeRouteUpdate (to, from, next) {
    // console.log(to.params.sub_id)
    this.getPostList(to.params.sub_id)
    next()
  },
  methods: {
    async getData() {
      await request({
        url: 'list',
        method: 'GET'
      }).then(res => {
        this.dataList = res.data.dataList
        // console.log(this.dataList)
        this.getPostList(this.sub_id)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取文章列表数据 根据sub_id筛选数据 sp：当sub_id=0时获取全部文章列表数据
    getPostList(sub_id) {
      let retList = []
      this.dataList.forEach(item => {
        item.children.forEach(child => {
          // console.log(sub_id, child.id, sub_id === child.id)
           if(sub_id == child.id || sub_id == '0'){
             child.list.forEach(post_item => {
              post_item.sub_id = child.id //记录父级sub_id
              retList.push(post_item)
            })
           }
        })
      })
      // console.log(retList)
      this.postList = retList
    },
    // sub_id传递属性中的父级id
    toPost(sub_id, post_id) {
      this.$router.push({ 
        path:`/post/${sub_id}/${post_id}`
      })
    }
  },
}
</script>

<style scoped>
  .content_container {
    padding-left: 50px;
    padding-top: 20px;
  }
  .post {
    margin: 20px 20px;
    padding: 25px 0 15px;
  }
  .post .post-title {
    margin: 0;
    color: #555;
    text-align: left;
    margin-bottom: 10px;
  }
  .post .post-meta {
    padding: 0;
    margin: 15px 0 0;
    color: #6e7173;
    display: inline;
    text-indent: 0.15em;
  }
  .post .post-content {
    clear: left;
    font-size: 15px;
    line-height: 1.77;
    color: #444;
    padding-top: 15px;
    text-align: justify;
    text-justify: distribute;
    word-break: normal;
  }
  .readmore a {
    font-size: 14px;
    color: #444;
    margin: -10px 0;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    float: right;
  }
</style>