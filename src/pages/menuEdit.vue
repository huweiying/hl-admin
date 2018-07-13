<template>
  <div class = 'menuEdit'>
      <div class = 'header'>菜单管理 <router-link  class='back' to="/index">返回首页</router-link></div>

      <div class = 'main'>
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple left">
                    <div class = 'title'>系统后台</div>
                    <div class = 'treeBox'>
                        <el-tree
                            :data="data6"
                            node-key="id"
                            default-expand-all
                            @node-drag-start="handleDragStart"
                            @node-drag-enter="handleDragEnter"
                            @node-drag-leave="handleDragLeave"
                            @node-drag-over="handleDragOver"
                            @node-drag-end="handleDragEnd"
                            @node-drop="handleDrop"
                            draggable
                            :allow-drop="allowDrop"
                            :allow-drag="allowDrag">
                        </el-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple right">
                    <div class = 'title'>编辑</div>
                    <div class = 'form'>
                         <el-form :model="ruleForm"  ref="ruleForm" label-width="100px">
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="父级名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" prop="name">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="链接地址" prop="url">
                        <el-input placeholder="请输入链接地址" v-model="ruleForm.name">
                          <template slot="prepend">Http://</template>
                        </el-input>
                    </el-form-item>
              
                    <el-form-item style = 'margin-top:20px'>
                        <el-button type="danger" @click="deleteItem">删除</el-button>
                        <el-button type="primary" @click="deleteItem">新增同级</el-button>
                        <el-button type="primary" @click="deleteItem">新增子级</el-button>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </el-form-item>
                </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
      </div>
  </div>
  
</template>

<script>
export default {
  name: 'menuEdit',
  data () {
    return {
      data6: [{
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
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        ruleForm:{
          name:'',
          url:'',
          imgUrl:''
        }
    }
  },
  created(){
  },
  mounted () {

   },
   updated(){
   },
   methods:{

    //    拖拽节点
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

.menuEdit{
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

  .main{
      width: 99%;
      margin-top: 30px;
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
              margin: 20px 100px;
          }
          .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }

  }
}
</style>
