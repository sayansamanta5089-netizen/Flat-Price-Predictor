import pandas as pd
import joblib

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    r2_score,
    mean_squared_error,
    mean_absolute_error
)


df = pd.read_excel(
    "data/Flat_Price_Multiple_Linear_Regression_100.xlsx"
)


df["Facing"] = (
    df["Facing"]
    .astype(str)
    .str.strip()
    .str.capitalize()
)


df["Facing"] = df["Facing"].apply(
    lambda x: 1 if x == "East"
    else 2 if x == "West"
    else 3 if x == "South"
    else 4 if x == "North"
    else None
)


if df["Facing"].isnull().any():

    raise ValueError(
        "Invalid facing direction found in Excel file."
    )


x = df[
    [
        "Area_Sqft",
        "Facing",
        "Floor",
        "Car_Parking_Sqft",
        "Bedrooms"
    ]
]


y = df["Price_Lakh"]


x_train, x_test, y_train, y_test = train_test_split(
    x,
    y,
    test_size=0.2,
    random_state=42
)


model = LinearRegression()


model.fit(
    x_train,
    y_train
)


y_pred = model.predict(
    x_test
)


r2 = r2_score(
    y_test,
    y_pred
)


mse = mean_squared_error(
    y_test,
    y_pred
)


rmse = mse ** 0.5


mae = mean_absolute_error(
    y_test,
    y_pred
)


print()
print("=" * 50)
print("       FLAT PRICE PREDICTION MODEL")
print("=" * 50)

print()

print("Facing Direction Mapping:")
print("East  = 1")
print("West  = 2")
print("South = 3")
print("North = 4")

print()

print("=" * 50)
print("             MODEL PERFORMANCE")
print("=" * 50)

print()

print(
    "R^2 Score =",
    round(r2, 4)
)


print(
    "MSE =",
    round(mse, 4)
)


print(
    "RMSE =",
    round(rmse, 4),
    "Lakhs"
)


print(
    "MAE =",
    round(mae, 4),
    "Lakhs"
)


print()

print("=" * 50)
print("             MODEL COEFFICIENTS")
print("=" * 50)

print()

print(
    "Intercept (B0):",
    model.intercept_
)


print(
    "B1 (Area_Sqft):",
    model.coef_[0]
)


print(
    "B2 (Facing):",
    model.coef_[1]
)


print(
    "B3 (Floor):",
    model.coef_[2]
)


print(
    "B4 (Car_Parking_Sqft):",
    model.coef_[3]
)


print(
    "B5 (Bedrooms):",
    model.coef_[4]
)


joblib.dump(
    model,
    "flat_price_model.pkl"
)


print()
print("=" * 50)
print("Model saved successfully!")
print("File: flat_price_model.pkl")
print("=" * 50)