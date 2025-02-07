module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        nggettext_extract: {
            fatima: {
                files: {
                    'template.pot': [__dirname + '/**/*.html', __dirname + '/**/*.js']
                }
            }
        },
        nggettext_compile: {
            fatima: {
                files: {
                    'translations.js': [__dirname + "/*.po"]
                }
            },
        },
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            bundles: {
                options: {
                    mangle: {
                        reserved: ['angular', '$', 'ol', 'define', 'Api']
                    },
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: ["bundle.js", "!" + __dirname + "/bundle.min.js"],
                    dest: 'dist',
                    cwd: '.',
                    rename: function(dst, src) {
                        return src.replace('.js', '.min.js');
                    }
                }]
            }
        },
        "jsbeautifier": {
            "default": {
                src: [__dirname + "/hslayers.js", __dirname + "/app.js", __dirname + "/*.js", "!" + __dirname + "/bundle.js", "!" + __dirname + "/bundle.min.js"]
            },
            "git-pre-commit": {
                src: [__dirname + "/hslayers.js", __dirname + "/app.js", "!" + __dirname + "/bundle.js", "!" + __dirname + "/bundle.min.js"]
            }
        },
        jsdoc: {
            dist: {
                src: ['components/**/*.js'],
                options: {
                    destination: 'docs',
                    configure: 'node_modules/angular-jsdoc/common/conf.json',
                    template: 'node_modules/angular-jsdoc/angular-template',
                    readme: './README.md'
                }
            }
        },
        exec: {
            build: 'node browserify.js && grunt'
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['exec'],
                options: {
                    spawn: false,
                },
            },
        },

    });

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jsbeautifier', 'uglify']);
    grunt.registerTask('git-pre-commit', ['jsbeautifier']);


};
