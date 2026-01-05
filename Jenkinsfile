pipeline{
    agent any
    environment{
        AWS_REGION = "us-east-1"
        ECS_REPO = "568619624691.dkr.ecr.us-east-1.amazonaws.com/ecs-cicd-repo"
        IMAGE_TAG = "latest"
    }
    stages{
        stage ('Checkout') {
            steps{
                git branch: 'main', url 'https://github.com/Ramesh0215/project-3-terraform-jenkins.git'
            
            }
        }
        stage('Login to ECR'){
            steps{
                withCredentials([[$class: 'AmazonWebServicesCredentialsBuilding', credentialsId: 'aws-creds']]){
                        aws ecr get-login-password --region $AWS_REGION |docker login --username AWS --password-stdin 568619694691.dkr.ecr.us-east-1.amazonaws.com
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                  docker build -t ecs-cicd .
                  docker tag ecs-cicd:latest $ECR_REPO:$IMAGE_TAG
                }
        }

        stage('Push Image to ECR') {
            steps {
                    docker push $ECR_REPO:$IMAGE_TAG
            }
        }

        stage('Update ECS Service') {
            steps{
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    aws ecs update-service --cluster ecs-demo-cluster --service ecs-demo-service --force-new-deployment
                }
            }
        }
        
    }
}
