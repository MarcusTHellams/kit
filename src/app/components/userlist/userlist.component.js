import html from './userlist.component.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';

export default function (ngModule) {
    ngModule.component('userList', {
        controller: UserListComponent,
        template: html
    });
    UserListComponent.$inject = ['appService', '$window', '$scope', '$timeout'];
    function UserListComponent(appService, $window, $scope, $timeout) {
        const ctrl = this;
        ctrl.removeUser = removeUser;
        ctrl.firstName = '';
        ctrl.lastName = '';
        ctrl.onSubmit = onSubmit;

        ctrl.$onInit = function () {
            appService.getUsers()
                .then((users) => {
                    ctrl.users = users;
                });
        };


        function removeUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {

                appService.deleteUser(id)
                    .then(() => {
                        appService.getUsers()
                            .then((users) => {
                                ctrl.users = users;
                            });
                    });
            }

        }

        function onSubmit(e) {
            if (ctrl.firstName.trim() !== '') {
                const data = {
                    first_name: ctrl.firstName,
                    last_name: ctrl.lastName
                };

                appService.addUser(data)
                    .then(() => {
                        appService.getUsers()
                            .then((users) => {
                                ctrl.users = users;
                            });
                    });


                ctrl.firstName = ctrl.lastName = '';

            }
        }
        //end of UserListComponent
    }
}