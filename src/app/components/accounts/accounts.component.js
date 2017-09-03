import html from './accounts.html';
import * as UserActions from './../../actions/user.actions';
import { getUsers } from './../../actions/user.actions';
import groupby from 'lodash.groupby';
import assign from 'lodash.assign';

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
        ctrl.accountsToUser = accountsToUser;
        ctrl.checkIfUserBelongsToAccount = checkIfUserBelongsToAccount;
        let unsubscribe;

        ctrl.$onInit = function () {
            unsubscribe = $ngRedux.connect(mapStateToThis, UserActions)(ctrl);
            ctrl.getAccounts();
            ctrl.getUsers();
        };

        $ngRedux.subscribe(() => {
            if ($ngRedux.getState().app.users.length) {
                let temp = ctrl.users = $ngRedux.getState().app.users;

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
            }
        });


        ctrl.$onDestroy = function () {
            unsubscribe();
        };

        function removeAccount(id) {
            if ($window.confirm('Are you sure you would like to delete this account?')) {
                ctrl.deleteAccount(id);

            }
        }

        function mapStateToThis(state) {
            return {
                accounts: state.app.accountTypes
            };
        }

        function onSubmit(e) {
            if (ctrl.account_name.trim() !== '') {
                const data = {
                    "name": ctrl.account_name,
                };

                ctrl.postAccount(data);
                ctrl.account_name = '';
            }
        }

        function accountsToUser(account) {
            const tempAccount = assign({}, account);
            delete tempAccount.users;
            account.users.forEach((user) => {

                user.account_types = [...user.account_types, tempAccount];
            });

            ctrl.bulkUpdateUser(account.users);
            delete account.users;

        }

        function checkIfUserBelongsToAccount(id) {
            if (!ctrl.users) {
                return [];
            }
            return ctrl.users.filter((user) => {
                return user.account_types.find((account) => {
                    return account.id === id;
                }) === undefined;
            });
        }
        //end of AccountsComponent
    }
}