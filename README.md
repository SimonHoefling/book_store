# Book Management Web App

This react application is a frontend platform built to interact with a provided backend API, enabling users to manage book records.

## Features

- List books with associated details, including cover images.
- Apply client-side filtering according to user input.
- Create, update, and delete book entries.
- (Optional) Additional features at the developer's discretion.

## Prerequisites

1. [Node.js](https://nodejs.org/)
2. [Docker](https://www.docker.com/) (for those choosing the Docker setup method for the backend mock server)


## Setup and Installation

### 1. Backend/API Setup

**A. Download** the mock server JSON definition file [(JSON file)](https://s3.eu-central-1.amazonaws.com/careers.anevis.solutions/application.json). Save it in a folder and navigate with the terminal into this folder


**B. Using Docker**:
```bash
docker run -d --rm \
 --mount type=bind,source=$PWD/application.json,target=/data,readonly -p 8080:8080 \
 --name mockoon mockoon/cli:latest -d data -p 8080
 ```

 After following the method above, the mock server will start running on localhost at port 8080

 ## Frontend Setup
**A. Clone** the repository:
```bash
git clone <your-repo-link>
cd <repo-name>
```

**B. Install** the dependencies:
```bash
npm install
````

**C. Run** the frontend application:
```bash
npm start
```
After executing the above command, the app should be accessible at http://localhost:3000 (or the designated port depending on your React framework).

## Using the Application

1. **Authentication:**
Authenticate using the given credentials and retrieve a bearer token using the /login endpoint. This token should be used for subsequent API interactions.

2. **Functionality:**
Use the application UI to fetch book details, filter listings, and perform CRUD operations on book records.
