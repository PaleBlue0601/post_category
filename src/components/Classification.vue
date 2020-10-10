<template>
  <div class="sidebar">
    <div class="widget">
      <div class="widget-title">
        <i class="fa fa-folder-o" aria-hidden="true"> 分类</i>
      </div>
      <ul class="category-list">
        <li class="category-list-item" v-for="(item, index) in categoryList" :key="index">
          <a class="category-list-link" href="javascript:(0);" @click="screen(item.sub_id)">{{item.content}}</a>
          <span>({{item.count}})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Classification',
  props:['categoryList'],
  methods: {
    screen(sub_id) {
      // console.log(sub_id)
      // 自定义方法，传递sub_id参数
      this.$emit('screenPostList', sub_id)
    }
  }
}
</script>

<style scope>
  .sidebar {
    border-right: 1px solid #ddd;
    padding-right: 35px;
    margin-top: 40px;
    padding-bottom: 20px;
  }
  .widget {
    margin: 30px 0;
  }
  .widget ul {
    list-style: none;
    padding: 0;
  }
  .widget .widget-title {
    color: #6e7173;
    line-height: 2.7;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
  }
  .widget ul li {
    margin: 10px 0;
    line-height: 1.5;
  }
  .widget .category-list-item *{
    color: #6e7173;
  }
</style>