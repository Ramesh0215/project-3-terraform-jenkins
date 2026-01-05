pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "568619624691"
        ECR_REPO = "ecs-demo-repo"
        IMAGE_NAME = "ecs-demo"
        CLUSTER_NAME = "ecs-demo-cluster"
        SERVICE_NAME = "ecs-demo-service"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Ramesh0215/project-3-terraform-jenkins.git', branch: 'main'
            }
        }

        stage('ECR Login') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds'
                ]]) {
                    bat '''
                        aws ecr get-login-password --region %AWS_REGION% ^
                        | docker login --username AWS --password-stdin %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                    docker build -t %IMAGE_NAME% .
                '''
            }
        }

        stage('Tag & Push Image') {
            steps {
                bat '''
                    docker tag %IMAGE_NAME%:latest %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPO%:latest
                    docker push %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPO%:latest
                '''
            }
        }

        stage('Deploy to ECS') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds'
                ]]) {
                    bat '''
                        aws ecs update-service ^
                          --cluster %CLUSTER_NAME% ^
                          --service %SERVICE_NAME% ^
                          --force-new-deployment
                    '''
                }
            }
        }
    }
}