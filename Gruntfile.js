module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {

            options: {
                alias: ['components/jquery/jquery.js:jquery']
            },

            main: {
                src: ['src/scripts/content.js'],
                dest: '.tmp/scripts/content.js'
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
                    }
                ]
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
                        'browserify',
                        'uglify',
                        'copy'
                ],
                options: {
                    nospawn: true
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
                    }
                ]
            }
        },

        clean: {
            main: ['.tmp', 'app'],
            dist: ['dist']
        }

    });



    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['clean', 'browserify', 'uglify', 'copy', 'compress']);
};