import html from './accounts.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';
import groupby from 'lodash.groupby';

export default function (ngModule) {
    ngModule.component('accounts', {
        controller: AccountsComponent,
        template: html
    });
    AccountsComponent.$inject = ['appService', '$window', '$scope', '$ngRedux', '$timeout'];
    function AccountsComponent(appService, $window, $scope, $ngRedux, $timeout) {
        const ctrl = this;
        ctrl.removeAccount = removeAccount;
        ctrl.numOfUsers = {};
        ctrl.account_name = '';
        ctrl.onSubmit = onSubmit;
        let unsubscribe;

        ctrl.$onInit = function () {

            appService.getAccountTypes()
                .then((accounts) => {
                    ctrl.accounts = accounts;
                })
                .then(() => {
                    getNumberOfUsersOnAccount();
                });
        };


        ctrl.$onDestroy = function () {
        };

        function removeAccount(id) {
            if ($window.confirm('Are you sure you would like to delete this account?')) {

                appService.deleteAccount(id)
                    .then(() => {
                        appService.getAccountTypes()
                            .then((accounts) => {
                                ctrl.accounts = accounts;
                            })
                            .then(() => {
                                getNumberOfUsersOnAccount();
                            });
                    });

            }
        }

        function getNumberOfUsersOnAccount() {
            appService.getUsers()
                .then((users) => {
                    let temp;
                    ctrl.users = temp = users;
                    let temp2 = [];
                    temp = temp.map((user) => {
                        return user.account_types;
                    });

                    temp.forEach((user) => {
                        user.forEach((u) => {
                            temp2.push(u);
                        });
                    });

                    temp = groupby(temp2, (u) => {
                        return u.id;
                    });
                    ctrl.numOfUsers = temp;
                    //end of then
                });
        }

        function onSubmit(e) {
            if (ctrl.account_name.trim() !== '') {
                const data = {
                    "name": ctrl.account_name,
                };

                appService.addAccount(data)
                    .then(() => {
                        appService.getAccountTypes()
                            .then((accounts) => {
                                ctrl.accounts = accounts;
                            })
                            .then(() => {
                                getNumberOfUsersOnAccount();
                            });
                    });

                ctrl.account_name = '';
            }
        }
        //end of AccountsComponent
    }
}