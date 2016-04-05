module.exports = function(grunt) {

var rewrite = require('connect-modrewrite');
    
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
   handlebars: {
    all: {
        files: {
            "js/templates.js": ["templates/**/*.hbs"]
        }
    }
   },
      connect: {
    server: {
        options: {
            keepalive: true,
	    protocol: 'https',
            hostname: 'localhost',
            port: '8000',
	    middleware: function(connect, options, middlewares) {

                // the rules that shape our mod-rewrite behavior
                var rules = [
                    '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                ];

                // add rewrite as first item in the chain of middlewares
                middlewares.unshift(rewrite(rules));

                return middlewares;
            }
        }
    }
      },
watch: {
options: {
        atBegin: true
    },
            handlebars: {
                files: ['templates/**/*.hbs'],
                tasks: ['handlebars']
            }
        }
          
});

grunt.loadNpmTasks('grunt-contrib-connect');
    
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.loadNpmTasks('grunt-contrib-watch');


};
