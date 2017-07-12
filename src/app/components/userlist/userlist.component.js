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
        ctrl.removeUser = removeUser;
        ctrl.firstName = '';
        ctrl.lastName = '';
        ctrl.onSubmit = onSubmit;
        let unsubscribe;

        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getUsers();
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
                users: state.users
            };
        }

        function onSubmit(e) {
            if (ctrl.firstName.trim() !== '') {
                const data = {
                    first_name: ctrl.firstName,
                    last_name: ctrl.lastName
                };

                ctrl.postUser(data);
            }
        }
        //end of UserListComponent
    }
}