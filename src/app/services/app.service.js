
export default function (ngModule) {
    ngModule.service('appService', AppService);
    AppService.$inject = ['$http'];

    function AppService($http) {
        const url = 'http://localhost:3000';

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
                .get(`${url}/user`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function deleteUser(id) {
            return $http
                .delete(`${url}/user/${id}`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function updateUser(info) {
            return $http
                .put(`${url}/user/${info.id}`, { account_types: info.account_types })
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function addUser(data) {
            return $http
                .post(`${url}/user/`, data)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }


        function addAccount(data) {
            return $http
                .post(`${url}/account_type/`, data)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function getUser(id) {
            return $http
                .get(`${url}/user/${id}`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function getAccountTypes() {
            return $http
                .get(`${url}/account_type/`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }

        function deleteAccount(id) {
            return $http
                .delete(`${url}/account_type/${id}`)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }
    }
}