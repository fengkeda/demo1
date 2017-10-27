<template>
	<div class="alipay">
		<div class="lab">
			<label>
				<span>交易编号：</span>
				<input type="text" v-model="payeeBillNo" name="bill_no" readonly/>
			</label>
		</div>
		<!--<div class="lab" @click="bank=true">-->
			<!--<label>-->
				<!--<span>选择银行卡:</span>-->
				<!--{{money}}-->
				<!--<i class="iconfont icon-back"></i>-->
			<!--</label>-->
		<!--</div>-->
		<div class="lab">
			<label class="elect">
				<span>选择银行：</span>
				<el-select  v-model="bank_code">
					<el-option  v-for="(value, key) in bankList" :label="value.bank_name" :value="value.bank_code">
					</el-option>
				</el-select>
			</label>
		</div>

		<div class="lab">
			<label>
				<span>充值金额：</span>
				<input type="text" v-model="money"/>
			</label>
		</div>
		<!--<div class="lab" @click="Sale=true">-->
			<!--<label>-->
				<!--<span>选择优惠：</span>-->
				<!--{{youhui}}-->
				<!--<i class="iconfont icon-back"></i>-->
			<!--</label>-->
		<!--</div>-->
		<div class="lab">
			<label class="elect">
				<span>选择优惠：</span>
				<el-select  v-model="activity_uid">
					<el-option  v-for="(value, key) in activities" :label="value.activity_name" :value="value.uid">
					</el-option>
				</el-select>
			</label>
		</div>

		<button class="btn" @click="subDepositPay()" :disabled="disabled">{{ but_text }}</button>

		<!--选择优惠-->
		<div class="pop" v-if="Sale">
			<div class="history">
				<ul>
					<li v-for="(item,index) in sale" @click="iput(index)">
						<span>{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bank: false, //历史记录
				record: [1000,2356,589654,55,45454,544654,54564],
				Sale: false,
				sale: ['不选择优惠', '真人首存35%', '老虎机首存100%', '享受存款1%优惠赠送(最高50元)'],
				youhui: '',
                payeeBillNo:'',
				money:'',
                activities:[],
                bankList:[],
                activity_uid:'',
                bank_code:'',
				submits:false,
                but_text:'提交',
                disabled:false,
			}
		},
        created(){
            this.getOnlineDeposit();
        },
		methods: {
			//把历史记录的数据填入到对应的输入框中
            getOnlineDeposit(){
                let self = this;
                self.but_text = '提交中···';
                self.disabled = true;
				this.axios.get('api/getOnlineDepositApi',{needToken:true}).then(function(res){
                    self.but_text = '提交';
                    self.disabled = false;
					if(res.data.status == '1'){
						let datas=res.data.content;
						self.payeeBillNo = datas.payeeBillNo;
                        self.activities =  datas.activity;
                        self.bankList =  datas.bankList;
                        /* 初始化 */
                        self.activity_uid = 0;
						return;
					}else{
                        let lay = self.$layer.open({
                            content: '在线充值系统正在维护，请使用手工存款...',
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/pay/mt'  });
                            }
                        });
					}
				}).catch(function(error){
					console.log('获取信息失败')
				})
            },
			/* 提交在线需要信息 */
            subDepositPay(){
                this.btn_text = '提交中...';
                this.disabled = true;
                let self = this;
                let newWin = window.open('about:blank');
                this.axios.post('api/subDepositPayeeApi',{
                    payment_code:'ONLINE',
                    bank_code:self.bank_code,
                    money:self.money,
                    bill_no:self.payeeBillNo,
                    activity_uid:self.activity_uid,
                },{needToken:true}).then(function(res){
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            if(res.data.status == '1'){
                                newWin.location.href = res.data.content.url;
                                return;
                            }
                            newWin.close();
                            this.btn_text = '提交';
                            this.disabled = false;
                        }
                    });
                }).catch(function(error){
                    console.log('获取信息失败')
                })
            },
			ipt(index) {
				this.bank = false;
				this.record.forEach((item,idx) => {
					if(idx == index) {
						this.money = item;
					}
				})
			},
			//选择优惠
			iput(index) {
				this.Sale = false;
				this.sale.forEach((item,idx) => {
					if(idx == index) {
						this.youhui = item;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';
	.alipay{
		padding: 1rem 5% 1rem;
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
					border: none;
				}
			}
		}
		.lab{
			width:100%;
			height:3.5rem;
			margin-bottom:2rem;
			background:#fff;
			border-radius:1.5rem;
			line-height:3.5rem;
			padding: 0 1.5rem;
			font-size:1.4rem;
			span{
				font-size: 1.4rem;
			}
			i{float: right;}
			input{
				font-size: 1.4rem;
				width: 65%;
			}
		}
		.btn{
			width: 100%;
			height: 3.5rem;
			background: #f19719;
			font-size: 1.4rem;
			border-radius: 1.5rem;
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
	}
</style>