# hello-tools

Make life more automatical.


## Start node server

### Prepare node environment
- nvm
- latest node 

### Start client

```sh
cp .env.example .env
npm install
npm start
```

### Start server
```
cd server
node server.js
```


## Docker Installation for new rails project
### Create log files
```
touch webapp/log/nginx.access.log
touch webapp/log/nginx.error.log
```

### Prepare config variables

webapp

```
cp config/local_env.yml.example config/local_env.yml
cp config/database.yml.example config/database.yml
cp config/cable.yml.example config/cable.yml
```

docker

```
cd tools-docker
cp docker-compose.yml.example docker-compose.yml
cp docker/nginx/default.conf.example docker/nginx/default.conf
```

### Installation
```
docker-compose run --no-deps webapp rails new . --force --database=postgresql (Optional)
docker-compose run webapp bundle install
docker-compose run webapp rails webpacker:install
docker-compose run webapp rails assets:precompile
docker-compose run webapp rake db:create (Optional)
docker-compose run webapp rake db:migrate
```

### Start docker
```
cd tools-docker
docker-compose up
```
