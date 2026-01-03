pipeline{
    agent any
    environment{
        AWS_REGION = "us-east-1"
        ECS_REPO = "568619694691.dkr.ecr.us-east-1.amazonaws.com/ecs-cicd-repo"
        IMAGE_TAG = "latest"
    }
    stages{
        stage ('Checkout') {
            steps{
                git branch: 'main', url 'https://github.com/project-3-terraform-jenkins.git'
            
            }
        }
        stage('Login to ECR'){
            steps{
                withCredentials([[$class: 'AmazonWebServicesCredentialsBuilding', credentialsId: 'aws-creds']]){
                    sh'''
                    aws ecr get-login-password --region $aws_region \ | docker login --username AWS --password-stdin $ECR_REPO
                    '''
                }
            }
        }
        stage('Build Docker Image'){
            steps{
                sh '''
                docker build -t ecs-cicd .
                docker tag ecs-cicd:latest $ECR_REPO:$IMAGE_TAG
                '''
            }
        }
        stage('Push image to ECR'){
            steps{
                sh '''
                docker push $ECR_REPO:IMAGE_TAG
                ''''
            }
        }
        stage('Update ECS Service') {
            steps{
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]){
                    sh ''' 
                     aws ecs update-service \ 
                     --cluster ecs-demo-cluster \
                     --service ecs-demo-service \
                     --force-new-deployment
                     '''
                }
            }
        }
        
    }
}
