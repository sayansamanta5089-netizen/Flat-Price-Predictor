# 🏠 Flat Price Predictor

A full-stack Machine Learning web application that predicts the estimated price of a flat based on its property details.

The application uses **Multiple Linear Regression** to estimate the property price from features such as area, facing direction, floor, car parking size, and number of bedrooms.

---

## 🚀 Live Demo

🌐 **Live Website:**  
https://flat-price-predictor-zfkq.onrender.com

## 📌 Project Overview

The Flat Price Predictor is designed to provide an estimated property price instantly.

Users can enter the details of one or multiple flats, and the trained Machine Learning model predicts the estimated price in Lakhs.

The application also provides:

- Multiple flat prediction
- Prediction history
- Delete individual history records
- Clear prediction history
- Create new flat predictions
- Responsive and modern user interface
- Backend API for predictions
- Machine Learning model integration

---

## 🧠 Machine Learning

The project uses:

**Algorithm:** Multiple Linear Regression

### Input Features

- Area (sq ft)
- Facing Direction
- Floor Number
- Car Parking Size (sq ft)
- Number of Bedrooms

### Target

- Price (Lakhs)

### Facing Direction Encoding

The model uses the following numerical representation:

| Direction | Value |
|-----------|------:|
| East | 1 |
| West | 2 |
| South | 3 |
| North | 4 |

---

## 📊 Model Evaluation

The trained model is evaluated using:

- R² Score
- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)
- Mean Absolute Error (MAE)

The model achieved approximately:

R² Score : 0.9985
MSE      : 0.4696
RMSE     : 0.6853 Lakhs
MAE      : 0.5541 Lakhs
