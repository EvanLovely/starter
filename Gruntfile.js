module.exports = function (grunt) {
  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {// https://github.com/sindresorhus/grunt-shell
      compass_compile: {
        command: 'compass compile'
      }
    },
    
    watch: {// https://github.com/gruntjs/grunt-contrib-watch
      scss: {
        files: [
          'scss/**/*.scss'
        ],
        tasks: [
          'shell:compass_compile'
        ]
      },
      js: {
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      }
    },

    parallel: {// https://www.npmjs.org/package/grunt-parallel
      watch: {
        tasks: [
          {
            grunt: true,
            stream: true,
            args: ['watch:scss']
          },
          {
            grunt: true,
            stream: true,
            args: ['watch:js']
          }
        ]
      }
    },

    jshint: {// https://www.npmjs.org/package/grunt-contrib-jshint
      options: {
        //jshintrc: true // change settings in `.jshintrc`
      },
      js: {
        src: ['<%= watch.js.files %>']
      }
    }

  });

  require('load-grunt-tasks')(grunt); // loads ALL dependencies in package.json. So this is not needed: `grunt.loadNpmTasks('grunt-contrib-connect');`

  //grunt.registerTask('sample_custom_js_task', 'Do whatever custom Grunt/JS task here', function () {
  //  //grunt.file.copy('', '');
  //  //grunt.file.delete('');
  //});
  
  grunt.registerTask('compile', 'shell:compass_compile'); // shorthand. `grunt compile` is shorter than `grunt shell:compass_compile`
  
  // what happens when just `grunt` is typed
  grunt.registerTask('default', [
    'shell:compass_compile',
    'parallel:watch'
  ]);
};


