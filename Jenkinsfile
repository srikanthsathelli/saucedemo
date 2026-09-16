pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-u root'
        }
    }
    stages {
        stage('Test') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'USER_NAME_PASSWORD',
                    usernameVariable: 'USER_NAME',
                    passwordVariable: 'USER_PASSWORD'
                )]) {
                    sh '''
                        cd /app
                        npx playwright test
                        cp -r playwright-report "$WORKSPACE"/
                        '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive:true
        }
    }
}