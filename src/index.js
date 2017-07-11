import angular from 'angular';
import 'angular-ui-router';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import AppComponent from './app/app.component';
import UserList from './app/components/userlist/userlist.component';
import AppService from './app/services/app.service';
import config from './config/app.config';

const app = angular.module('myApp', ['ui.router'])
    .config(config);


AppComponent(app);
UserList(app);
AppService(app);


angular.element().ready(function () {
    angular.bootstrap(document, ['myApp']);
});
