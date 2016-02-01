var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    processhtml: {
      dist: {
        files: {
          'dist/index.html' : ['index.html'],
        }
      }
    },
    copy: {
      dist: {
       files: [
          {
            expand: true,
            cwd: '<%= config.app %>/_lib/bootstrap',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          }
        ]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= config.dist %>/css/styles.min.css': [
              '<%= config.app %>/_lib/bootstrap/dist/css/bootstrap.min.css', 
              'css/*.css'
          ]
          }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/scripts.min.js': [
            '<%= bower.directory %>/jquery/jquery.js',
            '<%= bower.directory %>/angular/angular.js',
            'js/**/*.js',
          ]
        }
      }
    },
    'http-server': {
 
        'dev': {
            port: 8280,
            host: "127.0.0.2",
            cache: 8,
            showDir : false,
            autoIndex: false,
            ext: "html",
            runInBackground: false,
            openBrowser : true
        }
 
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', [
    'copy',
    'cssmin',
    'uglify',
    'processhtml',
    'http-server'

  ]);
};