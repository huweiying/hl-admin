<template>
  <div class = 'index'>
    <div class = 'header'>应用中心</div>
    <div>
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <div class='appList'>
                        <div class='search'>
                            <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                        <div>
                            <div class="first_app common_app" style='background:'>我的应用<span>(8)</span></div>
                            <hr>
                            <ul style='margin:20px 0'>
                                <li class='second_app common_app'>推荐应用</li>
                                <li class='third_app common_app'>所有应用</li>
                            </ul>
                            <hr>
                            <ul  style='margin:20px 0'>
                                <li class='app04 common_app'>效率</li>
                                <li class='app05 common_app'>工具</li>
                                <li class='app06 common_app'>沟通</li>
                                <li class='app07 common_app'>咨询</li>
                                <li class='app08 common_app'>消息</li>
                                <li class='app09 common_app'>系统</li>
                                <li class='app10 common_app'>管理</li>
                            </ul>
                        </div>
                </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <div class = 'center'>
                    <div class = 'banner'>
                        <el-carousel height="300px">
                            <el-carousel-item v-for="item in 4" :key="item">
                            <h3>{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class = 'header'>推荐应用</div>
                    <div class = 'appsBox'>
                        <ul>
                            <li @click= "guide('areaDetail')"><div class='appItem'></div><span>区域管理</span></li>
                            <li @click= "guide('user')"><div class='appItem'></div><span>用户管理</span></li>
                            <li @click= "guide('role')"><div class='appItem'></div><span>角色管理</span></li>
                            <li @click= "guide('jobs')"><div class='appItem'></div><span>岗位管理</span></li>
                            <li @click= "guide('organization')"><div class='appItem'></div><span>组织机构管理</span></li>
                            <li @click= "guide('userGroup')"><div class='appItem'></div><span>用户组管理</span></li>
                            <li @click= "guide('authorization')"><div class='appItem'></div><span>授权管理</span></li>
                        </ul>
                        <ul>
                            <li @click= "guide('menuEdit')"><div class='appItem'></div><span>菜单管理</span></li>
                            <li @click= "guide('componentEdit')"><div class='appItem'></div><span>组件管理</span></li>
                            <li @click= "guide('componentLead')"><div class='appItem'></div><span>组件引导表</span></li>
                            <li @click= "guide('operationLog')"><div class='appItem'></div><span>操作日志</span></li>
                            <li @click= "guide('loginLog')"><div class='appItem'></div><span>登录日志</span></li>
                            <li @click= "guide('configuration')"><div class='appItem'></div><span>配置管理</span></li>
                            <li @click= "guide('constraint')"><div class='appItem'></div><span>约束管理</span></li>
                        </ul>
                    </div>
                </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <div class = 'right'>
                    <div class = 'recently'>
                        <div class = 'header'>最近使用</div>
                        <ul class = 'recBox'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div class = 'more'>更多记录</div>
                    </div>
                    <div class = 'appRank'>
                        <div class = 'header'>使用频率排行</div>
                        <ul>
                            <li class = 'item first'><img src="" alt=""><span>用户组管理</span></li>
                            <li class = 'item second'><img src="" alt=""><span>用户组管理</span></li>
                            <li class = 'item third'><img src="" alt=""><span>用户组管理</span></li>
                            <li class = 'item'><img src="" alt=""><span><i>4</i>用户组管理</span></li>
                            <li class = 'item'><img src="" alt=""><span><i>5</i>用户组管理</span></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                </div>
            </el-col>
        </el-row>
    
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted(){
  },
   methods:{
       guide(url){
           this.$router.push('/'+url)
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

.index{
    width:100%;
    .header{
        margin-left: 15px;
        color: #000;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        border-left: 5px solid #2c3e50;
        padding:5px 20px;
    }
  
    .appList{
        text-align: center;
        width: 100%;
        background: #fff;
        height: 820px;
        padding:20px;
        box-sizing: border-box;
        .search{
            position: relative;
            .layui-input{
                padding-right: 50px;
            }
            .layui-btn{
                position: absolute;
                top:4px;
                right:3px;
                border: none;
            }
        }
      
        .common_app{
            background-size: 15px 15px;
            margin:10px 0;
        }
        .first_app {
                background: url('../assets/img/centre_icons01.png') no-repeat 25% 20%;
                margin: 20px 0;
        }
        .second_app{
            background: url('../assets/img/centre_icons02.png') no-repeat 25% 20%;
        }
        .third_app{
            background: url('../assets/img/centre_icons03.png') no-repeat 25% 20%;
        }
        .app04{
            background: url('../assets/img/centre_icons04.png') no-repeat 25% 20%;
        }
        .app05{
            background: url('../assets/img/centre_icons05.png') no-repeat 25% 20%;
        }
        .app06{
            background: url('../assets/img/centre_icons06.png') no-repeat 25% 20%;
        }
        .app07{
            background: url('../assets/img/centre_icons07.png') no-repeat 25% 20%;
        }
        .app08{
            background: url('../assets/img/centre_icons08.png') no-repeat 25% 20%;
        }
        .app09{
            background: url('../assets/img/centre_icons09.png') no-repeat 25% 20%;
        }
        .app10{
            background: url('../assets/img/centre_icons10.png') no-repeat 25% 20%;
        }
    }
    .center{
        padding:0 20px;
        width:100%;
        box-sizing: border-box;
        .banner{
            #carousel{
                width:100% !important;
                height: 300px !important;
            }
        }
        .header{
            margin:10px 0;
            font-size: 16px;
        }
        .appsBox{
            width: 100%;
            height: 470px;
            background: #fff;
            border-radius: 2px;
            box-sizing: border-box;
            padding:40px;
            li{
                text-align: center;
                width: 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                cursor: pointer;
            }
            ul{
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
            }            
            .appItem{
                background: url('../assets/img/app.png') no-repeat;
                width: 80px;
                height: 80px;
                border-radius: 5px;
                margin-bottom: 8px;
            }
        }
    }
    .right{
        background: #fff;
        padding:20px;
        box-sizing: border-box;
        .header{
            font-size: 14px;
            padding:0 10px;
            margin-left: 0px;
        }
        .recently{
            border-bottom: 1px solid #ccc;
            .recBox{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                li{
                    width: 75px;
                    height: 75px;
                    background: #ccc;
                    margin: 6px;
                }
            }
            .more{
                text-align: center;
                color:#4746C8;
                margin:10px 0;
            }
        }
        .appRank{
            margin-top: 20px;
            .header{
                font-size: 14px;
                padding:0 10px;
                margin-left: 0px;
            }
            ul{
                .first{
                    background: url('../assets/img/1.png') no-repeat 20px 0;
                }
                .second{
                    background: url('../assets/img/2.png') no-repeat 20px 0;
                }
                .third{
                    background: url('../assets/img/3.png') no-repeat 20px 0;
                }
                .item{
                    margin: 10px 0;
                    position: relative;
                    background-size: 20px 20px;
                    img{
                        width: 20px;
                        height: 20px;
                        background: #ccc;
                        margin-left: 55px;
                    }
                    span{
                        margin-left: 10px;
                    }
                    i{
                        position: absolute;
                        left:25px;
                        top:3px;
                        font-size: 14px;
                    }
                }
            }        
        }
    }
}
</style>
