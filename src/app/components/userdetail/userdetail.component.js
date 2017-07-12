import html from './userdetail.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';

export default function (ngModule) {
    ngModule.component('userDetail', {
        controller: UserDetailComponent,
        template: html
    });
    UserDetailComponent.$inject = ['$window', '$scope', '$ngRedux', '$stateParams', '$state'];
    function UserDetailComponent($window, $scope, $ngRedux, $stateParams, $state) {
        const ctrl = this;
        ctrl.removeUser = removeUser;
        let unsubscribe;


        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getUser($stateParams.userId);
        };


        ctrl.$onDestroy = function () {
            unsubscribe();
        };


        function mapStateToThis(state) {
            return {
                user: state.users.selectedUser
            };
        }

        function removeUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                ctrl.deleteUser(id);
                $state.go('userlist');
            }
        }


        //end of UserDetailComponent
    }
}