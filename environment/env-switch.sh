#!/bin/bash

case $1 in
"dev")
  echo "Generating Development environment .env files"
  cp -fr ./environment/dev.env .env
  cp -fr ./environment/docker-compose.dev.yml docker-compose.yml

  unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     
      cp -fr ./environment/Dockerfile.linux.dev Dockerfile
    ;;
    Darwin*)    
            cp -fr ./environment/Dockerfile.mac.dev Dockerfile
    ;;
 
    *)    
            cp -fr ./environment/Dockerfile.dev Dockerfile

esac
echo ${machine}



  ;;
"prod")
  echo "Generating Production environment .env files"
  cp -fr ./environment/prod.env .env
  cp -fr ./environment/docker-compose.prod.yml docker-compose.yml
  cp -fr ./environment/Dockerfile.prod Dockerfile

  ;;
esac

echo "✅ Done! Note that you should run 'docker-compose build api-api' to rebuild your container with the new changes applied.'

⚠️ WARNING: Make sure you change your CLIENT environment to match your API environment, otherwise it won't work!
"
