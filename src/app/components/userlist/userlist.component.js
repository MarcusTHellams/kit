import html from './userlist.component.html';

export default function (ngModule) {
    ngModule.component('userList', {
        controller: UserListComponent,
        template: html,
        bindings: {
            users: '<'
        }
    });
    UserListComponent.$inject = ['appService'];
    function UserListComponent(appService) {
        const ctrl = this;
    }
}