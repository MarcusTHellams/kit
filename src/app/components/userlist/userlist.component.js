import html from './userlist.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';

export default function (ngModule) {
    ngModule.component('userList', {
        controller: UserListComponent,
        template: html
    });
    UserListComponent.$inject = ['appService', '$window', '$scope', '$ngRedux', '$timeout', '$http'];
    function UserListComponent(appService, $window, $scope, $ngRedux, $timeout, $http) {
        const ctrl = this;
        ctrl.removeUser = removeUser;
        ctrl.firstName = '';
        ctrl.lastName = '';
        ctrl.onSubmit = onSubmit;
        ctrl.scope = $scope;
        ctrl.removeAccountFromUser = removeAccountFromUser;
        let unsubscribe;



        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getUsers();
            // $http.get('https://autocomplete.demandbase.com/autocomplete?callback=jQuery1710768639861977386_1501295456836&version=v1.7.2&sequence=27&term=accenture&key=f783f64236befdcd4bfcb92c1d6e219a&records=1000&domain=hotmail.com&query=compass&_=1501295607203')
            //     .then(
            //     (resp) => {
            //         return JSON.parse(resp.data.slice(resp.data.indexOf('"pick') + 8, -2));
            //     },
            //     (resp) => {
            //         console.log(resp);
            //     }
            //     )
            //     .then(
            //     (resp) => { console.log(resp); }
            //     );
        };


        ctrl.$onDestroy = function () {
            unsubscribe();
        };

        function removeUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                ctrl.deleteUser(id);

            }
        }

        function mapStateToThis(state) {
            return {
                users: state.app.users
            };
        }

        function onSubmit(e) {
            if (ctrl.firstName.trim() !== '') {
                const data = {
                    first_name: ctrl.firstName,
                    last_name: ctrl.lastName
                };

                ctrl.postUser(data);
                ctrl.firstName = ctrl.lastName = '';

            }
        }

        function removeAccountFromUser(account, user) {
            let accounts = user.account_types.filter((acc) => {
                return acc.id !== account.id;
            });

            const data = {
                id: user.id,
                account_types: accounts
            };
            appService.updateUser(data)
                .then(() => {
                    ctrl.getUsers();
                });
        }
        //end of UserListComponent
    }
}