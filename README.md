# CROP DATA React + Flask

A Web application for analyzing and showing agricultural production data in India.<br/>

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Steps](#steps)
  - [OtherRequirment](#OtherRequirments) 
- [Components](#components)
- [Images](#images)

## Introduction
The two tables provides yearly insights into maximum and minimum crop productions and details of average crop yields and cultivation areas across different crops.<br/>
- frontend technologies: React , AXIOS<br/>
- backend technologies: Flask, Pandas, Flask CORS<br/>

## Installation

### Steps
<p>Initial Steps</p>
<ul>
<li>Clone the github repository : git clone https://github.com/ishaj72/CropData.git</li>
<li>Navigate to the project : cd CropData</li>
</ul>

<p>For frontend</p>
<ul>
<li>Install frontend dependencies <br/> -cd client <br/> -npm install  <br/> -npx create-react-app  <br/> -npm install axois </li>
<li>Start your project : npm start</li>
</ul>

<p>For backend</p>
<ul>
<li>Install backend dependencies <br/> -cd flask-server <br/> -python -m venv venv(create virtual environment)  <br/> - .\venv\Scripts\Activate(activate the server)   <br/> -pip install flask </li>
<li>Start your project : python server.py</li>
</ul>

### Prerequisites
- To install pandas 
<ul> 
<li>python -m pip install --upgrade pip</li>
<li>python -m pip install numpy pandas --user</li>
</ul> 

- To install cors
<ul> 
<li>python -m pip install flask-cors</li>
</ul> 

## Components
### Backend 
Implemented in Python, the Flask application loads agricultural production data from CSV files, processes it to compute metrics such as maximum and minimum crop productions per year, and calculates average yields and cultivation areas for different crops. The processed data is exposed through RESTful APIs.<br/>
- Open browser through : http://localhost:5000/api/tables

### Frontend
Built with React.js, the frontend fetches data from the Flask backend and dynamically renders two tables:<br/>
Table 1: Displays the maximum and minimum production crops per year.<br/>
Table 2: Shows the average yield and cultivation area for various crops.<br/>
- Open browser through: http://localhost:3000/

## Images
- Table 1
<img src="assets\table1.png" alt="table 1" width="200" height="150">

- Table 2
<img src="assets\taable2.png" alt="atable 2" width="200" height="150">

- React Page
<img src="assets\crop1.png" alt="atable 2" width="200" height="150">
<img src="assets\crop2.png" alt="atable 2" width="200" height="150">