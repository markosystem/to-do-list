help:
	@echo "### Help ###"
	@echo "Docker is required"
	@echo "Initializing on server http://localhost:8080/"
	@echo ""

run:
	@echo "Up services"
	docker-compose -f docker/docker-compose.yml up
	@echo ""

down:
	@echo "Down services"
	docker-compose -f docker/docker-compose.yml down
	@echo ""

all: help run