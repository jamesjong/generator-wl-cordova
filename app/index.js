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
      console.log('\nInstalling ' + this.wlServiceGenerator + ' plugin');
      if (!this.options['skip-install']) {
        this.installDependencies();
      }

    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous WlCordova generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

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

WlCordovaGenerator.prototype.askFor = function askFor() {
    'use strict';
    var cb,
        prompts;
    cb = this.async();

    prompts = [{
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
        }];


    this.prompt(prompts, function (props) {

        this.wlServiceGenerator = props.wlServiceGenerator;

        cb();
    }.bind(this));
};

module.exports = WlCordovaGenerator;
