var gulp =   require('gulp');
var pug =    require("gulp-pug");
var uglify = require("gulp-uglify");

var transformMarkdown = function(text) {
	var md = require('markdown-it')();
	var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};
	
	md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
		tokens[idx].attrPush(['target', '_blank']);
		return defaultRender(tokens, idx, options, env, self);
	};

	return md.render(text)
};

gulp.task("css", function() {
	return gulp.src("src/css/*.css")
		.pipe(gulp.dest("dist"));
});

gulp.task("pug-index", function() {
	return gulp.src("src/pug/index.pug")
		.pipe(pug())
		.pipe(gulp.dest("dist"));
});

gulp.task("pug-blog", function() {
	pug_filters = {
		'markdown': transformMarkdown
	}
	return gulp.src("src/pug/blog/*.pug")
		.pipe(pug({'filters': pug_filters}))
		.pipe(gulp.dest("dist/blog"));
});

gulp.task("js", function() {
	return gulp.src("src/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});

gulp.task("files", function() {
	return gulp.src("src/files/*")
		.pipe(gulp.dest("dist/files"));
});

gulp.task("highlightjs", function() {
	return gulp.src(["node_modules/highlightjs/styles/solarized-dark.css", "node_modules/highlightjs/highlight.pack.min.js"])
		.pipe(gulp.dest("dist"));
});

gulp.task("keybase", function() {
	return gulp.src("src/keybase.txt")
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["files", "js", "css", "pug-index", "pug-blog", "keybase", "highlightjs"]);
