<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">充值</span>
		</head-top>
		<notice></notice>
		<div class="order">
				<header>
					<img src="../../../assets/Android/drawable-xhdpi/cz_Bank-card-icon1.png"/>
					<span>新博银行卡信息</span>
				</header>
				<section>
					<ul>
						<li>
							<i>订单编号：</i>
							<span>{{bill_no}}</span>
						</li>
						<li>
							<i>汇款金额：</i>
							<span>{{money}}</span>
						</li>
						<li>
							<i>收款银行：</i>
							<span>{{payee_bank_name}}</span>
						</li>
						<li>
							<i>开户行：</i>
							<span>{{payee_bank_branch}}</span>
						</li>
						<li>
							<i>收款账号：</i>
							<span>{{payee_acct_card}}</span>
						</li>
						<li>
							<i>收款人：</i>
							<span>{{payee_acct_name}}</span>
						</li>
						<li>
							<i>汇款留：</i>
							<span>{{post_script}}</span>
						</li>
					</ul>
				</section>
		</div>
		<div class="btn">
			<button @click="subDepositManualOperation('check')" :disabled="but_check">{{but_check_text}}</button>
			<button @click="subDepositManualOperation('cancel')" :disabled="but_cancel">{{but_cancel_text}}</button>
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
				sub:false,
				qx:false,
				/* -- */
				bill_no:'',
				money:'',
				payee_bank_name:'',
				payee_bank_branch:'',
				payee_acct_card:'',
				payee_acct_name:'',
                post_script:'',
//                bank_money_status:'',
                but_check:true,
                but_check_text:"加载中。。。",
                but_cancel:true,
                but_cancel_text:'加载中。。。',
			}
		},
        created(){
            this.getManualDepositInfo();
        },
		methods:{
			popbox(){
				this.sub=false;
				this.$router.push({path:'/my'});
			},
            //获取扫码需要信息
            getManualDepositInfo(){
                let self = this;
                this.axios.get('api/getManualDepositInfoApi?bill_no='+self.$route.params.bill_no, {needToken:true}).then(function(res){
                    let datas=res.data.content;
                    if(res.data.status == '1'){
                        self.bill_no = datas.manualDeposit.bill_no;
                        self.money = datas.manualDeposit.money;
                        self.payee_bank_name = datas.manualDeposit.payee_bank_name;
                        self.payee_bank_branch = datas.manualDeposit.payee_bank_branch;
                        self.payee_acct_card = datas.manualDeposit.payee_acct_card;
                        self.payee_acct_name =  datas.manualDeposit.payee_acct_name;
                        self.post_script =  datas.manualDeposit.post_script;
                        if (datas.manualDeposit.bank_money_status == 'manual_unknown'){
							self.but_check=false;
                            self.but_check_text="确定汇款";
						}else{
                            self.but_check=true;
                            self.but_check_text="已经确定汇款，请等待";
						}
                        	self.but_cancel=false;
                            self.but_cancel_text='取消汇款订单';
                    }else{
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/my'})
                            }
                        });
                    }
                }).catch(function(error){
                    console.log('获取信息失败')
                })
            },
            //（对订单进行确认或取消）
            subDepositManualOperation(type){
                let self = this;
                self.but_check=true;
				self.but_check_text="正在进行操作，请稍等";
				self.but_cancel=true;
				self.but_cancel_text='正在进行操作，请稍等';
                this.axios.post('api/subDepositManualOperationApi',{
                    bill_no:self.bill_no,
                    operation_name:type,
				},{needToken:true}).then(function(res){
                    let datas=res.data.content;
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            if(res.data.status == '1'){
                                if (type == 'check'){
                                    self.but_check=true;
                                    self.but_check_text="已经确定汇款，请等待";
                                    self.but_cancel=false;
                                    self.but_cancel_text='取消汇款订单';
                                }else{
                                    self.$router.push({ path: '/pay/mt'})
                                }
                            }else{
                                location.reload();
                            }
                        }
                    });

                }).catch(function(error){
                    console.log('获取信息失败')
                })
            },
			cancel(){
				this.qx=false;
				this.$router.push({path:'/pay'});
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
	.core{
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
	}
	.order{
		width: 90%;
		margin-left: 5%;
		margin-top: 1rem;
		border: 1px solid sienna;
		header{
			height: 4rem;
			background: #4c3e24;
			position: relative;
			img{
				width: 2.5rem;@include ct;
				margin-left: 1.3rem;
			}
			span{
				@include ct;
				color: rgb(241, 151, 25);
				font-size: 1.6rem;margin-left: 4rem;
				font-weight: 600;
			}
		}
		section{
			padding-bottom: 1rem;overflow: hidden;
			li{
				margin-top: 2rem;
				font-size:1.4rem ;margin-left: 1rem;
				i,span{
					font-weight: 600;
				}
			}
		}
	}
	.btn{
		button{
			width: 80%;
			height: 3.5rem;
			display: block;
			margin-left: 10%;
			margin-top: 1.5rem;
			border-radius: 1.5rem;
			background: rgb(241, 151, 25);
			font-size: 1.4rem;font-weight: 600;
			outline-style: none;
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
				}
				button{
					background: cornflowerblue;
					border-radius: 0;
					font-size: 1.4rem;
					width: 40%;height: 3rem;
					display: block;text-align: center;line-height: 3rem;
					margin-left:30%;margin-top: 6%;color: #fff;
				}
			}
		}
</style>