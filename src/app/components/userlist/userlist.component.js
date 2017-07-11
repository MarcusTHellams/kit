import html from './userlist.component.html';

export default function (ngModule) {
    ngModule.component('userList', {
        controller: UserListComponent,
        template: html,
        bindings: {
            users: '<'
        }
    });
    UserListComponent.$inject = ['appService', '$window'];
    function UserListComponent(appService, $window) {
        const ctrl = this;
        ctrl.deleteUser = deleteUser;

        function deleteUser(id) {
            if ($window.confirm('Are you sure you would like to delete this user?')) {
                console.log(id);
            }
        }
        //end of UserListComponent
    }
}