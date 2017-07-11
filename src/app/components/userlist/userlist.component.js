import html from './userlist.component.html';
import { getUsers } from './../../actions/user.actions';

export default function (ngModule) {
    ngModule.component('userList', {
        controller: UserListComponent,
        template: html,
        bindings: {
            users: '<'
        }
    });
    UserListComponent.$inject = ['appService', '$window', '$scope', 'store'];
    function UserListComponent(appService, $window, $scope, store) {
        const ctrl = this;
        ctrl.deleteUser = deleteUser;

        ctrl.$onInit = function () {
            store.dispatch(getUsers());
        };

        store.subscribe(() => {
            ctrl.users2 = store.getState().users;
            console.log(ctrl.users2);
            $scope.$applyAsync();
        });

        function deleteUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                console.log(id);
            }
        }
        //end of UserListComponent
    }
}