<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">提款</span>
		</head-top>
		<notice></notice>
		<div class="tk">
			<label>
				<span>取款单号：</span>
				<input type="text" v-model="withdrawBillNo"/>
			</label>
			<p></p>
			<label>
				<span>账户余额：</span>
				<input type="text" v-model="member_money" readonly="readonly"/>
			</label>
			<p></p>
			<label class="elect">
				<span>选择银行：</span>
				<el-select  v-model="bank_bind_uid">
					<el-option  v-for="(value, key) in bankBinds" :label="value.user_bank_name+'-'+value.user_bank_card" :value="key">
					</el-option>
				</el-select>
			</label>
			<p></p>
			<label>
				<span>提款金额：</span>
				<input type="text" v-model="money"/>
			</label>
			<p>*当天500元以下取款，第一笔免收手续费，第二笔开始收取10%的手续费</p>
			<p>*当天500元以上取款，无需任何手续费，提款无上限</p>
			<label>
				<span>交易口令：</span>
				<input type="password"  v-model="trade_passwd" />
			</label>
			<p></p>
			<button class="btn" @click="subWithdraw()" :disabled="disabled">{{btn_text}}</button>
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
				close:false,
				sub:false,
				serch:false,
                disabled:true,
				btn_text:'获取信息中...',
                withdrawBillNo:'获取中',
                trade_passwd:'',
				member_money:'获取中',
                money:'',
                bank_bind_uid:'',
                bankBinds:[]
			}
		},
        created(){
            this.getWithdraw();
        },
		methods:{
		    /* 获取取款信息 */
            getWithdraw(){
                let self = this;
				this.axios.get('api/getWithdrawApi',{needToken:true}).then(function(res){
					if(res.data.status == '1'){
						let datas=res.data.content;
						self.withdrawBillNo =datas.withdrawBillNo;
						self.member_money = datas.member.money;
						self.bankBinds=datas.bankBind;
						self.disabled = false;
						self.btn_text = '提交';
						self.trade_passwd ='';
						return;
					}else if (res.data.status == '-2'){
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/about'  });
                            }
                        });
					}else if (res.data.status == '-3'){
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/bank_card'  });
                            }
                        });
					}
				}).catch(function(error){
					console.log('获取信息失败')
				})
			},
			/* 提交取款信息 */
            subWithdraw(){
                let self = this;
                self.disabled = true;
                self.btn_text = '提交中...';
				this.axios.post('api/subWithdrawApi',{
					bank_bind_uid:self.bank_bind_uid,
					money:self.money,
					trade_passwd:self.trade_passwd,
					withdrawBillNo:self.withdrawBillNo,
				},{needToken:true}).then(function(res){
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            self.getWithdraw();
                        }
                    });

				}).catch(function(error){
					console.log('获取信息失败')
				})
            },

			//弹出框
			popbox(){
				this.sub=false;
//				this.$router.push({path:'/order'});
			}
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
	.elect{
		.el-input__inner{
			border: none;
		}
		.el-select{
			width: 63%;
			height: 3.5rem;
			.el-input__icon{
				color: #383333;
			}
			.el-input__inner{
				height: 3rem;
				font-size: 1.4rem;
			}
		}
	}
	.core{
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
	}
	.tk{
		padding: 2rem 8%;
		label{
			display: block;
			width: 100%;
			height: 3.5rem;
			border: 1px solid rgb(203,203,203);
			border-radius: 1.5rem;
			line-height: 3.5rem;
			background: white;
			position: relative;
			span{
				margin-left: 1.5rem;
				font-size: 1.4rem;
			}
			input{
				width: 60%;
				height: 3rem;
				font-size: 1.4rem;				
			}
		}
		p{
			font-size: 1.2rem;
			margin: 1rem 0 2rem;
			margin-left: 2rem;			
		}
		.btn{
			width: 100%;
			height: 3.5rem;
			font-size: 1.4rem;
			font-weight: 600;
			border-radius:1.5rem ;
			background: rgb(241, 151, 25);
		}
		.close{
			margin-top: 1.5rem;
			.btn-colse{
				width: 100%;
				height: 3.5rem;
				font-size: 1.4rem;
				font-weight: 600;
				border-radius:1.5rem ;
				background: rgb(241, 151, 25);
				margin-bottom: 1.5rem;
			}
			a{
				text-decoration: underline;
				margin-left: 1rem;
				font-size: 1.4rem;
				color: rgb(241, 151, 25);
			}
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
			.submit{
				width: 80%;
				margin-left: 10%;
				height: 26%;
				margin-top: 50%;
				background: rgb(238, 238, 238);
				p{
					padding: 2rem 10%;
					text-align: center;
					position: relative;
					font-size: 1.4rem;
					border-bottom:1px solid cornflowerblue ;
					i{position: absolute;top: 4px;right: 4px;}
				}
				button{
					background: cornflowerblue;
					font-size: 1.4rem;
					width: 40%;height: 3rem;
					display: block;text-align: center;line-height: 3rem;
					margin-left:30%;margin-top: 6%;color: #fff;
				}
			}
			p{
				width: 90%;
				height: 4rem;
				line-height: 4rem;
				font-size: 1.6rem;
				background: rgb(238, 238, 238);
				margin-left: 5%;
				padding-left: 2rem;
				margin-top: 50%;
				color: rgb(241, 151, 25);
			}
		}
</style>