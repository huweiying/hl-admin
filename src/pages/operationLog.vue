<template>
  <div class = 'operationLog'>
    <div v-if = '!addOredit'>
        <div class = 'header'>操作日志 <router-link  class='back' to="/index">返回首页</router-link></div>
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
                <el-select v-model="enterprise.vaule" placeholder="模块选择">
                    <el-option
                        v-for="item in enterprise.arr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                    v-model="value5"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
                <el-input placeholder="请输入内容" v-model="config.name" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class = 'group'>
                    <!-- <el-button type="primary" @click='addNew'>新增</el-button> -->
                    <!-- <el-button type="primary" @click='addNew'>启用</el-button> -->
                    <!-- <el-button type="warning" @click='addNew'>停用</el-button> -->
                    <el-button type="danger" @click ='deleteData'>删除</el-button>
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
                    label="操作用户"
                    width="100px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="模块名称"
                    width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作时间"
                     width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作内容"
                     width="400px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作结果"
                     width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="异常反馈"
                     width="300px">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="edit(scope.$index)"
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
                        :total="1000">
                    </el-pagination>
                </div>
        </div>
    </div>
    <div v-else>
        <!-- 新增编辑模块 -->
        <div class = 'header'>操作日志>查看 <span class='back' @click='back'>返回上级</span></div>
        <div class = 'addMain'>
                <el-form :model="ruleForm" ref="ruleForm"  label-width="120px">
                    <el-row :gutter="100">
                        <el-col :span='12'>
                            <el-form-item label="操作用户" prop="jobs" :rules="{required: true, message: '请输入配置名称', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="操作模块" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="操作内容" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="操作时间" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="操作结果" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="是否异常" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="异常信息" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="操作设备" prop="jobs" :rules="{required: true, message: '请输入配置名称', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="操作浏览器" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="操作IP地址" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="请求URL" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="请求服务器地址" prop="jobs" :rules="{required: true, message: '请输入分类', trigger: 'blur'}">
                                <el-input type="text" v-model="ruleForm.name"></el-input>
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
  name: 'operationLog',
  data () {
    return {
      pageInfo:{
          pageNum:1,
          pageSize:10
      },
      config:{'name':''},
      addOredit:false,
      search:'',
      enterprise:{
          value:'',
          arr:[]
      },
      ruleForm:{
          name:'',
          desc:'',
          type:'0'
      },
      value5:'',
       pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
  beforeMount () {

   },
   created(){
       this.init();
   },
   methods:{
       init(){
        //    this.ajax('v1/config/getConfigs','POST',{config:this.config,pageInfo:this.pageInfo},(res)=>{
        //        console.log(res)
        //    })
        let data = {config:this.config,pageInfo:this.pageInfo};
        this.$.ajax({
            url:'http://192.168.1.82:8003/v1/config/getConfigs',
            type:'POST',
            dataType:"json",
            contentType:'application/json',
            data:{config:this.config,pageInfo:this.pageInfo},
            success:(res)=>{
                console.log(res)
            }
        })
       },
       back(){
           this.addOredit = false
       },
       addNew(i = -1){//新增 编辑
           this.addOredit = true
       },
       deleteData(){//删除
            if(this.multipleSelection.length == 0){
                 this.$message.error('您未选择任何数据');
            }else{//删除数据
                
            }
       },
       edit(i){//编辑
            this.addNew(i)
       },
       addMore(){//添加新的数据
            this.rule.forms.push({
                name:''
            })
       },
       onSubmit(){
           console.log(this.rule.forms)
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
      }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.operationLog{
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
    //   height:100%;
      .input-with-select{
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
      padding:100px 500px;
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
