import html from './userdetail.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';
import union from 'lodash.union';


export default function (ngModule) {
    ngModule.component('userDetail', {
        controller: UserDetailComponent,
        template: html
    });
    UserDetailComponent.$inject = ['appService', '$window', '$scope', '$stateParams', '$state'];
    function UserDetailComponent(appService, $window, $scope, $stateParams, $state) {
        const ctrl = this;
        ctrl.accountsToAdd = [];
        ctrl.removeUser = removeUser;
        ctrl.updateUserAccountTypes = updateUserAccountTypes;
        let unsubscribe;


        ctrl.$onInit = function () {

            appService.getUser($stateParams.userId)
                .then((user) => {
                    ctrl.user = user;
                });

            appService.getAccountTypes()
                .then((accounts) => {
                    ctrl.accounts = accounts;
                });
        };


        ctrl.$onDestroy = function () {
        };


        function removeUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {

                appService.deleteUser(id)
                    .then(() => {
                        $state.go('userlist');
                    });
            }
        }

        function updateUserAccountTypes() {
            const user = {
                id: ctrl.user.id,
                account_type_ids: union(ctrl.accountsToAdd, ctrl.user.account_types.map((account) => {
                    return account.id;
                }))
            };

            appService.updateUser(user)
                .then(() => {
                    appService.getUser($stateParams.userId)
                        .then((user) => {
                            ctrl.user = user;
                        });
                });
        }


        //end of UserDetailComponent
    }
}