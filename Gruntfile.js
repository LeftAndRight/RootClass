module.exports = function(grunt) {

	grunt.initConfig({
		"file-creator": {
			global: {
				"dist/rootclass.js": function(fs, fd, done){
					var wrapper = grunt.file.read("src/Wrapper.js");
					var main	= grunt.file.read("src/RootClass.js");
					wrapper		= wrapper.replace("$RootClass$", main);
					fs.writeSync(fd, wrapper);
					done();
				}
			},
			angular: {
				"dist/rootclass-angular.js": function(fs, fd, done){
					var wrapper = grunt.file.read("src/WrapperAngular.js");
					var main	= grunt.file.read("src/RootClass.js");
					wrapper		= wrapper.replace("$RootClass$", main);
					fs.writeSync(fd, wrapper);
					done();
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-file-creator");

	grunt.registerTask("default", ["file-creator"]);
};