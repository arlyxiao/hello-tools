prepare_app = 'cd ../nodeapp \
  && npm install && cd server && forever server.js \
  && cd ../../webapp \
  && rm -rf ../webapp/public/assets/* \
  && bundle install \
	&& rake db:migrate \
	&& yarn install \
	&& RAILS_ENV=production rails assets:precompile \
	&& NODE_ENV=production rails webpacker:compile'

restart-webapp: #: Restart webapp
	cd tools-docker \
	&& docker-compose restart webapp

restart: #: Restart all
	docker exec -ti tools-docker_webapp_1 bash -c $(prepare_app) \
	&& cd tools-docker \
	&& docker-compose restart

start: #: Start all
	cd tools-docker \
	&& docker-compose down \
	&& docker-compose run -d --name tools-docker_webapp_1 webapp \
	&& docker exec -ti tools-docker_webapp_1 bash -c $(prepare_app) \
	&& docker-compose down \
	&& docker-compose up -d --remove-orphan

stop: #: Stop All
	cd tools-docker \
	&& docker-compose down

help: #: Show help
	@grep "#:" Makefile* | grep -v "@grep" | sort | sed "s/\([A-Za-z_ -]*\):.*#\(.*\)/$$(tput setaf 3)\1$$(tput sgr0)\2/g"
