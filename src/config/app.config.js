import store from './../app/store/store';
import reducers from './../app/reducers';
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$ngReduxProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ngReduxProvider) {

    $httpProvider.defaults.headers.common.Authorization = 'Token token=7c2c5856acd55913ff4e08e60242163d';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $ngReduxProvider.createStoreWith(reducers, ['userEpic']);

    const states = [
        {
            name: 'userlist',
            url: '/',
            component: 'userList'
        },
        {
            name: 'userdetail',
            url: '/user/{userId}',
            component: 'userDetail'
        },
        {
            name: 'accounts',
            url: '/accounts',
            component: 'accounts'
        }
    ];

    states.forEach(function (state) {
        $stateProvider.state(state);
    });

}

export default config;