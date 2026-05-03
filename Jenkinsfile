pipeline {
    agent any

    environment {
        IMAGE = "yanamadalasatyanarayana/devsecops-app"
    }

    stages {

        stage('Code Security Scan') {
            steps {
                bat 'npm audit'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE% .'
            }
        }

        stage('Container Security Scan') {
            steps {
                bat 'trivy image %IMAGE%'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat 'echo %PASS% | docker login -u %USER% --password-stdin'
                    bat 'docker push %IMAGE%'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                set KUBECONFIG=C:\\Users\\satya\\.kube\\config
                kubectl apply -f deployment.yaml
                '''
            }
        }
    }
}