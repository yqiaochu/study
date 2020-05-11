import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const searchdemo = r => require.ensure([], () => r(require('@/pages/searchdemo')), 'searchdemo');
const uploaddemo = r => require.ensure([], () => r(require('@/pages/uploaddemo')), 'uploaddemo');

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
            component: index,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: home,
                    children: []
                },
                {
                    path: '/searchdemo',
                    name: 'searchdemo',
                    component: searchdemo,
                    children: []
                },
                {
                    path: '/uploaddemo',
                    name: 'uploaddemo',
                    component: uploaddemo,
                    children: []
                },
            ]
		},
		
	]
})
