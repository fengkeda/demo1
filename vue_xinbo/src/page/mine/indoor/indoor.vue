<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">户内转账</span>
		</head-top>
		<notice></notice>
		<section class="balance">
			<ul>
				<li>
					<p>{{member_money}}</p>
					<span>账号余额</span>
				</li>
				<li v-for="(value, key) in rooms" >
					<p :id="value.room_code">获取中</p>
					<img src="../../../assets/Android/drawable-xhdpi/gr_Transfer-accounts-icon.png" v-on:load="getRoomMoney(value.room_code)" style="display: none"/>
					<span>{{ value.room_name }}</span>
				</li>
			</ul>
		</section>
		<div class="caozuo">
			<label class="iccid">
				<span>转账编号：</span>
				<input type="text" v-model="bill_no" readonly/>
			</label>
			<br>
			<div class="lab" @click="transfer_out=true">
				<label class="iccid elect">
					<span>转出平台：{{transfer_out_name}}</span>
					<i class="iconfont icon-back"></i>
				</label>
			</div>
			<br>
			<div class="lab" @click="transfer_in=true">
				<label  class="iccid elect">
					<label class="iccid elect">
						<span>转入平台：{{transfer_in_name}}</span>
						<i class="iconfont icon-back"></i>
					</label>
				</label>
			</div>
			<br>
			<label class="iccid">
				<span>&nbsp;&nbsp;&nbsp;金&nbsp;&nbsp;&nbsp;额：</span>
				<input type="text" v-model="money"/>
			</label>
			<p>*最低金额{{ tran_min }}元，最高{{ tran_max }}元</p>
			<label class="iccid">
				<span>交易密码：</span>
				<input type="password" v-model="trade_passwd"/>
			</label>

			<button class="binds" :disabled="disabled" @click="subTransfer">{{btn_text}}</button>
		</div>
		<!--选择转出平台-->
		<div class="pop" v-if="transfer_out"  @click="transfer_out=false">
			<div class="history">
				<ul>
					<li v-for="(item,index) in transfer_room" @click="transfer(item.uid,item.room_name,'out')">
						<span>{{item.room_name}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!--选择转出平台-->
		<div class="pop" v-if="transfer_in"  @click="transfer_in=false">
			<div class="history">
				<ul>
					<li v-for="(item,index) in transfer_room" @click="transfer(item.uid,item.room_name,'in')">
						<span>{{item.room_name}}</span>
					</li>
				</ul>
			</div>
		</div>
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
				money:'',	/* 转账金额 */
				bill_no:'',	/* 转账编码 */
				member_money:'0',	/* 主账号 */
				room_money_text:[],	/* 各游戏厅的余额 */
				room_money_text_two:[],	/* 各游戏厅的余额 */
                trade_passwd:'',	/* 交易密码 */
                tran_min:'',	/* 转账最低金额 */
                tran_max:'',	/* 转账最高金额 */
                btn_text:'获取中···',
            	disabled:true,
				rooms:[],
                transfer_room:[],
                transfer_out_id:'',
                transfer_out_name:'',
                transfer_in_id:'',
                transfer_in_name:'',
                transfer_out:false,
                transfer_in:false,
			}
		},
		created(){
            this.getTransfer();
		},
		methods:{
            //获取扫码需要信息
            getTransfer(){
                let self = this;
                this.axios.get('api/getTransferApi', {needToken:true}).then(function(res){
                    if(res.data.status == '1'){
                        self.bill_no = res.data.content.bill_no;
                        self.rooms =  res.data.content.room;
                        self.member_money = res.data.content.member.money;
                        self.transfer_room = res.data.content.transfer_room;
                        self.tran_min = res.data.content.tran_min;
                        self.tran_max = res.data.content.tran_max;

                        /*  初始化 */
                        self.btn_text = '提交';
                        self.disabled = false;
                        self.transfer_out_id = self.transfer_room[0].uid;
                        self.transfer_out_name = self.transfer_room[0].room_name;
						self.transfer_in_id = self.transfer_room[1].uid;
						self.transfer_in_name = self.transfer_room[1].room_name;
                    }else{
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/about'  })
                            }
                        });
                    }
                }).catch(function(error){
                    console.log('获取信息失败')
                })
            },
			/* 获取游戏厅余额 */
            getRoomMoney(room_code){
                $('#'+room_code).html('获取中');
                let self = this;
                this.axios.get('api/getRoomMoneyApi?room_code='+room_code, {needToken:true,notLoading:true}).then(function(res){
                    /* 因为 splice 方法只支持数字作为元素，所以使用jqery 来改变金额*/
                    if(res.data.status == '1'){
//                        self.room_money_text.splice(room_code,1,res.data.content);
						$('#'+room_code).html(res.data.content);
                    }else{
//                        self.room_money_text.splice(room_code,1,'获取失败');
                        $('#'+room_code).html('获取失败');
                    }
                }).catch(function(error){
//                    self.room_money_text.splice(room_code,1,'获取失败');
                    $('#'+room_code).html('获取失败');
                })
			},
			/* 提交转账申请 */
			subTransfer(){
                let self = this;
                self.btn_text = '提交中···';
                self.disabled = true;
                this.axios.post('api/subTransferApi', {
                    money:self.money,
                    transfer_out_id:self.transfer_out_id,
                    transfer_in_id:self.transfer_in_id,
                    billNo:self.bill_no,
                    trade_passwd:self.trade_passwd,
				},{needToken:true}).then(function(res){
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            self.btn_text = '提交';
                            self.disabled = false;
                            self.member_money = res.data.content.member.money;
                            self.bill_no = res.data.content.bill_no;
                            if (res.data.content.transfer_out_code != ''){  self.getRoomMoney(res.data.content.transfer_out_code) }
                            if (res.data.content.transfer_in_code != ''){  self.getRoomMoney(res.data.content.transfer_in_code) }
                        }
                    });
                }).catch(function(error){
                    console.log('获取信息失败')
                })
			},
			//转出转入平台选择
            transfer(uid,room_name,transfer_type) {
			    if (transfer_type == 'in'){
                    this.transfer_in = false;
                    this.transfer_in_id = uid;
                    this.transfer_in_name = room_name;
				}else if (transfer_type == 'out'){
                    this.transfer_out = false;
                    this.transfer_out_id = uid;
                    this.transfer_out_name = room_name;
				}

			},
		},
		mounted(){
			//使底部导航栏中的我的处于选中状态
			$('#wode i').css('color','rgb(241,151,25)');
			$('#wode span').css('color','rgb(241,151,25)');
			//重新定向到第一个子页面
		},
		components:{
			HeadTop,Foot,Notice
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
	.elect{
		.el-select{
			width: 65%;
			height: 3rem;
			.el-input__icon{
				color: #383333;
			}
			.el-input__inner{
				height: 3rem;
				font-size: 1.4rem;
			}
		}
	}
	.iccid {
		.el-input__inner {
			border: none;
		}
	}
	.balance{
		background: rgb(204,204,204);
		padding: 0.5rem 2%;
		overflow: hidden;
		ul li{
			float: left;
			text-align: center;
			width: 33.3%;
			margin-bottom: 1rem;
			p{
				background: white;
				margin-bottom: 0.7rem;
				width: 80%;
				margin-left: 10%;
				height: 3rem;
				line-height: 3rem;
				font-size: 1.3rem;
				border-radius: 1.5rem;
			}
			span{
				font-size: 1.3rem;
				font-weight: 600;
			}
			.bg{
				background: rgb(241, 151, 25);
			}
		}
	}
	.caozuo{
		padding: 1.5rem 5% 2rem;
		label {
			display: block;
			width: 100%;
			height: 3.5rem;
			background: #fff;
			line-height: 3.5rem;
			font-size: 1.4rem;
			border-radius: 1.5rem;
			margin-bottom: 2rem;
			span {
				margin-left: 1.5rem;
			}
			input {
				width: 58%;
				height: 3rem;
				font-size: 1.4rem;
			}
			i {
				float: right;
				margin-right: 1.5rem;
			}
		}
		p{
			padding-left: 2rem;
			font-size: 1rem;
		}
		.iccid{
			margin-bottom: 0.5rem;
		}
		.binds {
			width: 100%;
			height: 3.5rem;
			text-align: center;
			line-height: 3.5rem;
			font-size: 1.6rem;
			background: rgb(255, 153, 0);
			border-radius: 1.5rem;
			margin-top: 1rem;
		}
	}
	.pop {
			position: fixed;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			left: 0;
			top: 0;
			right: 0;
			z-index: 999;
			.history {
				width: 80%;
				height: 23rem;
				@include center;
				overflow: auto;
				background: rgb(238, 238, 238);
				ul {
					padding: 0 2%;
					li {
						padding: 1.5rem 0;
						text-align: center;
						border-bottom: 1px solid rgb(203, 203, 203);
						span {
							font-size: 1.2rem;
						}
					}
				}
			}
		}
</style>