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
		},


		karma : {
			unit : {
				options :{
					// Build the list of files from the fileRegister and add some test files
					files: [
						"dist/rootclass.js",
						"test/rootclass-test.js"
					],
					basePath	: "",
					frameworks	: ["jasmine"],
					reporters	: ["spec"],
					logLevel	: "INFO",
					autoWatch	: true,
					browsers	: ["PhantomJS"],
					singleRun	: true
				}
			}
		}
	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["file-creator", "karma"]);
};