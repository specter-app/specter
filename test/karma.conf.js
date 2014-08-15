module.exports = function(config){
  config.set({

    basePath : '..',

    frameworks: ['jasmine'],

    files : [
      'www/lib/ionic/js/angular/angular.js',
      'www/lib/lodash.min.js',
      'http://maps.googleapis.com/maps/api/js?libraries=visualization,geometry&sensor=false&language=en&v=3.14',
      'www/lib/*.js',
      'www/lib/ionic/**/*.js',
      'www/js/*.js',
      'www/**/*.js',
      'test/angular-mocks.js',
      // 'test/*js',
      'test/unit/*Spec.js'
    ],

    autoWatch : true,

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
