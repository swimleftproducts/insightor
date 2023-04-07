This is a flask app that runs as a task in ecs

Running locally:
    set MODE=local
    AWS_SECRET_ACCESS_KEY and AWS_ACCESS_KEY_ID need to be set as env variables
    run with python app.py


Running locally in docker:
    docker run --rm -p 5000:5000 -e MODE=local flask_app

Running on aws:
    freeze requirements with pipreqs
        pipreqs . --force


    build container 
        docker build -t flask_app .
    ### TOBE DETERMINED
    