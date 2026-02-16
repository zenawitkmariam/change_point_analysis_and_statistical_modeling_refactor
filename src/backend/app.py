from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import json


app = Flask(__name__)
CORS(app)


# Load data once
prices = pd.read_csv("data/raw/BrentOilPrices.csv")
events = pd.read_csv("data/raw/oil_market_events.csv")
prices["Date"] = pd.to_datetime(prices["Date"], format='mixed')
events["Date"] = pd.to_datetime(events["Date"], format='mixed')

with open("data/raw/change_points.json") as f:
    change_points = json.load(f)




@app.route("/api/prices")
def get_prices():
    start = request.args.get("start")
    end = request.args.get("end")


    df = prices.copy()
    if start:
        df = df[df["Date"] >= start]
    if end:
        df = df[df["Date"] <= end]


    return jsonify(df.to_dict(orient="records"))




@app.route("/api/events")
def get_events():
    return jsonify(events.to_dict(orient="records"))




@app.route("/api/change-points")
def get_change_points():
    return jsonify(change_points)




@app.route("/api/metrics")
def get_metrics():
    volatility = prices["Price"].pct_change().std()
    avg_price = prices["Price"].mean()


    return jsonify({
    "volatility": round(volatility, 4),
    "average_price": round(avg_price, 2)
    })




if __name__ == "__main__":
    app.run(debug=True)