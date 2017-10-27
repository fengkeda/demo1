<template>
    <div>
        <head-top :logged="logged" :goback="goback" :service="service">
            <span class="core" id="core">{{ this.$route.query.title }}</span>
        </head-top>
        <notice></notice>
        <div class="line">
            <ul>
                <li>
                    <a href="javascript:void(0)" @click="updateSel('d3d')" :class="nowSelDay == 'd3d'?'link router-link-exact-active router-link-active':''"><span>三&nbsp;天</span></a>
                </li>
                <li>
                    <a href="javascript:void(0)" @click="updateSel('d7d')" :class="nowSelDay == 'd7d'?'link router-link-exact-active router-link-active':''"><span>七&nbsp;天</span></a>
                </li>
            </ul>
            <router-view></router-view>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    v-for="(item,index) in columns"
                    :prop="item.prop"
                    :label="item.label"
            >
            </el-table-column>
        </el-table>
        <foot></foot>
    </div>
</template>

<script>
    import HeadTop from '@/components/header/head'
    import Foot from '@/components/footer/footer'
    import Notice from '@/components/common/notice'
    export default{
        data(){
            return{
                goback:true, //返回
                logged:true, //奖牌
                service:true, //按钮
                nowSel:'',  	//查询类型
                nowSelDay:'', 	//查询多少天的记录
                all:[],
                columns:[{prop:'id',label:'编号'},{prop:'money',label:'金额'},{prop:'date',label:'时间'}],
                tableData: [],
            }
        },
        mounted(){
            //使底部导航栏中的我的处于选中状态
            $('#wode i').css('color','rgb(241,151,25)');
            $('#wode span').css('color','rgb(241,151,25)');
        },
        components:{
            HeadTop,Foot,Notice
        },
        created(){
            //console.log(this.$route.query.title);
            this.nowSel = this.$route.query.type;
            this.nowSelDay = 'd3d';
            this.getRecordDetail();
        },
        methods: {
            getRecordDetail(){
                let self = this;
                this.axios.get('api/getRecordDetailApi',{needToken:true,params:{type:this.nowSel}}).then(function(res){
                    if(res.data.status == '1'){
                        let datas=res.data.content;
                        self.columns =  datas.columns;
                        self.tableData = [];
                        for (let key in datas.record){
                            self.tableData.push(datas.record[key]);
                        }
                        return;
                    }else{
                        alert(res.data.msg);
                        this.$router.push({ path: '/my'  })
                    }
                }).catch(function(error){
                    console.log(error);
                    console.log('获取信息失败')
                })
            },
            /* 左边菜单栏的选择 */
            updateSel(code){
                this.nowSelDay = code;
                this.getRecordDetail();
                //console.log(this.privilege);
            },
        }
    }
</script>


<style lang="scss" scoped>
    @import '../../../style/mixin';
    .core{
        display: inline-block;
        color: #fff;
        font-size: 1.8rem;
    @include center;
    }
    .line{
        overflow:hidden;
        padding: 2rem 5% 1rem;
    ul{
        width: 100%;overflow: hidden;
        display: flex;margin-bottom: 1.5rem;
    li{
        flex: 1;
        height: 3.5rem;
        border: 1px solid rgb(203,203,203);
        line-height: 3.5rem;text-align: center;
        border-radius: 1rem;
        background: #fff;
    span{
        font-size: 1.4rem;
        font-weight: 600;
    }
    .link{
        width: 100%;
        height: 3.5rem;
        display: block;
        border-radius:1rem ;
    }
    }
    li:nth-child(2){
        margin: 0 5%;
    }
    .router-link-exact-active{
        background: rgb(241, 151, 25);
    }
    }
    }
</style>