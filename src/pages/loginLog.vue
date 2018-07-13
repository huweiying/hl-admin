<template>
  <div class = 'loginLog' v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div v-if = '!addOredit'>
        <div class = 'header'>登录日志 <router-link  class='back' to="/index">返回首页</router-link></div>
        <div class = 'main'>
            <div class = 'top'>
                <el-select v-model="enterprise.vaule" placeholder="企业/机构">
                    <el-option
                        v-for="item in enterprise.arr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                    <el-date-picker
                        v-model="dateRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" @change = 'selectTime'>
                    </el-date-picker>
                <div class = 'group'>
                    <el-input placeholder="搜索用户" v-model="logLoginSearchDto.name" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click = 'init'></el-button>
                    </el-input>
             
                </div>
            </div>
                <el-table
                    :data="dataList"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="用户"
                    width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="logDate"
                    label="登录/注销时间"
                    width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="device"
                    label="设备名称"
                     width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="remoteAddr"
                    label="IP地址"
                     width="300px">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="detail(scope.row)"
                            type="text"
                            size="small">
                            查看
                            </el-button>
                        </template>
                        </el-table-column>
                </el-table>
              
                <div style="text-align:center">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
        </div>
    </div>
    <div v-else>
        <!-- 新增编辑模块 -->
        <div class = 'header'>登录日志>查看 <span class='back' @click='back'>返回上级</span></div>
        <div class = 'addMain'>
                <el-form :model="ruleForm" ref="ruleForm"  label-width="120px">
                    <el-row :gutter="100">
                        <el-col :span='12'>
                            <el-form-item label="用户">
                                <el-input type="text" v-model="ruleForm.name" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="登录/注销时间">
                                <el-input type="text" v-model="ruleForm.logDate" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="是否异常">
                                <el-input type="text" v-model="ruleForm.isException" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="异常信息">
                                <el-input type="text" v-model="ruleForm.exception" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="操作设备">
                                <el-input type="text" v-model="ruleForm.device" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="操作浏览器">
                                <el-input type="text" v-model="ruleForm.browser" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="操作IP地址">
                                <el-input type="text" v-model="ruleForm.remoteAddr" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="请求URL" >
                                <el-input type="text" v-model="ruleForm.reqUrl" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="请求服务器地址">
                                <el-input type="text" v-model="ruleForm.serverAddr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style='text-align:center;margin-top:30px'>
                            <el-form-item>
                                <el-button type="primary" @click="back()">返回</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                  
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'loginLog',
  data () {
    return {
      loading:true,
      pageInfo:{
          pageNum:1,
          pageSize:10
      },//分页信息
      total:0,
      dateRange:['',''],
      logLoginSearchDto:{
          'logDateEnd':'',
          'logDateStart':'',
          'name':'',
          'orgId':'',
      },//搜索字段
      addOredit:false,
      search:'',
      enterprise:{
          value:'',
          arr:[]
      },
      dataList:[],
      ruleForm:{},
     
    }
  },
  beforeMount () {

   },
   created(){
       this.init();
   },
   methods:{
       init(){
           this.loading = true;
            this.ajax('/v1/loglogin/getLogLogin','POST',{logLoginSearchDto:this.logLoginSearchDto,pageInfo:this.pageInfo},(res)=>{
                this.total = Number(res.get.total);
                let data = res.get.list.map(v=>{
                    v.logDate = this.fomateDate(v.logDate)
                    return v
                })
                this.dataList = data;
                this.loading = false;
            })
       },
       back(){
           this.addOredit = false;
           this.ruleForm = {};
       },

       deleteData(){//删除
            if(this.multipleSelection.length == 0){
                 this.$message.error('您未选择任何数据');
            }else{//删除数据
                
            }
       },
       detail(row){//查看详情
            row.isException = row.isException == 0 ? '正常' : '异常'; 
            this.ruleForm = row;
            this.addOredit = true;
       },
       addMore(){//添加新的数据
            this.rule.forms.push({
                name:''
            })
       },
       selectTime(){//时间搜索
           if(this.dateRange){
               this.logLoginSearchDto.logDateStart = new Date(this.dateRange[0])
               this.logLoginSearchDto.logDateEnd = new Date(this.dateRange[1])
           }else{//清空
               this.logLoginSearchDto.logDateStart = '';
               this.logLoginSearchDto.logDateEnd = '';
           }
           this.init();
       }
      

   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.loginLog{
  .header{
      border-left: 5px solid #2D3140;
      padding:5px 15px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 16px;
      .back{
          font-size: 14px;
          font-weight: normal;
          color: #aaa;
          margin-left: 15px;
          cursor: pointer;
      }
  }
  .main{
      background: #fff;
      padding:20px;
      margin-top: 20px;
      box-sizing: border-box;
      width: 99%;
      min-height: 800px;
      .top{
          margin-bottom: 10px;
          .group{
              float: right;
          }
      }
  }
  .addMain{
      background: #fff;
      padding:100px 400px;
      margin-top: 20px;
      box-sizing: border-box;
      width: 99%;
      height:100%; 
      .more{
          color:#0083FF;
          font-size: 14px;
          margin: 20px 0;
          margin-left: 100px;
          cursor: pointer;
          i{
              width: 15px;
              height: 15px;
              display: inline-block;
              border: 1px solid #ccc;
              border-radius: 50%;
              text-align: center;
              color: #aaa;
              margin-left: 5px;
              vertical-align: middle;
          }
      }
  }
  .box{
      p{
          line-height: 20px;
          padding-left: 20px;
      }
  }
}
</style>
