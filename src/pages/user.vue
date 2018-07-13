<template>
    <div class = 'user'>
      <div v-if = '!addOredit'>
        <div class = 'header'>用户管理 <router-link  class='back' to="/index">返回上级</router-link></div>
        <div class = 'main'>
            <div class = 'top'>
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
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
                    label="姓名"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="性别"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="人员编码"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="用户类型"
                    width="120px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="手机号"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="所属企业/机构"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="开通时间"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="状态"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="时间限制"
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
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>
        </div>
      </div>
      <div v-else>
          <!-- 新增 -->
          <div class = 'header'>用户管理>新增/编辑 <a  class='back' @click = 'back'>返回上级</a></div>
          <div class = 'addUser'>
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form">
            <el-row :gutter="40">
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                         <el-form-item label="姓名" prop="name" :rules="
      { required: true, message: '姓名不能为空', trigger: 'blur' }">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="resource" :rules="{
      required: true, message: '请选择性别', trigger: 'blur,change'}">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            <el-radio label="保密"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="人员编码" prop="name" :rules="{
      required: true, message: '人员编码不能为空', trigger: 'blur'}">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="办公电话" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭地址" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="是否时间限制" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="无限制"></el-radio>
                            <el-radio label="时间限制"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-form-item label="手机号" prop="name" :rules="{
      required: true, message: '手机号不能为空', trigger: 'blur'}">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="组织结构" prop="region" :rules="{
      required: true, message: '请选择组织机构', trigger: 'blur'}">
                            <el-select v-model="ruleForm.region" placeholder="请选择组织结构">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="身份类型" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择身份类型">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用户类型" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择身份类型">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="微信" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户组" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
                        <el-form-item style = 'margin-left:300px;margin-top:40px'>
                            <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
        </el-form>
    </div>
      </div>
    </div>
</template>

<script>
    
export default {
  name: 'user',
  data () {
    return {
     addOredit:false,
     ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      data: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []//选中的数据
    }
  },
  created(){
     
  },
  mounted () {


   },
   updated(){

   },
   methods:{
        addNew(i = -1){//新增 编辑
           this.addOredit = true
        },
        back(){
           this.addOredit = false
        },
        deleteData(){//删除
            if(this.multipleSelection.length == 0){
                 this.$message.error('您未选择任何数据');
            }else{//删除数据
                
            }
       },
        handleSelectionChange(val) {//多选框
            this.multipleSelection = val;
        }
       
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

.user{
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
  .addUser{
          margin-top: 10px;
          width: 100%;
          background: #fff;
          box-sizing: border-box;
          padding:80px 400px;
          .form{
              margin-bottom: 40px;
          }
  }
}
</style>
