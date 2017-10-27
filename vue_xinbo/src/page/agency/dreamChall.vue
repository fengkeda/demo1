<template>
	<div class="dreamchall">
		<head-top :goback='goback' :service='service' :logged='logged'>
			<span class="header_title">圆梦计划</span>
		</head-top>
		<section class="commission_tabel">
			<table cellspacing="0" cellpadding="0">
				<tr class="first_tr">
					<th>结算方式</th>
					<th>代替文字</th>
					<th>代替文字</th>
					<th>代替文字</th>
				</tr>
				<tr>
					<td colspan="4">代理佣金 = 当月纯输值 × 相应代理级别佣金比例； 当月纯输值 = 当月活跃玩家总输赢 - 玩家总优惠 - 平台费 - 之前累计的负纯收入；</td>
				</tr>
			</table>
		</section>
		<section class="common_content">
			<h2>合作优势：</h2>
			<p>您无需人力管理所发展的会员，交给我们完整的专业团队，为您提供全面的服务。 无需资金投入、无输赢风险、无法律风险、合作身份隐密，您的会员净输额最高达45%回报。
			</p>
			<p>如果您拥有一定的客户群，和良好的人际关系并且他们都喜欢博彩，您是网络精英，有自己的网站，有推广团队，您应该马上加入我们共同合作。</p>
			<h3>合作条件：</h3>
			<ul>
				<li>1、每月至少需要有3个活跃下线会员，您就可以按相应的条件获得佣金。</li>
				<li>2、合作伙伴每月推广真钱玩家人数及纯输值进行累计，负收益将被带入下一月计算。</li>
				<li>3、每月达到500rmb即可发放，当月低于500rmb将被累计到下一个月发放。</li>
				<li>4、我们要求合作伙伴月佣金的50%不能只来自于一个活跃玩家的净盈利，否则只能按25%进行佣金计算。</li>
				<li>5、佣金比例等级每月按下线会员在线人数及纯输值结算。</li>
				<li>6、代理如在自己链接下注册账号游戏，将不列入当月活跃玩家数据中。</li>
				<li>7、相同的IP地址、电话号码、银行卡号、开户姓名、邮箱地址、微信号、QQ号码均视为一个有效会员；</li>

			</ul>
		</section>

		<foot></foot>
	</div>

</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'

	export default {
		name: 'dreamchall',
		data() {
			return {
				goback: true,
				service: true,
				logged: true,
				sidbar: true,

			}
		},
		components: {
			HeadTop,
			Foot
		}

	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	@import '../../style/agency_common';
	.commission_tabel {
		table {
			width: 100%;
			overflow: hidden;
			background: #fff;
			padding-bottom: 0.5rem;
			.first_tr {
				@include wh(100%, 3.5rem);
				color: #fff;
				background: #f1981a;
				th {
					font-weight: normal;
					font-size: 1.4rem;
				}
			}
			tr {
				td {
					text-align: center;
					font-size: 1.4rem;
					padding: 0.8rem 0.5rem;
					color: #FF9900;
				}
			}
		}
	}
</style>