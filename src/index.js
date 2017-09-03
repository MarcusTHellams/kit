import angular from 'angular';
import 'angular-ui-router';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'jquery/dist/jquery.min';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';
import AppComponent from './app/app.component';
import UserList from './app/components/userlist/userlist.component';
import AppService from './app/services/app.service';
import config from './config/app.config';
import store from './app/store/store';
import ngRedux from 'ng-redux';
import UserEpic from './app/epics/user.epics';
import UserEpic2 from './app/epics/user2.epic';
import UserDetail from './app/components/userdetail/userdetail.component';
import Accounts from './app/components/accounts/accounts.component';
import 'ui-select/dist/select.min.css';
import 'angular-sanitize';
import 'checklist-model';
import 'ui-select';

const app = angular.module('myApp', ['ui.router', ngRedux, 'checklist-model', 'ui.select', require('angular-sanitize')])
    .config(config)
    .constant('store', store);


AppComponent(app);
UserList(app);
UserDetail(app);
AppService(app);
UserEpic2(app);
Accounts(app);


angular.element().ready(function () {
    angular.bootstrap(document, ['myApp']);
});
