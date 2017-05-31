module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'css/main.css': 'css/main.scss',
        },
      },
    },
    copy: {
      dist: {
        files: {
          'scripts/jquery.min.js': 'node_modules/jquery/dist/jquery.min.js',
          'scripts/jquery.min.map': 'node_modules/jquery/dist/jquery.min.map',
        },
      },
    },
    watch: {
      scripts: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'copy']);

};