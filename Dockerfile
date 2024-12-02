# It is used to build the docker image for LaynelCMS

# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY api/ /app

# upgrade pip
RUN pip install --upgrade pip --trusted-host pypi.python.org

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV LANG=C.UTF-8

# Run app.py when the container launches
CMD ["gunicorn", "-c", "gunicorn.conf.py", "main:app"]