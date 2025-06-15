
#!/bin/bash

# scripts/aws-infrastructure.sh - Setup AWS infrastructure for production

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DOMAIN=${1:-}
AWS_REGION=${AWS_REGION:-us-east-1}
CLUSTER_NAME=${ECS_CLUSTER:-react-app-cluster}
SERVICE_NAME=${ECS_SERVICE:-react-app-service}

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}❌ Error: Domain not provided${NC}"
    echo "Usage: $0 yourdomain.com"
    exit 1
fi

echo -e "${GREEN}☁️  Setting up AWS infrastructure for $DOMAIN...${NC}"

# Create VPC and networking
echo -e "${GREEN}🌐 Creating VPC and networking...${NC}"
VPC_ID=$(aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --query 'Vpc.VpcId' \
    --output text \
    --region $AWS_REGION)

aws ec2 create-tags \
    --resources $VPC_ID \
    --tags Key=Name,Value=react-app-vpc \
    --region $AWS_REGION

# Create subnets
SUBNET_1_ID=$(aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.1.0/24 \
    --availability-zone ${AWS_REGION}a \
    --query 'Subnet.SubnetId' \
    --output text \
    --region $AWS_REGION)

SUBNET_2_ID=$(aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.2.0/24 \
    --availability-zone ${AWS_REGION}b \
    --query 'Subnet.SubnetId' \
    --output text \
    --region $AWS_REGION)

# Create Internet Gateway
IGW_ID=$(aws ec2 create-internet-gateway \
    --query 'InternetGateway.InternetGatewayId' \
    --output text \
    --region $AWS_REGION)

aws ec2 attach-internet-gateway \
    --vpc-id $VPC_ID \
    --internet-gateway-id $IGW_ID \
    --region $AWS_REGION

# Create route table
ROUTE_TABLE_ID=$(aws ec2 create-route-table \
    --vpc-id $VPC_ID \
    --query 'RouteTable.RouteTableId' \
    --output text \
    --region $AWS_REGION)

aws ec2 create-route \
    --route-table-id $ROUTE_TABLE_ID \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id $IGW_ID \
    --region $AWS_REGION

# Associate subnets with route table
aws ec2 associate-route-table \
    --subnet-id $SUBNET_1_ID \
    --route-table-id $ROUTE_TABLE_ID \
    --region $AWS_REGION

aws ec2 associate-route-table \
    --subnet-id $SUBNET_2_ID \
    --route-table-id $ROUTE_TABLE_ID \
    --region $AWS_REGION

# Create security group
SECURITY_GROUP_ID=$(aws ec2 create-security-group \
    --group-name react-app-sg \
    --description "Security group for React app" \
    --vpc-id $VPC_ID \
    --query 'GroupId' \
    --output text \
    --region $AWS_REGION)

# Allow HTTP and HTTPS traffic
aws ec2 authorize-security-group-ingress \
    --group-id $SECURITY_GROUP_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

aws ec2 authorize-security-group-ingress \
    --group-id $SECURITY_GROUP_ID \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

# Create ECS cluster
echo -e "${GREEN}🐳 Creating ECS cluster...${NC}"
aws ecs create-cluster \
    --cluster-name $CLUSTER_NAME \
    --region $AWS_REGION

# Create ECR repository
echo -e "${GREEN}📦 Creating ECR repository...${NC}"
aws ecr create-repository \
    --repository-name react-app \
    --region $AWS_REGION || echo "Repository might already exist"

# Create IAM roles
echo -e "${GREEN}🔐 Creating IAM roles...${NC}"

# Task execution role
cat > task-execution-role-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

aws iam create-role \
    --role-name ecsTaskExecutionRole \
    --assume-role-policy-document file://task-execution-role-policy.json || echo "Role might already exist"

aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Create Application Load Balancer
echo -e "${GREEN}⚖️  Creating Application Load Balancer...${NC}"
ALB_ARN=$(aws elbv2 create-load-balancer \
    --name react-app-alb \
    --subnets $SUBNET_1_ID $SUBNET_2_ID \
    --security-groups $SECURITY_GROUP_ID \
    --region $AWS_REGION \
    --query 'LoadBalancers[0].LoadBalancerArn' \
    --output text)

# Create target group
TARGET_GROUP_ARN=$(aws elbv2 create-target-group \
    --name react-app-targets \
    --protocol HTTP \
    --port 80 \
    --vpc-id $VPC_ID \
    --target-type ip \
    --health-check-path /health \
    --region $AWS_REGION \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)

# Create listener
aws elbv2 create-listener \
    --load-balancer-arn $ALB_ARN \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=$TARGET_GROUP_ARN \
    --region $AWS_REGION

# Get ALB DNS name
ALB_DNS=$(aws elbv2 describe-load-balancers \
    --load-balancer-arns $ALB_ARN \
    --query 'LoadBalancers[0].DNSName' \
    --output text \
    --region $AWS_REGION)

# Create task definition
echo -e "${GREEN}📋 Creating ECS task definition...${NC}"
cat > task-definition.json << EOF
{
  "family": "$SERVICE_NAME",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "react-app",
      "image": "nginx:alpine",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/react-app",
          "awslogs-region": "$AWS_REGION",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

# Create CloudWatch log group
aws logs create-log-group \
    --log-group-name /ecs/react-app \
    --region $AWS_REGION || echo "Log group might already exist"

# Register task definition
aws ecs register-task-definition \
    --cli-input-json file://task-definition.json \
    --region $AWS_REGION

# Create ECS service
echo -e "${GREEN}🚀 Creating ECS service...${NC}"
aws ecs create-service \
    --cluster $CLUSTER_NAME \
    --service-name $SERVICE_NAME \
    --task-definition $SERVICE_NAME \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_1_ID,$SUBNET_2_ID],securityGroups=[$SECURITY_GROUP_ID],assignPublicIp=ENABLED}" \
    --load-balancers targetGroupArn=$TARGET_GROUP_ARN,containerName=react-app,containerPort=80 \
    --region $AWS_REGION

# Cleanup temporary files
rm -f task-execution-role-policy.json task-definition.json

echo -e "${GREEN}✅ AWS infrastructure setup complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Infrastructure Summary:${NC}"
echo -e "VPC ID: $VPC_ID"
echo -e "Subnet 1: $SUBNET_1_ID"
echo -e "Subnet 2: $SUBNET_2_ID"
echo -e "Security Group: $SECURITY_GROUP_ID"
echo -e "Load Balancer DNS: $ALB_DNS"
echo -e "ECS Cluster: $CLUSTER_NAME"
echo -e "ECS Service: $SERVICE_NAME"
echo ""
echo -e "${YELLOW}🌐 Next steps:${NC}"
echo -e "1. Point your domain $DOMAIN to: $ALB_DNS"
echo -e "2. Setup SSL certificate in AWS Certificate Manager"
echo -e "3. Update ALB listener to use HTTPS"
echo -e "4. Run: make aws-deploy DOMAIN=$DOMAIN"