import Vue from 'vue';
import Router from 'vue-router';
import compass from 'components/compass/compass';
import demo from 'components/compass/demo';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     redirect: '/compass'
        // },
        {
            path: '/',
            component: compass
        },
        {
            path: '/demo',
            component: demo
        }
    ]
});
