
CSS_DIR = public/css/
LESS_DIR = public/less/

JS_DIR = public/js/

JS_FILES = \
	${JS_DIR}vendor/jquery-1.7.1.min.js\
	${JS_DIR}vendor/jquery.validate.min.js\
	${JS_DIR}notify.jquery.js\
	${JS_DIR}app.js\

css:
	lessc ${LESS_DIR}index.less ${CSS_DIR}main.min.css -compress

js:
	cat ${JS_FILES} > ${JS_DIR}main.js
	uglifyjs -o ${JS_DIR}main.min.js --no-mangle --no-squeeze ${JS_DIR}main.js
	rm ${JS_DIR}main.js

run:
	always application.js

.PHONY: js css run