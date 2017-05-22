module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            coffee_to_js: {
                options: {
                    bare: true,
                    sourceMap: true
                },
                expand: true,
                flatten: false,
                cwd: '',
                src: ['**/*.coffee', '*.coffee'],
                dest: '',
                ext: '.js'
            }
        }
    });

    // Load the plugin that provides the 'uglify' task.
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Default task(s).
    grunt.registerTask('default', ['coffee']);

};