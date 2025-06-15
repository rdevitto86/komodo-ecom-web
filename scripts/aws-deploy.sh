#!/bin/bash

# scripts/aws-deploy.sh - Production deployment to AWS with custom domain

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${1:-}
AWS_REGION=${AWS_REGION:-us-east-1}
ECR_REPOSITORY=${ECR_REPOSITORY:-react-app}
ECS_CLUSTER=${ECS_CLUSTER:-react-app-cluster}
ECS_SERVICE=${ECS_SERVICE:-react-app-service}
IMAGE_TAG=${IMAGE_TAG:-$(date +%Y%m%d-%H%M%S)}

# Validation
if [ -z "$DOMAIN" ]; then
    echo -e "${RED}❌ Error: Domain not provided${NC}"
    echo "Usage: $0 yourdomain.com"
    exit 1
fi

if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo -e "${RED}❌ Error: AWS_ACCOUNT_ID not set${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Starting deployment to AWS...${NC}"
echo -e "${YELLOW}Domain: $DOMAIN${NC}"
echo -e "${YELLOW}Image Tag: $IMAGE_TAG${NC}"

# Build production image
echo -e "${GREEN}📦 Building production Docker image...${NC}"
docker build -t $ECR_REPOSITORY:$IMAGE_TAG \
    --build-arg VITE_API_URL=https://api.$DOMAIN \
    --build-arg NODE_ENV=production .

# AWS ECR Login
echo -e "${GREEN}🔐 Logging into AWS ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create ECR repository if it doesn't exist
aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION || \
    aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION

# Tag and push image
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY"
docker tag $ECR_REPOSITORY:$IMAGE_TAG $ECR_URI:$IMAGE_TAG
docker tag $ECR_REPOSITORY:$IMAGE_TAG $ECR_URI:latest

echo -e "${GREEN}📤 Pushing image to ECR...${NC}"
docker push $ECR_URI:$IMAGE_TAG
docker push $ECR_URI:latest

# Update task definition
echo -e "${GREEN}📋 Updating ECS task definition...${NC}"
TASK_DEFINITION=$(aws ecs describe-task-definition \
    --task-definition $ECS_SERVICE \
    --region $AWS_REGION \
    --query taskDefinition)

# Create new task definition with updated image
echo $TASK_DEFINITION | jq \
    --arg IMAGE "$ECR_URI:$IMAGE_TAG" \
    --arg DOMAIN "$DOMAIN" \
    '.containerDefinitions[0].image = $IMAGE |
     .containerDefinitions[0].environment = [
       {"name": "NODE_ENV", "value": "production"},
       {"name": "VITE_API_URL", "value": ("https://api." + $DOMAIN)},
       {"name": "VITE_APP_URL", "value": ("https://" + $DOMAIN)}
     ]' > new-task-definition.json

# Register new task definition
NEW_TASK_DEF_ARN=$(aws ecs register-task-definition \
    --cli-input-json file://new-task-definition.json \
    --region $AWS_REGION \
    --query taskDefinition.taskDefinitionArn --output text)

echo -e "${GREEN}✅ New task definition: $NEW_TASK_DEF_ARN${NC}"

# Update ECS service
echo -e "${GREEN}🔄 Updating ECS service...${NC}"
aws ecs update-service \
    --cluster $ECS_CLUSTER \
    --service $ECS_SERVICE \
    --task-definition $NEW_TASK_DEF_ARN \
    --region $AWS_REGION

# Wait for deployment to complete
echo -e "${GREEN}⏳ Waiting for deployment to complete...${NC}"
aws ecs wait services-stable \
    --cluster $ECS_CLUSTER \
    --services $ECS_SERVICE \
    --region $AWS_REGION

# Cleanup
rm -f new-task-definition.json

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${YELLOW}🌐 Your app should be available at: https://$DOMAIN${NC}"
echo -e "${YELLOW}📊 Check ECS console: https://console.aws.amazon.com/ecs/home?region=$AWS_REGION#/clusters/$ECS_CLUSTER/services${NC}"

# Health check
echo -e "${GREEN}🏥 Performing health check...${NC}"
sleep 30
if curl -f https://$DOMAIN/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${YELLOW}⚠️  Health check failed - app might still be starting${NC}"
fi