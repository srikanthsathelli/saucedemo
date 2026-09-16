pipeline {
    agent {
        dockerfile true
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