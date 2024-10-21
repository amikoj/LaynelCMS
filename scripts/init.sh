# This script is used to initialize the LaynelCMS project.
#!/bin/bash

# Create the database
mysql -u root -p < ./database/laynelcms.sql    

# Create the uploads directory
mkdir ./uploads

# Create python virtual environment
python3 -m venv ./venv

# Activate the virtual environment
source ./venv/bin/activate

# upgrade pip
pip3 install --upgrade pip

# Install the required packages
pip3 install -r ./requirements.txt





