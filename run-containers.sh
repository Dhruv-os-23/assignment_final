#!/bin/bash


echo "Pulling the latest images from Docker Hub..."
docker-compose pull

echo "Starting the containers..."
docker-compose up -d

echo "Containers are up and running:"
docker-compose ps