# Simple Task Manager

This is a basic task management app I built using Angular for the frontend and ASP.NET Core Web API for the backend.

## Project Overview

The app lets users sign up, log in, and manage their tasks.

## Local Deployment Instructions

Due to several issues, including a damaged personal computer and tight time constraints, this application is deployed for local demonstration purposes only.

### 1. API (ASP.NET Core)

1.  **Database:**
    * Ensure you have SQL Server Express installed on this machine.
    * Open `appsettings.json` in the `SimpleTaskManager.API` folder.
    * Change the `DefaultConnection` string to your SQL Server Express connection. It should look like this:
        ```json
        "ConnectionStrings": {
          "DefaultConnection": "Server=.\\SQLExpress;Database=YourDatabaseName;Trusted_Connection=True;"
        }
        ```
        * Replace `YourDatabaseName` with your database name.
2.  **Run API:**
    * Open the `SimpleTaskManager.API` project in Visual Studio.
    * Press F5 to run it.
    * The API will run at `http://localhost:5000/auth`.

### 2. Angular App

1.  **Build Angular:**
    * Open your terminal and go to the `quick-task-manager-ui` folder.
    * Type `ng build --configuration production`.
2.  **Update API URL:**
    * Go to `dist\quick-task-manager-ui`.
    * Open `main-VQJURFQT.js` in a text editor.
    * Find all the `http://localhost:5000/auth` bits and change them to `http://localhost:5000/auth`.
3.  **Netlify:**
    * Go to [https://www.netlify.com/](https://www.netlify.com/) and make a free account.
    * Drag and drop the `dist\quick-task-manager-ui` folder onto Netlify.
    * Netlify gives you a link to see the app.

### 3. Running It

1.  **API First:** Run the API in Visual Studio.
2.  **Angular App:** Open the Netlify link in your browser.
3.  **Test:** Try logging in, signing up, and doing task stuff.

### Notes

* Due to a damaged to my personal computer, limited access to this machine (my uncle's), and only having about 5-6 hours total to work on this, I didn't have time or a way to pay for cloud services. This is just a quick demo.

## Contact

Leul Nigussu
leoulnigussu@gmail.com
