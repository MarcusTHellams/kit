
export default function (ngModule) {
    ngModule.service('appService', AppService);
    AppService.$inject = ['$http'];

    function AppService($http) {

        return {
            getUsers: getUsers,
            deleteUser: deleteUser,
            addUser: addUser
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

        function addUser(data) {
            return $http
                .post(`http://homework.kitcheck.com/api/user/`, data)
                .then(
                (resp) => { return resp.data; },
                (err) => { console.log(err.data.message); }
                );
        }
    }
}