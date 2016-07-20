#!/bin/sh
npm run clean:build
npm run build
cp -r ./build/* ./server/static/
cd server
docker-machine env aws-01
eval $(docker-machine env aws-01) 
docker-machine scp -r ./static/ aws-01:~/
docker-compose build
docker-compose up -d
