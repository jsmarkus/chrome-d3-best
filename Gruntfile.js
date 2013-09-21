module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify2: {

            options: {
                expose: {
                    jquery: './bower_components/jquery/jquery'
                }
            },

            main: {
                entry: './src/scripts/content',
                compile: '.tmp/scripts/content.js'
            }
        },

        uglify: {
            main: {
                src: '.tmp/scripts/content.js',
                dest: 'app/scripts/content.min.js'
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    dest: 'app/',
                    filter: 'isFile',
                    src: [
                        '**/*.json',
                        '**/*.png',
                        '**/*.css'
                    ]
                }]
            }
        },

        watch: {
            scripts: {
                files: [
                    'src/**/*.js',
                    'src/**/*.json',
                    'src/**/*.css'
                ],
                tasks: [
                    'browserify2',
                    'uglify',
                    'copy'
                ],
                options: {
                    nospawn: true,
                    atBegin: true
                }
            }
        },

        compress: {
            webstore: {
                options: {
                    archive: 'dist/webstore.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    dest: '.',
                    src: ['**']
                }]
            }
        },

        clean: {
            main: ['.tmp', 'app'],
            dist: ['dist']
        }

    });



    grunt.loadNpmTasks('grunt-browserify2');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['clean', 'browserify2', 'uglify', 'copy', 'compress']);
};