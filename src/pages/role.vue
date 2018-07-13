<template>
  <div class = 'role'>
    <div v-if = '!addOredit'>
        <div class = 'header'>角色管理 <router-link  class='back' to="/index">返回首页</router-link></div>
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
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class = 'group'>
                    <el-button type="primary" @click='addNew'>新增</el-button>
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
                    label="角色名称"
                    width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="角色类型"
                    width="300px">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="角色描述"
                     width="800px"
                    >
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
        <!-- 新增编辑模块 -->
        <div class = 'header'>角色管理>新增/编辑 <span class='back' @click='back'>返回上级</span></div>
        <div class = 'addMain'>
                <el-form :model="ruleForm" ref="ruleForm"  label-width="100px">
                    <el-form-item label="角色类型" prop="role" :rules="{required: true, message: '请选择角色类型', trigger: 'blur'}">
                        <el-radio-group v-model="ruleForm.role">
                        <el-radio label="系统角色"></el-radio>
                        <el-radio label="自定义角色"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="name" :rules="{required: true, message: '请选择角色类型', trigger: 'blur'}">
                        <el-select v-model="ruleForm.name" placeholder="请选择角色名称">
                            <el-option label="121" value="1"></el-option>
                            <el-option label="1223" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-row class = 'box'>
                            <el-col :span = '16' style = 'border:1px solid #ccc;min-height:300px'>
                                <p>待选成员</p>
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
                            <el-col :span = '7' style = 'border:1px solid #ccc;min-height:300px;margin-left:20px;'>
                                <p>已选成员</p>

                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                  
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      addOredit:false,
      search:'',
      enterprise:{
          value:'',
          arr:[]
      },
      ruleForm:{
          name:'',
          desc:'',
          role:''
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
   methods:{
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

.role{
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
  .box{
      p{
          line-height: 20px;
          padding-left: 20px;
      }
  }
}
</style>
