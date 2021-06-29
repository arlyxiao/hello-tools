restart-webapp: #: Restart webapp only
	cd tools-docker \
	&& docker-compose restart webapp

restart-webapp-with-assets: #: Restart webapp includes webpack compiling
	cd tools-docker \
	&& docker-compose restart webpack \
	&& docker-compose restart webapp

restart-webapp-all: #: Restart webapp all
	cd tools-docker \
	&& docker-compose restart

restart-nginx: #: Restart nginx
	cd tools-docker \
	&& docker-compose restart nginx

restart-db: #: Restart nginx
	cd tools-docker \
	&& docker-compose restart db

restart-all: #: Restart all
	cd tools-docker \
	&& docker-compose restart

start-all-bg: #: Start all in background
	cd tools-docker \
	&& docker-compose up -d

start-all: #: Start all
	cd tools-docker \
	&& docker-compose up

stop-all: #: Stop All
	cd tools-docker \
	&& docker-compose down

help: #: Show help topics
	@grep "#:" Makefile* | grep -v "@grep" | sort | sed "s/\([A-Za-z_ -]*\):.*#\(.*\)/$$(tput setaf 3)\1$$(tput sgr0)\2/g"
