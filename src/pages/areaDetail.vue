<template>
  <div class = 'areaDetail'>
    <div v-if = '!addOredit'>
        <div class = 'header'>区域管理 <router-link  class='back' to="/index">返回首页</router-link></div>
        <div class = 'main'>
            <div class = 'top'>
                <el-input placeholder="请输入配置名称" v-model="config.name" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
                </el-input>
                <div class = 'group'>
                    <el-button type="primary" @click='addNew'>新增</el-button>
                    <el-button type="danger" @click ='deleteData'>删除</el-button>
                    <el-button type="primary">启用</el-button>
                </div>
            </div>
                <el-table
                    ref="multipleTable"
                    :data="data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="省"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="市"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="区/县"
                    width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="街道/乡/镇"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="编号"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="状态"
                    :filters="[{ text: '已启用', value: 0 }]"
                    :filter-method='selState'
                    :formatter='formatState'
                    :filter-multiple='mult'
                    width="200">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="edit(scope.$index)"
                            type="text"
                            size="small">
                            编辑
                            </el-button>
                        </template>
                        </el-table-column>
                </el-table>
              
                <div style="text-align:center">
                    <el-pagination
                        :page-size="pageInfo.pageSize" @current-change = 'page'
                        layout="prev, pager, next"
                        :current-page="pageInfo.pageNum"
                        :total="total">
                    </el-pagination>
                </div>
        </div>
    </div>
    <div v-else>
        <!-- 新增编辑模块 -->
        <div class = 'header'>区域管理>新增/编辑 <span class='back' @click='back'>返回上级</span></div>
        <div class = 'addMain'>
                <el-form  label-width="100px">
                <div  v-for="(item,i) in rule.forms" style='margin-bottom:60px' :key = 'i'>
                    <el-form-item label="省" :prop="item.name" :rules="{required: true, message: '省不能为空', trigger: 'blur'}">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="市" prop="name"  :rules="{required: true, message: '市不能为空', trigger: 'blur'}">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="区/县" prop="name"  :rules="{required: true, message: '区/县不能为空', trigger: 'blur'}">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="乡/镇/街道" prop="name"  :rules="{required: true, message: '乡/镇/街道不能为空', trigger: 'blur'}">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="name"  :rules="{required: true, message: '编号不能为空', trigger: 'blur'}">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                    <div class = 'more' @click='addMore'>
                        <span>继续添加</span> <i>+</i>
                    </div>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'areaDetail',
    data () {
    return {
      pageInfo:{
          pageNum:1,
          pageSize:10
      },//分页信息
      total:0,
      config:{'name':''},//搜索字段
      addOredit:false,
      dataList:[],//数据列表
      mult:false,//是否多选
      isEdit:'',
      enterprise:{
          value:'',
          arr:[]
      },
      ruleForm:{
          name:'',
          dcCategroy:'',
          key:'',
          value:'',
          appId:''
      },
      emptyList:false,
      multipleSelection: []//选中的数据
    }
  },
  beforeMount () {

   },
   created(){
       this.init();
   },
   methods:{
       init(){
           this.ajax('v1/config/getConfigs','POST',{config:this.config,pageInfo:this.pageInfo},(res)=>{
               this.dataList = res.configs.list;
               this.total = Number(res.configs.total);
           })
       },
       selState(value,row){//选择的状态  停用启用等
            return row.isUse == value
       },
       formatState(row){//状态过滤器
           if(row.isUse == 0){
               return '已启用'
           }else if(row.isUse){
               return '已停用'
           }
       },
       onSubmit(formName){//编辑新增提交
          this.$refs[formName].validate((valid) => {
          if (valid) {//验证通过
                if(this.isEdit != ''){//编辑
                    this.ajax('/v1/config/updateConfig/'+this.isEdit,'PATCH',this.ruleForm,(res)=>{
                        this.$message({
                            message: '您成功操作'+res.effectRow+'条数据',
                            type: 'success'
                        });
                        this.back();
                        this.init();
                        this.isEdit = '';
                    })
                }else{//新增
                    this.ajax('/v1/config/saveConfig','POST',this.ruleForm,(res)=>{
                        // console.log(res)
                        this.$message({
                            message: '新增数据成功',
                            type: 'success'
                        });
                        this.back();
                        this.init();
                    })
                }
          } else {//错误
            return false;
          }
        });
       },
       search(){
           this.pageNum = 1;
           this.init();
       },
       back(){
           this.addOredit = false
       },
       addNew(){//新增 编辑
           this.addOredit = true
       },
       option(type){//删除
            if(this.multipleSelection.length == 0){
                this.$message.error('您未选择任何数据');
                return
            }
            let data = {
                array:[],
            }
            let msg = '';
            data.array = this.multipleSelection.map((v)=>{return v.ssoId})
            if(type == 0){//启用
                data.isUse = 0;
                msg = '确认启用该数据？'
            }else if(type == 1){//停用
                data.isUse = 1;
                msg = '确认停用该数据？'
            }else if(type == 2){
                data.isDel = 1;
                msg = '确认删除该数据？'
            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ajax('/v1/config/updateConfig','PATCH',data,(res)=>{
                    this.$message({
                        message: '您成功操作'+res.effectRow+'条数据',
                        type: 'success'
                    });
                    this.multipleSelection = [];
                    this.init();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
            
       },
       edit(row){//编辑
            this.ruleForm.dcCategroy = row.dcCategroy;
            this.ruleForm.key = row.key;
            this.ruleForm.value = row.value;
            this.ruleForm.name = row.name;
            this.isEdit = row.ssoId;//切换编辑状态
            this.addNew()
       },
      toggleSelection(rows) {//选择的行数
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {//多选框
        this.multipleSelection = val;
      },
      page(i){
          this.pageInfo.pageNum = i
          this.init();
      },
      empty(){//清空操作
          this.emptyList = true;
          this.pageInfo.pageNum = 1;
          this.config.isDel = 1;
          this.init()
      },
      handleEmpty(type){
          if(type == 0){//清空
                
          }else{//返回
            this.emptyList = false;
            this.config.isDel = 0;
            this.pageInfo.pageNum = 1;
            this.init();
          }
      }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

.areaDetail{
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
      }
  }
  .main{
      background: #fff;
      padding:20px;
      margin-top: 20px;
      box-sizing: border-box;
      width: 99%;
      min-height: 800px;
    //   height:100%;
      .el-input{
          width: 15%;
      }
      .top{
          margin-bottom: 10px;
          .group{
              float: right;
          }
      }
  }
  .addMain{
      background: #fff;
      padding:100px 600px;
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
}
</style>
