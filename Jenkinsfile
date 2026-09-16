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
                sh '''
                    cd /app
                    npx playwright test
                    cp -r playwright-report "$WORKSPACE"/
                    '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive:true
        }
    }
}