'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var WlCordovaGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      console.log('\nInstalling ' + this.wlServiceGenerator + ' plugin for ' + this.mobilePlatform);
      if (!this.options['skip-install']) {
        console.log('\n-->installing package dependencies');
        this.installDependencies();
      }
      console.log('\n-->installing frameworks');
      console.log('\n-->installing plugin native files');
      console.log('\n-->installing plugin javascript files');
      console.log('\n-->updating html to include plugin script tag');
      console.log('\n-->ALL DONE!');
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous WlCordova generator!'));

    var prompts = [
      {
      type: 'list',
      name: 'wlServiceGenerator',
      message: 'Select a service plugin to install?',
      choices: [
          {
              name: 'Bluemix CloudCode',
              value: 'bluemix-cloudcode'
          },
          {
              name: 'Bluemix Data',
              value: 'bluemix-data'
          },
          {
              name: 'Bluemix Push',
              value: 'bluemix-push'
          },
          {
              name: 'Other',
              value: 'other'
          }]
      },
      {
        type: 'list',
        name: 'mobilePlatform',
        message: 'Choose a platform',
        choices: [
            {
                name: 'Android',
                value: 'platform-android'
            },
            {
                name: 'iOS',
                value: 'platform-ios'
            },
            {
                name: 'ALL',
                value: 'platform-all'
            }]
        }];

    this.prompt(prompts, function (props) {
      this.wlServiceGenerator = props.wlServiceGenerator;
      this.mobilePlatform = props.mobilePlatform;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = WlCordovaGenerator;
