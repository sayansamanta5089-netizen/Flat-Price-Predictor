from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib
import sqlite3
from datetime import datetime


app = Flask(__name__)


model = joblib.load("flat_price_model.pkl")


DATABASE = "prediction_history.db"


FACING_MAP = {
    1: "East",
    2: "West",
    3: "South",
    4: "North"
}


def init_database():

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            flat_id TEXT NOT NULL,

            area REAL NOT NULL,

            facing INTEGER NOT NULL,

            floor INTEGER NOT NULL,

            parking REAL NOT NULL,

            bedrooms INTEGER NOT NULL,

            predicted_price REAL NOT NULL,

            created_at TEXT NOT NULL

        )
    """)

    conn.commit()

    conn.close()


def save_prediction(
    flat_id,
    area,
    facing,
    floor,
    parking,
    bedrooms,
    predicted_price
):

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO predictions
        (
            flat_id,
            area,
            facing,
            floor,
            parking,
            bedrooms,
            predicted_price,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        flat_id,
        area,
        facing,
        floor,
        parking,
        bedrooms,
        predicted_price,
        datetime.now().strftime(
            "%d %b %Y, %I:%M %p"
        )
    ))

    conn.commit()

    prediction_id = cursor.lastrowid

    conn.close()

    return prediction_id


@app.route("/")
def home():

    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        flats = data.get("flats", [])

        if not flats:

            return jsonify({
                "success": False,
                "error": "Please add at least one flat."
            }), 400


        results = []


        for flat in flats:

            flat_id = str(
                flat.get("flat_id", "")
            ).strip()


            area = float(
                flat.get("area")
            )


            facing = int(
                flat.get("facing")
            )


            floor = int(
                flat.get("floor")
            )


            parking = float(
                flat.get("parking")
            )


            bedrooms = int(
                flat.get("bedrooms")
            )


            if not flat_id:

                raise ValueError(
                    "Flat ID is required."
                )


            if area <= 0:

                raise ValueError(
                    f"Area must be greater than 0 for Flat {flat_id}."
                )


            if facing not in FACING_MAP:

                raise ValueError(
                    f"Direction must be 1, 2, 3 or 4 for Flat {flat_id}."
                )


            if floor < 0:

                raise ValueError(
                    f"Floor cannot be negative for Flat {flat_id}."
                )


            if parking < 0:

                raise ValueError(
                    f"Parking area cannot be negative for Flat {flat_id}."
                )


            if bedrooms <= 0:

                raise ValueError(
                    f"Bedrooms must be greater than 0 for Flat {flat_id}."
                )


            new_flat = pd.DataFrame(
                [[
                    area,
                    facing,
                    floor,
                    parking,
                    bedrooms
                ]],
                columns=[
                    "Area_Sqft",
                    "Facing",
                    "Floor",
                    "Car_Parking_Sqft",
                    "Bedrooms"
                ]
            )


            prediction = model.predict(new_flat)


            predicted_price = round(
                float(prediction[0]),
                2
            )


            prediction_id = save_prediction(
                flat_id,
                area,
                facing,
                floor,
                parking,
                bedrooms,
                predicted_price
            )


            results.append({

                "id": prediction_id,

                "flat_id": flat_id,

                "area": area,

                "facing": facing,

                "facing_name":
                    FACING_MAP[facing],

                "floor": floor,

                "parking": parking,

                "bedrooms": bedrooms,

                "predicted_price":
                    predicted_price

            })


        return jsonify({

            "success": True,

            "results": results

        })


    except Exception as e:

        print(
            "Prediction Error:",
            e
        )

        return jsonify({

            "success": False,

            "error": str(e)

        }), 400


@app.route("/history", methods=["GET"])
def history():

    conn = sqlite3.connect(DATABASE)

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    cursor.execute("""
        SELECT *
        FROM predictions
        ORDER BY id DESC
    """)


    rows = cursor.fetchall()

    conn.close()


    history_data = []


    for row in rows:

        item = dict(row)

        facing_number = int(
            item["facing"]
        )

        item["facing_name"] = FACING_MAP.get(
            facing_number,
            "Unknown"
        )

        history_data.append(
            item
        )


    return jsonify({

        "success": True,

        "history": history_data

    })


@app.route(
    "/history/<int:prediction_id>",
    methods=["DELETE"]
)
def delete_history(prediction_id):

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()


    cursor.execute(
        "DELETE FROM predictions WHERE id = ?",
        (prediction_id,)
    )


    deleted = cursor.rowcount

    conn.commit()

    conn.close()


    if deleted == 0:

        return jsonify({

            "success": False,

            "error": "Prediction not found."

        }), 404


    return jsonify({

        "success": True

    })


@app.route("/history", methods=["DELETE"])
def delete_all_history():

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()


    cursor.execute(
        "DELETE FROM predictions"
    )


    conn.commit()

    conn.close()


    return jsonify({

        "success": True

    })


init_database()


if __name__ == "__main__":

    app.run(
        debug=True
    )