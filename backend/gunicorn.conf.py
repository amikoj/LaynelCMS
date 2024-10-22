# This file is used to configure the Gunicorn server.
import multiprocessing
import os

# Set the number of workers to the number of processors on the system multiplied by 2 plus 1.

bind = "0.0.0.0:80"
workers = multiprocessing.cpu_count() * 2 + 1 # number of processors * 2 + 1

# Set the path to the WSGI application.

wsgi_app = "backend.wsgi:application"

# Set the path to the directory where Gunicorn should look for the application's configuration file.

chdir = os.path.dirname(__file__)
# Set the log file path and level.
accesslog = os.environ.get("GUNICORN_ACCESSLOG", "logs/access.log") 
errorlog =  os.environ.get("GUNICORN_ERRORLOG", "logs/error.log")
loglevel = "info"    # options: debug, info, warning, error, critical   
# Set the timeout for requests.
timeout = 30
# Set the number of threads to use for handling requests.

threads = 2
# Set the maximum number of requests a worker will process before restarting.

max_requests = 1000
# Set the maximum number of requests a worker will keep in memory.
backlog = 2048
# Set the number of seconds to wait for requests on a Keep-Alive connection.