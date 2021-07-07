restart-webapp: #: Restart webapp only
	cd tools-docker \
	&& docker-compose restart webapp

restart: #: Restart all
	cd tools-docker \
	&& docker-compose restart

start: #: Start all
	cd tools-docker \
	&& docker-compose up -d

stop: #: Stop All
	cd tools-docker \
	&& docker-compose down

help: #: Show help topics
	@grep "#:" Makefile* | grep -v "@grep" | sort | sed "s/\([A-Za-z_ -]*\):.*#\(.*\)/$$(tput setaf 3)\1$$(tput sgr0)\2/g"
