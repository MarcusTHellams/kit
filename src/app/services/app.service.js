
export default function (ngModule) {
    ngModule.service('appService', AppService);
    AppService.$inject = ['$http'];

    function AppService($http) {

        return {
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser,
            getUser: getUser,
            getAccountTypes: getAccountTypes,
            updateUser: updateUser,
            deleteAccount: deleteAccount,
            addAccount: addAccount
        };

        function getUsers() {
            return $http
                .get('http://homework.kitcheck.com/api/user')
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function deleteUser(id) {
            return $http
                .delete(`http://homework.kitcheck.com/api/user/${id}`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function updateUser(info) {
            return $http
                .put(`http://homework.kitcheck.com/api/user/${info.id}`, { account_type_ids: info.account_type_ids })
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function addUser(data) {
            return $http
                .post(`http://homework.kitcheck.com/api/user/`, data)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }


        function addAccount(data) {
            return $http
                .post(`http://homework.kitcheck.com/api/account_type/`, data)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function getUser(id) {
            return $http
                .get(`http://homework.kitcheck.com/api/user/${id}`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function getAccountTypes() {
            return $http
                .get(`http://homework.kitcheck.com/api/account_type/`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function deleteAccount(id) {
            return $http
                .delete(`http://homework.kitcheck.com/api/account_type/${id}`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }
    }
}