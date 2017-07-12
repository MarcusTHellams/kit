import html from './userlist.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';

export default function (ngModule) {
    ngModule.component('userList', {
        controller: UserListComponent,
        template: html
    });
    UserListComponent.$inject = ['appService', '$window', '$scope', '$ngRedux', '$timeout'];
    function UserListComponent(appService, $window, $scope, $ngRedux, $timeout) {
        const ctrl = this;
        let unsubscribe;
        ctrl.deleteUser = deleteUser;

        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getUsers();
        };


        ctrl.$onDestroy = function () {
            unsubscribe();
        };

        function deleteUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                console.log(id);
                ctrl.deleteUser();

            }
        }

        function mapStateToThis(state) {
            return {
                users: state.users
            };
        }
        //end of UserListComponent
    }
}