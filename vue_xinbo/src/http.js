import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery' //引用jq
import './http.js'

import axios from 'axios'
import VueAxios from 'vue-axios' //引入axios
Vue.use(VueAxios, axios)

//路由钩子
router.beforeEach((to, from, next) => {
	if(to.meta.requireAuth) { // 判断该路由是否需要登录权限
        let reToken = localStorage.refreshToken;
        let acToken = localStorage.accessToken;
        let siToken = localStorage.singleToken;
		if(reToken && acToken && siToken) { // 通过vuex state获取当前的token是否存在
			next();
		} else {
            localStorage.clear();
            next({path: '/login',query: {redirect: to.fullPath}}) // 将跳转的路由path作为参数，登录成功后跳转到该路由
		}
	} else {
		next();
	}
});

// http request 拦截器
axios.interceptors.request.use(
	config => {
		if(config.needToken){
            if (!config.notLoading) /* 不要加载层的加上notLoading:true */
                layer.open({type:2,shadeClose: false,});
            //获取token
           /* let reToken = window.sessionStorage.getItem('refreshToken');
            let acToken = window.sessionStorage.getItem('accessToken');
            let siToken = window.sessionStorage.getItem('singleToken');*/
		 	let reToken = localStorage.refreshToken;
		 	let acToken = localStorage.accessToken;
		 	let siToken = localStorage.singleToken;
            if(reToken && acToken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers['refreshToken'] = reToken;
                config.headers['Authorization'] = 'Bearer ' + acToken;
                config.headers['singleToken'] = siToken;
                //console.log('write to request:'+reToken);
            }else{
                //console.log('no token from storage');
            }
		}else{
            //console.log('no need token');
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// http response 拦截器
axios.interceptors.response.use(
	response => {
        layer.closeAll('loading');
        let reToken = response.headers.refreshtoken;
        let acToken = response.headers.authorization;
        let siToken = response.headers.singletoken;
        if(reToken && acToken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
           /* window.sessionStorage.setItem('refreshToken', reToken);
            window.sessionStorage.setItem('accessToken', acToken);
            window.sessionStorage.setItem('singleToken', siToken);*/
            localStorage.refreshToken = reToken;
            localStorage.accessToken = acToken;
            localStorage.singleToken = siToken;
            //console.log('write to storage by response header:'+reToken);
		}else{
            //console.log('no token from response header');
		}
		return response;
	},
	error => {
		if(error.response) {
			switch(error.response.status) {
				case 401:
					// 返回 401 清除token信息并跳转到登录页面
                   /* sessionStorage.removeItem('refreshToken');
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('singleToken');*/
                    let lay = layer.open({
                        content: '对不起，页面出错！请联系在线客服',
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            localStorage.clear();
                            router.push({path:'/login'});
                        }
                    });
			}
		}
		return Promise.reject(error.response.data); // 返回接口返回的错误信息
	});