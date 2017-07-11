import angular from 'angular';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import AppComponent from './app/app.component';

const app = angular.module('myApp', []);


AppComponent(app);

angular.element().ready(function () {
    angular.bootstrap(document, ['myApp']);
});
