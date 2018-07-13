<template>
    <div class = 'componentEdit'>
      <div v-if = '!addOredit'>
        <div class = 'header'>组件管理 <router-link  class='back' to="/index">返回首页</router-link></div>
        <div class = 'main'>
            <div class = 'top'>
                <el-select v-model="app.value" placeholder="应用名称">
                    <el-option
                    v-for="item in app.arr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="state.value" placeholder="全部状态">
                    <el-option
                    v-for="item in state.arr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class = 'group'>
                    <el-button type="primary" @click='addNew'>新增</el-button>
                    <el-button type="primary" >启用</el-button>
                    <el-button type="warning">停用</el-button>
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
                    label="应用名称"
                    width="250px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="版本号"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="上传时间"
                    width="500px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="更新说明"
                    width="600">
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
          <div class = 'header'>用户组管理>新增/编辑 <a  class='back' @click = 'back'>返回上级</a></div>
          <div class = 'addcomponentEdit'>
              <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
                <el-form-item label="组件名称"  :rules="{required: true, message: '组件名称不能为空', trigger: 'blur'}">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="版本号" :rules="{required: true, message: '版本号不能为空', trigger: 'blur'}">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" prop="url" :rules="{required: true, message: '链接地址不能为空', trigger: 'blur'}">
                        <el-input placeholder="请输入链接地址" v-model="ruleForm.url">
                          <template slot="prepend">Http://</template>
                        </el-input>
                </el-form-item>
                <el-form-item label="更新说明" :rules="{required: true, message: '更新说明不能为空', trigger: 'blur'}">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
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
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
              </el-form>
          </div>
      </div>
    </div>
</template>

<script>
    
export default {
  name: 'componentEdit',
  data () {
    return {
     addOredit:false,
     ruleForm:{
         name:'',
         desc:''
     },
     app:{
         value:'',
         arr:[]
     },
     state:{
         value:'',
         arr:[]
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
       edit(i){
            this.addNew(i)
       },
        handleSelectionChange(val) {//多选框
            this.multipleSelection = val;
        }
       
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this componentEditEdit only -->
<style lang='less'>

.componentEdit{
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
      }
  }
  .addcomponentEdit{
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
