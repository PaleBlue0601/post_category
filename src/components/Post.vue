<template>
  <div class="col-3-4 realPost">
    <h1 class="post-title">{{postObj['post-title']}}</h1>
    <p class="post-description">{{postObj['post-description']}}</p>
    <div class="post-meta">
      <i class="fa fa-calendar" aria-hidden="true"> {{postObj['post-time']}}</i>
    </div>
    <div class="post-content">
      <!-- mavon-editor第三方md解析器 -->
      <!-- 
        :toolbarsFlag="false"：隐藏工具栏
        :editable="false"：不能编译
        boxShadowStyle="0 0 0 0"：阴影样式
        :subfield="false":单栏(编辑预览分屏)
        defaultOpen="preview"：默认展示预览区域
      -->
        <mavon-editor 
          v-model="mdHtml" 
          :toolbarsFlag="false"
          :editable="false"
          :subfield="false"
          boxShadowStyle="0 0 0 0"
          defaultOpen="preview"/>
    </div>
  </div>
</template>

<script>
import { request } from '../network/request'
export default {
  name: 'post',
  props: ['post_id','sub_id'],
  data() {
    return {
      dataList: [],
      postObj: [], //单个文章数据对象
      mdHtml: '' //md格式数据
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
        this.getPostObj()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取文章对象，使用sub_id和post_id确定目标对象
    getPostObj() {
      // console.log(this.sub_id, this.post_id)
      this.dataList.forEach(item => {
        item.children.forEach(child => {
          if(this.sub_id == child.id){
            child.list.forEach(sub_item => {
              if(this.post_id == sub_item.post_id) {
                this.postObj = sub_item
              }
            })
          }
        })
      })
      this.mdHtml = this.postObj['post-content']
    },
  },
}
</script>

<style scope>
  .realPost {
    max-width: 680px;
    margin: 20px auto;
    padding: 25px 0 15px;
  }
  .col-3-4 {
    width: 75%;
  }
  .realPost .post-title{
    margin: 0;
    color: #555;
    text-align: left;
    font: bold 2em/1.1 "ff-tisa-web-pro", Cambria, "Times New Roman", Georgia, Times, sans-serif;
    font-family: cursive, Baskerville;
    font-weight: bold;
  }
  .realPost .post-description {
    color: #757575;
    font-family: "TIBch", "Classic Grotesque W01", "Helvetica Neue", Arial, "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    margin: 14px 0;
  }
  .realPost .post-meta {
    padding: 0;
    margin: 15px 0 0;
    color: #6e7173;
    display: inline;
    text-indent: 0.15em;
  }
  .realPost .post-content {
    clear: left;
    font-size: 16px;
    line-height: 1.77;
    color: #292929;
    padding-top: 15px;
    text-align: justify;
    text-justify: distribute;
    word-break: normal;
  }
</style>