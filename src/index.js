import angular from 'angular';
import 'angular-ui-router';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'jquery/dist/jquery.min';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';
import AppComponent from './app/app.component';
import UserList from './app/components/userlist/userlist.component';
import AppService from './app/services/app.service';
import config from './config/app.config';
import UserDetail from './app/components/userdetail/userdetail.component';
import Accounts from './app/components/accounts/accounts.component';
import 'checklist-model';

const app = angular.module('myApp', ['ui.router', 'checklist-model'])
    .config(config);

AppComponent(app);
UserList(app);
UserDetail(app);
AppService(app);
Accounts(app);


angular.element().ready(function () {
    angular.bootstrap(document, ['myApp']);
});
