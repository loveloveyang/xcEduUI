<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item"
                   :to="{path:'/cms/page/add/',query:{ page: this.params.page, siteId: this.params.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
          <el-button @click="preview(page.row.pageId)" type="text" size="small">页面预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布" width="80">
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain @click="postPage(scope.row.pageId)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next"
                   :page-size="this.params.size"
                   @current-change="changePage"
                   :total="total"
                   :current-page="this.params.page"
                   style="float:right;">
    </el-pagination>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'  //.js可以省略
  export default {
    data() {
      return {
        siteList: [],//站点列表
        list: [],
        total: 0,
        params: {
          page: 1,//页码
          size: 10,//每页显示个数
          siteId: '',
          pageAliase: ''
        }
      }
    },
    methods: {
      changePage: function (page) {//形参就是当前页码
        //alert(0);
        this.params.page = page;
        this.query()
      },
      query: function () {
        //alert('查询')
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          //page_list方法执行后.then(res)开始执行，将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      //修改
      edit: function (pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
          query: {page: this.params.page, siteId: this.params.siteId}
        })
      },
      //刪除
      del: function (pageId) {
        this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
          cmsApi.page_del(pageId).then((res) => {
            if (res.success) {
              this.$message({type: 'success', message: '删除成功!'});
              //查询页面
              this.query()
            } else {
              this.$message({type: 'error', message: '删除失败!'});
            }
          })
        })
      },
      preview(pageId) {
        window.open("http://www.xuecheng.com/cms/preview/" + pageId)
      },
      postPage(id) {
        this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
          cmsApi.page_postPage(id).then((res) => {
            if (res.success) {
              console.log('发布页面id=' + id);
              this.$message.success('发布成功，请稍后查看结果');
            } else {
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
        });
      },
    }
    ,
    created() {
      //取出路由中的参数，赋值给数据对象，注意：created钩子方法是在add返回的list页面中调用
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
    }
    ,
    mounted() {
      //DOM渲染完成后调用query
      this.query();
      //初始化站点列表
      this.siteList = [{siteId: '5a751fab6abb5044e0d19ea1', siteName: '门户主站'}, {siteId: '102', siteName: '测试站'}]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
