pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yanamadalasatyanarayana/devsecops-app"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Lint Check') {
            steps {
                bat 'npx eslint . || exit 0'
            }
        }

        stage('Dependency Scan') {
            steps {
                bat 'npm audit || exit 0'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Docker Scan') {
            steps {
                bat 'trivy image %DOCKER_IMAGE% || exit 0'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat 'echo %PASS% | docker login -u %USER% --password-stdin'
                    bat 'docker push %DOCKER_IMAGE%'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                set KUBECONFIG=C:\\Users\\satya\\.kube\\config

                kubectl apply -f deployment.yaml --validate=false
                kubectl apply -f service.yaml --validate=false
                '''
            }
        }
    }
}