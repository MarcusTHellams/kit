import html from './app.component.html';

export default function (ngModule) {
    ngModule.component('app', {
        controller: AppComponent,
        template: html
    });
    AppComponent.$inject = [];
    function AppComponent() { }
}