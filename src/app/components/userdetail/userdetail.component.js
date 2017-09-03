import html from './userdetail.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';
import union from 'lodash.union';
import map from 'lodash.map';


export default function (ngModule) {
    ngModule.component('userDetail', {
        controller: UserDetailComponent,
        template: html
    });
    UserDetailComponent.$inject = ['$window', '$scope', '$ngRedux', '$stateParams', '$state', '$timeout'];
    function UserDetailComponent($window, $scope, $ngRedux, $stateParams, $state, $timeout) {
        const ctrl = this;
        ctrl.accountsToAdd = [];
        ctrl.removeUser = removeUser;
        ctrl.updateUserAccountTypes = updateUserAccountTypes;
        ctrl.deleteAccountFromUser = deleteAccountFromUser;
        let unsubscribe;


        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getUser($stateParams.userId);
            ctrl.getAccounts();
        };

        $ngRedux.subscribe(() => {
            const state = $ngRedux.getState();
            if (state.app.accountTypes.length && state.app.selectedUser.hasOwnProperty('id')) {
                const { accountTypes, selectedUser } = state.app;
                const sUserAT = map(selectedUser.account_types, 'id');
                const tempAccountTypes = accountTypes.filter((account) => {
                    return sUserAT.indexOf(account.id) === -1;
                });
                $timeout(function () {
                    ctrl.accounts = tempAccountTypes;
                }, 0);
            }

        });



        ctrl.$onDestroy = function () {
            unsubscribe();
        };


        function mapStateToThis(state) {
            return {
                user: state.app.selectedUser,
                accounts: state.app.accountTypes
            };
        }

        function removeUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                ctrl.deleteUser(id);
                $state.go('userlist');
            }
        }

        function updateUserAccountTypes() {
            if (ctrl.accountsToAdd.length === 0) {
                return;
            }
            let accounts = union(ctrl.accountsToAdd, ctrl.user.account_types);
            const user = {
                id: ctrl.user.id,
                account_types: accounts
            };
            ctrl.updateUser(user);
            ctrl.accountsToAdd = [];
        }

        function deleteAccountFromUser(account) {
            let accounts = ctrl.user.account_types.filter((acc) => {
                return acc.id !== account.id;
            });
            // ctrl.accountsToAdd = [];
            const user = {
                id: ctrl.user.id,
                account_types: accounts
            };
            ctrl.updateUser(user);
        }


        //end of UserDetailComponent
    }
}