<template>
	<div class="card">
		<!--<label class="iccid" @click="flage && historyorder()">-->
			<!--<span>历史记录</span>-->
			<!--<i class="iconfont icon-back"></i>-->
		<!--</label>	-->
		<label class="iccid elect" >
			<span>历史银行：</span>
			<el-select v-model="old_bank_remit_uid" placeholder="选择历史银行" v-on:change="selectHistory">
				<el-option
						v-for="(val,key) in bankHistory"
						:key="val.uid"
						:label="val.name"
						:value="val.uid"
				>
				</el-option>
			</el-select>
		</label>
		<label class="iccid">
			<span>交易编号：</span>
			<input type="text" v-model="payeeBillNo" readonly/>
		</label>
		<label class="iccid">
			<span>汇款人姓名：</span>
			<input type="text" v-model="acct_name" v-on:change="cancelHistory"/>
		</label>
		<label class="iccid">
			<span>汇款银行卡：</span>
			<input type="text" v-model="acct_card" v-on:change="cancelHistory"/>
		</label>
		<label class="iccid">
			<div class="remits">
				<el-select v-model="remit_type" placeholder="汇款方式">
					<el-option
							v-for="(val,key) in remited"
							:key="key"
							:label="val"
							:value="key">
					</el-option>
				</el-select>
			</div>
			<div class="opens">
				<el-select v-model="bank_code" placeholder="开户银行">
				    <el-option
				      v-for="(val,key) in options"
				      :key="key"
				      :label="val"
				      :value="key">
				    </el-option>
			  	</el-select>
			</div>
		</label>
		<label class="iccid">
			<div class="provinces">
				<el-select v-model="province" placeholder="省"  v-on:change="provinceChange">
				    <el-option
				      v-for="(item,index) in addr"
				      :key="index"
				      :label="item.name"
				      :value="item.name"
				      >
				    </el-option>
			  	</el-select>
			</div>
		  	<div class="citys">
				<el-select v-model="city" placeholder="市">
				    <el-option
				      v-for="(items,ind) in citys"
				      :key="ind"
				      :label="items.name"
				      :value="items.name">
				    </el-option>
			  	</el-select>
		  	</div>
		</label>
		<label class="iccid">
			<span>充值金额：</span>
			<input type="text" v-model="money"/>
		</label>
		<!--<label class="iccid" @click="Sale=true">-->
			<!--<span>选择优惠：{{youhui}}</span>-->
			<!--<i class="iconfont icon-back"></i>-->
		<!--</label>-->
		<label class="iccid elect" >
			<span>优惠活动：</span>
			<el-select v-model="activity_uid" placeholder="选择优惠活动">
				<el-option
						v-for="(val,key) in activities"
						:key="key"
						:label="val.activity_name"
						:value="key"
				>
				</el-option>
			</el-select>
		</label>
		<button class="binds" @click="subManualDeposit" :disabled="disabled">{{ btn_text }}</button>
		<!--历史记录-->
		<div class="pop" v-if="History">
			<div class="history">
				<ul>
					<li v-for="(item,index) in record" @click="ipt(index)">
						<span>[{{item.bank}}]</span>-<span>[{{item.name}}]</span>-<span>[{{item.num}}]</span>
					</li>
				</ul>
			</div>
		</div>
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
	export default {
		data() {
			return {
                acct_name: '',
                acct_card: '',
				addr: [], //省
				province: '',
				citys: [], //市
				city: '',
				money: '',
				sub:false,
				activities:[], /* 活动列表 */
				activity_uid:'', /* 活动ID */
				options: [],  /* 银行列表 */
				remited: [], /* 汇款方式 */
                bankHistory:[],	/* 历史银行数组 */
                old_bank_remit_uid:'',  /* 选中历史银行的uid */
                bank_code: '', /* 开户银行 */
                remit_type: '', /* 汇款方式 */
                manualDetails: '', /* 汇款附言 */
                payeeBillNo: '', /* 交易编号 */
				/* 按钮事件 */
                btn_text:'获取中',
                disabled:true,
				record: [],
				sale: [],
				flage:true,
				/*===*/
                History: false, //历史记录
                Sale: false,
                youhui: '',
			}
		},
		methods: {
            //进入页面，获取存款信息
            getManualDeposit(){
                let self = this;
                this.axios.get('api/getManualDepositApi',{needToken:true}).then((res)=>{
                    let data=res.data.content;
                    self.btn_text='提交手工汇款';
                    self.disabled=false;
                    if (res.data.status =='1') {
                        self.bankHistory = data.bankHistory;
                        self.remited = data.remittanceMode;
                        self.options = data.bankList;
                        self.activities = data.activity;
                        self.manualDetails = data.manualDetails;
                        self.payeeBillNo = data.payeeBillNo;
                        /* 初始化 */
                        self.old_bank_remit_uid = '0';
                        self.activity_uid = '102';
                    }
                    if (res.data.status =='2') {
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({path:'/order/'+data.bill_no});
                            }
                        });
                    }
                    if (res.data.status !='1' && data.status =='2') {
                        console.log(data.msg);
                    }
                });
            },
			//进行手工存款
            subManualDeposit(){
                this.btn_text = '提交中...';
                this.disabled = true;
                let self = this;
                this.axios.post('api/subManualDepositApi',{
                    old_bank_remit_uid:self.old_bank_remit_uid,
                    bank_code:self.bank_code,
                    acct_name:self.acct_name,
                    acct_card:self.acct_card,
                    remit_type:self.remit_type,
                    province:self.province,
                    city:self.city,
                    manualDetails:self.manualDetails,
                    bill_no:self.payeeBillNo,
                    activity_uid:self.activity_uid,
                    money:self.money,
                },{needToken:true}).then(function(res){
                    self.btn_text = '提交手工汇款';
                    self.disabled = false;
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            if(res.data.status == '1'){
                                self.$router.push({path:'/order/'+res.data.content.bill_no});
                            }
                        }
                    });
                }).catch(function(error){
                    console.log('获取信息失败')
                })
			},

			/* 当选择历史银行时 */
            selectHistory(old_bank_uid){
                let self = this;
                self.acct_name = self.bankHistory[old_bank_uid].acct_name;
                self.acct_card = self.bankHistory[old_bank_uid].acct_card;
                /* 选择省份 选择城市 */
                self.province = self.bankHistory[old_bank_uid].province;
                self.provinceChange(self.province,self.bankHistory[old_bank_uid].city);
                self.city = self.bankHistory[old_bank_uid].city;
                self.bank_code = self.bankHistory[old_bank_uid].bank_code;
                self.remit_type = self.bankHistory[old_bank_uid].remit_type;
			},

			/* 取消选择的历史银行 */
            cancelHistory(){
                let self = this;
                if (self.old_bank_remit_uid == '0'){  return; }
                self.old_bank_remit_uid = '0';
                self.acct_name = '';
                self.acct_card = '';
				/* 选择省份 选择城市 */
                self.province = '';
                self.city = '';
                self.bank_code = '';
                self.remit_type = '';
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
			//获取省市的数据
			getAddr() {
				this.$http.get("../../../../static/data/address.json").then((response) => {
					this.addr = response.data;
				})
			},
			//获取省的索引值
			provinceChange() {
				let item = this.addr;
				let digit = 0;
				let self = this;
				$.each(item, function(idx, el) {
					if(el.name == self.province) {
						digit = idx;
					}
				});
				this.citys = this.addr[digit].city;
				let vv = true;
                $.each(self.citys, function(idx, el) {
                    if(el.name == self.city) {
                        vv = false;
                    }
                });
                if (vv)
					this.city = '';
			},

			//获取历史记录
			historyorder(){
				if (this.record == '') {
					this.flage=false;
					return;
				}
				this.History=true;
			}
		},
		mounted() {
			this.getAddr();
			this.getManualDeposit();
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';
	
	.card {
		overflow: hidden;
		padding: 1rem 4% 0.5rem;
		label {
			display: block;
			width: 100%;
			height: 3.5rem;
			background: #fff;
			line-height: 3.5rem;
			font-size: 1.4rem;
			border-radius: 1.5rem;
			margin-bottom: 2rem;
			overflow: hidden;
			span {
				margin-left: 1.5rem;
			}
			input {
				width: 58%;
				height: 3rem;
				font-size: 1.4rem;
			}
			div {
				display: inline-block;
			}
			.ct {
				margin: 0;
			}
			i {
				float: right;
				margin-right: 1.5rem;
			}
		}
		.binds {
			width: 100%;
			height: 3.5rem;
			text-align: center;
			line-height: 3.5rem;
			font-size: 1.6rem;
			background: rgb(255, 153, 0);
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
				width: 94%;
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
			.submit{
				width: 80%;
				height: 15rem;
				@include center;
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
		}
	}
</style>
<style lang="scss">
	/*修改element原有的样式*/
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
	
	.el-select-dropdown__item {
		font-size: 1.4rem;
		height: 2.6rem;
		line-height: 2.4rem;
		color: black;
		padding-top:0 ;
	}
	
	.provinces,
	.opens {
		margin-left: 1rem;
	}
	
	.provinces,
	.citys,
	.opens,
	.remits {
		width: 46%;
		.el-select {
			width: 100%;
			height: 3.5rem;
			.el-input__icon {
				color: #383333;
			}
			.el-input__inner {
				height: 3rem;
				font-size: 1.4rem;
			}
		}
	}
	
	.history {
		.el-checkbox {
			display: inline;
		}
	}
</style>