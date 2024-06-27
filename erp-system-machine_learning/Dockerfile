# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port number that the Flask app runs on
EXPOSE 5000

# Define environment variables
ENV FLASK_APP erp_ml.py
ENV FLASK_RUN_HOST 0.0.0.0

# Run erp_ml.py when the container launches
CMD ["flask", "run"]
