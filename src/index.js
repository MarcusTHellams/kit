import angular from 'angular';
import 'angular-ui-router';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import AppComponent from './app/app.component';
import UserList from './app/components/userlist/userlist.component';
import AppService from './app/services/app.service';
import config from './config/app.config';
import store from './app/store/store';
import ngRedux from 'ng-redux';
import UserEpic from './app/epics/user.epics';
import UserEpic2 from './app/epics/user2.epic';
import UserDetail from './app/components/userdetail/userdetail.component';

const app = angular.module('myApp', ['ui.router', ngRedux])
    .config(config)
    .constant('store', store);


AppComponent(app);
UserList(app);
UserDetail(app);
AppService(app);
UserEpic2(app);


angular.element().ready(function () {
    angular.bootstrap(document, ['myApp']);
});
