config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.headers.common.Authorization = 'Token token=7c2c5856acd55913ff4e08e60242163d';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    const states = [
        {
            name: 'userlist',
            url: '/',
            component: 'userList',
            resolve: {
                users: getUsers
            }
        },
        {
            name: 'userdetail',
            url: '/user/{userId}',
            component: 'userDetail'
        }
    ];

    states.forEach(function (state) {
        $stateProvider.state(state);
    });

    getUsers.$inject = ['appService'];
    function getUsers(appService) {
        return appService.getUsers();
    }

}

export default config;