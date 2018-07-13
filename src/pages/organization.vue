<template>
  <div class = 'organization' v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <div v-if="!addOrEdit">
      <div class = 'header'>组织机构管理 <router-link  class='back' to="/index">返回首页</router-link></div>
        <div class = 'top'>
                    <el-input placeholder="请输入内容" v-model="config.name" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div class = 'group'>
                        <el-button type="primary" @click="addItem">新增</el-button>
                        <el-button type="primary">EXCEL导出</el-button>
                        
                    </div>
        </div>
        <div class = 'nav'>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
        </div>
        <div class = 'main'>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple left">
                        <div class = 'title'>系统后台</div>
                        <div class = 'treeBox'>
                            <el-tree :data="dataList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                        </div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple right">
                        <div class = 'title'>编辑</div>
                        <div class = 'form'>
                    <el-form :model="ruleForm"  label-width="120px">
                        <el-form-item label="组织/机构名称" prop="name" >
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="所属区域" prop="name">
                            <el-input v-model="ruleForm.areaId"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="父级名称" prop="pid" disabled>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item> -->
                        <el-form-item label="编号" prop="name">
                            <el-input v-model="ruleForm.code"></el-input>
                        </el-form-item>
                        <el-form-item label="主负责人" prop="name" >
                            <el-input v-model="ruleForm.name" class = 'sub' placeholder="请输入职位"></el-input>
                            <el-autocomplete
                                class="inline-input"
                                v-model="state2"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </el-form-item>
                        <div v-for="(item,i) in ruleForm.sub_leader" :key='i'>
                            <el-form-item label="副负责人" prop="sub_leader" >
                                <el-input v-model="item.position" class = 'sub' placeholder="请输入职位"></el-input>
                                    <el-autocomplete
                                        class="inline-input"
                                        v-model="item.name"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入姓名"
                                        :trigger-on-focus="false"
                                        @select="handleSelect"
                                    ></el-autocomplete>
                            </el-form-item>
                        </div>
                        <a @click.prevent = 'addMore' class = 'addMore'>继续添加副负责人</a>
                        <el-form-item style = 'margin-top:20px'>
                            <el-button type="danger" @click="deleteItem">删除</el-button>
                            
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-form-item>
                    </el-form>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
      </div>
      <div v-if="addOrEdit">
          <div class = 'header'>组织机构管理>新增/编辑组织机构 <span class='back' @click='back'>返回上级</span></div>
          <div class = 'addBox'>
              <el-form :model="addForm"  label-width="120px">
                  <el-row :gutter="20">
                      <el-col :span="12">
                            <el-form-item label="组织/机构名称" prop="fullName" :rules="{required: true, message: '请输入组织/机构名称', trigger: 'blur'}">
                                <el-input v-model="addForm.fullName"></el-input>
                            </el-form-item>
                        <!-- <el-form-item label="所属区域" prop="areaId">
                            <el-cascader
                                :options="area"
                                @active-item-change="handleArea"
                                v-model="addForm.areaId"
                            ></el-cascader>
                        </el-form-item> -->
                        <el-form-item label="父级" prop="pid"  :rules="{required: true, message: '请选择父级', trigger: 'blur'}">
                            <el-cascader
                            :options="dataList"
                            :show-all-levels="false"
                            v-model="addForm.pid"
                            @change="handleFather">
                        </el-cascader>
                        </el-form-item>
                        <el-form-item label="编号" prop="code"  :rules="{required: true, message: '请输入编码', trigger: 'blur'}">
                            <el-input v-model="addForm.code"></el-input>
                        </el-form-item>
                        <el-form-item label="主负责人" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="办公电话" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        </el-col>
                      <el-col :span="12">
                          <div v-for="(item,i) in addForm.sub_leader" :key='i' style='margin-bottom:50px'>
                            <el-form-item label="副负责人" prop="sub_leader">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="sub_leader">
                                <el-input v-model="item.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="办公电话" prop="sub_leader">
                                <el-input v-model="item.tel"></el-input>
                            </el-form-item>
                          </div>
                          <a @click.prevent='addSub' class='addSub'>继续添加副负责人</a>
                      </el-col>
                  </el-row>
                       <el-row>
                           <el-col>
                               <el-form-item style = 'margin-top:20px' class='submit'>
                                    <el-button type="primary" @click="onSubmit">保存</el-button>
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
  name: 'organization',
    data () {
    return {
      pageInfo:{
          pageNum:1,
          pageSize:10
      },//分页信息
      total:0,
      config:{'name':''},//搜索字段
      loading:true,
      item:{},//选中对象
      addOrEdit:false,
      dataList:[],//数据列表
      mult:false,//是否多选
      isEdit:'',
      enterprise:{
          value:'',
          arr:[]
      },
      addForm:{
          fullName:'',
          name:'',
          code:''
      },
      ruleForm:{
          
      },
      emptyList:false,
      defaultProps:'',
      querySearch:'',
      state2:'',
      multipleSelection: []//选中的数据
    }
  },

   created(){
       this.init();
   },
   methods:{
      handleSelect(){},
      deleteItem(){},
      fetchSuggestions(){},     
      traverseDF(item,idx,arr){
        if(item){
            let obj = {};
            obj.label = item.fullName;
            obj.detail = item;
            obj.value = item.code;
            obj.children = null;
            arr.push(obj)
            if(item.chidren){
                arr[idx].children = [];
                for(var i=0;i<item.chidren.length;i++){
                    this.traverseDF(item.chidren[i],i,arr[idx].children);
                } 
            }else{
                return 
            }
        }
      },
       init(){
           this.loading = true;
           this.ajax('v1/org/getOrgCategory','GET','',(res)=>{
               let data = [];
               res.data.forEach((v,i)=>{
                   this.traverseDF(v,i,data)
               })
               this.ruleForm = res.data[0];
               this.dataList = data;
               this.loading = false;
           })
       },
       handleNodeClick(data) {//获取列表详情
        this.ruleForm = data.detail;
        this.ajax('/v1/org/getOrgUList/'+data.detail.ssoId,'GET','',(res)=>{
            let priObj = {};
            let subArr = [];
            res.data.forEach((v)=>{
                if(v.primaryStaff){//主负责人
                    priObj = v
                }else{
                    subArr.push(v)
                }
            })
            
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
                        this.$message({
                            message: '新增数据成功',
                            type: 'success'
                        });
                        this.back();
                        this.init();
                        this.isEdit = '';
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
           this.addOrEdit = false;
           this.isEdit = '';
       },
       addItem(type){
        //    if(type == 0){//新增同级

        //    }else{//新增子级

        //    }
           this.addOrEdit = true
           console.log(this.addOrEdit)

       },
       handleArea(){//选择所属区域

       },
       handleFather(){//选择父级

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
                this.multipleSelection = [];
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
            this.addOredit = true
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
          this.multipleSelection = [];
          this.pageInfo.pageNum = 1;
          this.config.isDel = 1;
          this.init()
      },
      handleEmpty(type){
          if(type == 0){//清空
            if(this.multipleSelection.length == 0){
                this.$message.error('您未选择任何数据');
                return
            }
             this.$confirm('一旦删除将无法恢复数据，确认继续执行？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {}
                data.array = this.multipleSelection.map((v)=>{return v.ssoId})
                this.ajax('/v1/config/delConfigs','DELETE',data,(res)=>{
                    this.multipleSelection = [];
                    this.$message({
                        message: '您成功操作'+res.effectRow+'条数据',
                        type: 'success'
                    });
                    this.init();
                })
            }).catch(() => {
                this.multipleSelection = [];
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
          }else{//返回
            this.emptyList = false;
            this.config.isDel = 0;
            this.pageInfo.pageNum = 1;
            this.init();
          }
      },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

.organization{
    .header{
      border-left: 5px solid #2D3140;
      padding:5px 15px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    .back{
          font-size: 14px;
          font-weight: normal;
          color: #aaa;
          margin-left: 15px;
      }
  }
      .el-input{  
          width: 65%;
            margin-right:20px; 
      }
      .top{
          margin-bottom: 10px;
          float:right;
          margin-right: 20px;
          width: 35%;
          .group{
              float: right;
          }
      }
  .nav{
      margin: 15px 0px;
      cursor: pointer;
  }
  .main{
      width: 99%;
      .left{
          background: #fff;
          height: 700px;
          margin-right:20px; 
          .title{
              height: 40px;
              line-height: 40px;
              background: linear-gradient(to right,#2D3140,#6A6A6A);
              color:#fff;
              padding: 0 20px;
          }
          .treeBox{
              padding:50px 40px;
              box-sizing: border-box;
          }
      }
      .right{
          background: #fff;
          height: 700px;
          .title{
              height: 40px;
              line-height: 40px;
              background: linear-gradient(to right,#2D3140,#6A6A6A);
              color:#fff;
              padding: 0 20px;
          }
          .form{
              margin: 60px auto;
              width:40%;
              .sub{  
                width: 25%;
                margin-right:20px; 
             }
          }
          .addMore{
              font-size: 14px;
              margin: 20px 120px;
              cursor: pointer;
          }
      }

  }
  .back{
      cursor: pointer;
  }
  .addBox{
      background: #fff;
      width: 99%;
      height: 800px;
      box-sizing: border-box;
      padding:60px 150px;
      .addSub{
          font-size: 14px;
          margin: 0px 120px;
          cursor: pointer;
      }
      .el-cascader{
          width: 100%;
      }
      .submit .el-form-item__content{
          text-align: center;
      }
  }
}
</style>
