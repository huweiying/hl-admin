<template>
    <div class = 'userGroup'  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <div v-if = '!addOredit'>
        <div class = 'header'>用户组管理 <router-link  class='back' to="/index">返回首页</router-link></div>
        <div class = 'main'>
            <div class = 'top'>
                <el-select v-model="enterpriseArr" placeholder="企业/机构">
                    <el-option
                    v-for="item in enterpriseArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="搜索用户组名称" v-model="userGroup.name" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click='init'></el-button>
                </el-input>
                <div class = 'group'>
                    <div v-if='!emptyList'>
                        <el-button type="primary" @click='addNew(0)'>新增</el-button>
                        <el-button type="primary" @click='option(0)'>启用</el-button>
                        <el-button type="warning" @click='option(1)'>停用</el-button>
                        <el-button type="danger" @click ='option(2)'>删除</el-button>
                        <el-button type="primary" @click ='empty'>回收站</el-button>
                    </div>
                    <div  v-if='emptyList'>
                        <el-button type="warning" @click ='handleEmpty(1)'>恢复</el-button>
                        <el-button type="danger" @click ='handleEmpty(0)'>清空</el-button>
                        <el-button type="primary" @click ='handleEmpty(2)'>返回</el-button>
                    </div>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="dataList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="用户组名称"
                    width="450px">
                    </el-table-column>
                    <el-table-column
                    prop="remarks"
                    label="用户组描述"
                    width="400px">
                    </el-table-column>
                    <el-table-column
                    prop="isUse"
                    label="状态"
                    :filters="[{ text: '已启用', value: 0 }, { text: '已停用', value: 1 }]"
                    :filter-method='selState'
                    :formatter='formatState'
                    :filter-multiple='mult'
                     width="100px">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="edit(scope.row)"
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
          <!-- 新增 -->
          <div class = 'header'>用户组管理>新增/编辑 <a  class='back' @click = 'back'>返回上级</a></div>
          <div class = 'adduserGroup'>
              <el-form ref="editForm" :model="editForm" label-width="120px">
                <el-form-item label="用户组名称" :rules="{required: true, message: '请输入用户组名称', trigger: 'blur'}">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="用户组描述" :rules="{required: true, message: '请输入用户组描述', trigger: 'blur'}">
                    <el-input type="textarea" v-model="editForm.remarks"></el-input>
                </el-form-item>
                <el-form-item v-if='!isEdit'>
                    <div class = 'box'>
                        <el-row >
                            <el-col :span = '16'  style = 'border:1px solid #ccc;min-height:300px;'>
                                <p>待选人员</p>
                                <el-tree
                                    :data="data2"
                                    show-checkbox
                                    default-expand-all
                                    node-key="id"
                                    ref="tree"
                                    highlight-current
                                    :props="defaultProps">
                                </el-tree>
                            </el-col>
                            <el-col :span = '6' style = 'border:1px solid #ccc;min-height:300px;margin-left:20px;'>
                                <p>已选人员</p>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                    <div>

                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('editForm')">立即创建</el-button>
                    <el-button @click='back'>取消</el-button>
                </el-form-item>
              </el-form>
          </div>
      </div>
    </div>
</template>

<script>
    
export default {
  name: 'userGroup',
  data () {
    return {
     pageInfo:{
          pageNum:1,
          pageSize:10
     },//分页信息
     total:0,
     userGroup:{
         isDel:0,
         name:null,
     },//搜索字段
     dataList:[],//总表
     mult:false,
     isEdit:'',//是否编辑
     loading:true,
     addOredit:false,
     emptyList:false,
     multipleSelection: [],//选中的数据
     editForm:{
         name:'',
         remarks:'',
     },
     
     enterpriseArr:[
         {label:'',value:'1'},
         {label:'',value:'2'},
         {label:'',value:'3'}
     ],
     state:'',
     stateArr:[
         {label:'',value:'1'},
         {label:'',value:'2'},
         {label:'',value:'3'}        
     ],
     data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        multipleSelection: []//选中的数据
    }
  },
  created(){
     this.init();
  },
  mounted () {


   },
   updated(){

   },
   methods:{
        init(){
            this.loading = true;
           (this.userGroup.name == '') && (this.userGroup.name = null)
           this.ajax('v1/usergroup/findUsergroup','POST',{userGroup:this.userGroup,pageInfo:this.pageInfo},(res)=>{
               this.dataList = res.get.list;
               this.total = Number(res.get.total);
               this.loading = false;
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
                console.log(this.isEdit)
                let data ={};
                data.name = this.editForm.name;
                data.remarks = this.editForm.remarks;
                data.ssoId = this.isEdit.ssoId;
                data.updateId = this.getUserId();
                    this.ajax('/v1/usergroup/usergroup','PATCH',data,(res)=>{
                        this.$message({
                            message: '您成功操作'+res.get+'条数据',
                            type: 'success'
                        });
                        this.back();
                        this.init();
                        this.isEdit = '';
                    })
                }else{//新增
                    this.ajax('/v1/usergroup/usergroup','POST',Object.assign({},this.editForm,{createId:this.getUserId()}),(res)=>{
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
           this.addOredit = false;
           this.isEdit = '';
       },
       addNew(){//新增
            for(let i in this.editForm){
                this.editForm[i] = ''
            }
           this.addOredit = true
       },
       option(type){//删除
            if(this.multipleSelection.length == 0){
                this.$message.error('您未选择任何数据');
                return
            }
            let data = {
                strings: this.multipleSelection.map((v)=>{return v.ssoId}),
                useDelete:null,
            }
            let msg = '';
            if(type == 0){//启用
                data.useDelete = 2;
                msg = '确认启用该数据？'
            }else if(type == 1){//停用
                data.useDelete = 1;
                msg = '确认停用该数据？'
            }else if(type == 2){//软删除
                data.useDelete = 3;
                msg = '确认删除该数据？'
            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ajax('v1/usergroup/setUseDelete','POST',data,(res)=>{
                    this.$message({
                        message: '您成功操作'+res.get+'条数据',
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
            this.editForm.remarks = row.remarks;
            this.editForm.name = row.name;
            this.isEdit = row;//切换编辑状态
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
          this.userGroup.isDel = 1;
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
                let data = {
                    strings:this.multipleSelection.map((v)=>{return v.ssoId}),
                    useDelete:6,
                }
                this.ajax('/v1/usergroup/setUseDelete','POST',data,(res)=>{
                    this.multipleSelection = [];
                    this.$message({
                        message: '您成功操作'+res.get+'条数据',
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
          }else if(type == 1){
            if(this.multipleSelection.length == 0){
                this.$message.error('您未选择任何数据');
                return
            }
             this.$confirm('确认恢复已删除数据？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    strings:this.multipleSelection.map((v)=>{return v.ssoId}),
                    useDelete:4,
                }
                this.ajax('/v1/usergroup/setUseDelete','POST',data,(res)=>{
                    this.multipleSelection = [];
                    this.$message({
                        message: '您成功操作'+res.get+'条数据',
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
            this.userGroup.isDel = 0;
            this.pageInfo.pageNum = 1;
            this.init();
          }
      },
 

       getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
 
        
       
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

.userGroup{
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
      .top{
          margin-bottom: 10px;
          .group{
              float: right;
          }
        .input-with-select{
          width: 15%;
        }
      }
  }
  .adduserGroup{
        margin-top: 10px;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding:80px 400px;
        .form{
            margin-bottom: 40px;
        }
  }
  .box{
      p{
          line-height: 20px !important;
          padding-left: 20px;
      }
  }
}
</style>
