import Vue from 'vue'
import Router from 'vue-router'

import My from '@/page/mine/my'
import About from '@/page/mine/about'
import BankCard from '@/page/mine/bank_card'
import Record from '@/page/mine/record'

//各种记录查询
import RecordDetail from '@/page/mine/record/detail'
//充值
import Pay from '@/page/mine/pay/pay'
import Order from '@/page/mine/pay/order'
import Mt from '@/page/mine/pay/mt'
import OnlinePay from '@/page/mine/pay/onlinePay'
import Wechat from '@/page/mine/pay/wechat'
//提款
import Drawing from '@/page/mine/drawing/draw'
//户内转账
import Indoor from '@/page/mine/indoor/indoor'
//首页、启动页
import Home from '@/page/home/home'
import StartPages from '@/page/startPages'
//登录注册
import Login from '@/page/login/login'
import Register from '@/page/login/register'
import ForgetPass from '@/page/login/forgetPass'
//优惠活动
import Preferential from '@/page/preferential/preferential'
//代理
import JoinIn from '@/page/agency/joinIn'
import Introduction from '@/page/agency/brand-Introduction'
import Questions from '@/page/agency/questions'
import Commission from '@/page/agency/commission-shows'
import DreamChall from '@/page/agency/dreamChall'
import ContactUs from '@/page/agency/contact-us'
import Agency from '@/page/agency/agency-Index'
//quick-play
import GameFast from '@/page/quick-play/gameFast_new'
//import GameFast from '@/page/quick-play/gameFast'

import ExpandLogin from '@/page/expandLogin'


Vue.use(Router);

export default new Router({
	routes: [{
			path: "*",
			component: Home
		}, //路径不存在跳转回首页
		{
			path: '/home',
			name: 'Home',
			component: Home,
		},
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/my',
			name: 'My',
			meta:{
				requireAuth:true,
			},
			component: My
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/forgetPass',
			name: 'ForgetPass',
			component: ForgetPass
		},
		{
			path: '/about',
			name: 'About',
			component: About,
			meta:{
				requireAuth:true,
			},
		},
		{
			path: '/bank_card',
			name: 'BankCard',
			component: BankCard,
			meta:{
				requireAuth:true,
			},
		},

		{
			path: '/joinIn',
			name: 'JoinIn',
			component: JoinIn,
		},
		{
			path: '/introduction',
			name: 'Introduction',
			component: Introduction,
		},
		{
			path: '/questions',
			name: 'Questions',
			component: Questions,
		},
		{
			path: '/commission',
			name: 'Commission',
			component: Commission,
		},

		{
			path: '/preferential',
            name: 'Preferential',
            component: Preferential,
		},
		{
			path: '/dreamChall',
			name: 'DreamChall',
			component: DreamChall,
		},
		{
			path: '/contactUs',
			name: 'ContactUs',
			component: ContactUs,
		},
		{
			path: '/agency',
			name: 'Agency',
			component: Agency,
		},

		{
			path: '/gameFast',
            name: 'GameFast',
            component: GameFast,
		},

		{
			path: '/record',
			name: 'Record',
			component: Record,
			meta:{
				requireAuth:true,
			},
		},
        {
            path: '/recordDetail',
            name: 'RecordDetail',
            component: RecordDetail,
            meta:{
                requireAuth:true,
            },
        },
		{
			path: '/pay',
			//	      	name: 'Pay',
			component: Pay,
			meta:{
				requireAuth:true,
			},
			children: [{
					path: 'mt',
					name: 'Mt',
					component: Mt,
					meta:{
						requireAuth:true,
					},
				},
				{
					path: 'onlinePay',
					name: 'OnlinePay',
					component: OnlinePay,
					meta:{
						requireAuth:true,
					},
				},
				{
					path: 'wechat',
					name: 'Wecaht',
					component: Wechat,
					meta:{
						requireAuth:true,
					},
				}
			]
		},
		{
			path: '/order/:bill_no',
			name: 'Order',
			component: Order,
			meta:{
					requireAuth:true,
				},
		},
		{
			path: '/drawing',
			name: 'Drawing',
			component: Drawing,
			meta:{
					requireAuth:true,
				},
		},
		{
			path: '/indoor',
			name: 'Indoor',
			component: Indoor,
			meta:{
					requireAuth:true,
				},
		},
        {
            path: '/expandLogin',
            name: 'ExpandLogin',
            component: ExpandLogin,
        }
	]
})