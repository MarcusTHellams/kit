import html from './userdetail.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';
import union from 'lodash.union';


export default function (ngModule) {
    ngModule.component('userDetail', {
        controller: UserDetailComponent,
        template: html
    });
    UserDetailComponent.$inject = ['$window', '$scope', '$ngRedux', '$stateParams', '$state'];
    function UserDetailComponent($window, $scope, $ngRedux, $stateParams, $state) {
        const ctrl = this;
        ctrl.accountsToAdd = [];
        ctrl.removeUser = removeUser;
        ctrl.updateUserAccountTypes = updateUserAccountTypes;
        let unsubscribe;


        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getUser($stateParams.userId);
            ctrl.getAccounts();
        };


        ctrl.$onDestroy = function () {
            unsubscribe();
        };


        function mapStateToThis(state) {
            return {
                user: state.users.selectedUser,
                accounts: state.users.accountTypes
            };
        }

        function removeUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                ctrl.deleteUser(id);
                $state.go('userlist');
            }
        }

        function updateUserAccountTypes() {
            const user = {
                id: ctrl.user.id,
                account_type_ids: union(ctrl.accountsToAdd, ctrl.user.account_types.map((account) => {
                    return account.id;
                }))
            };
            ctrl.updateUser(user);
        }


        //end of UserDetailComponent
    }
}