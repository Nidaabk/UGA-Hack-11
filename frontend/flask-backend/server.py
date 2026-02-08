
from flask_cors import CORS

from flask import Flask, jsonify

app = Flask(__name__)
CORS(app)

@app.route('/api/modelinfo', methods=["GET"])
def return_home():
    data = jsonify({"test": "works!"})
    return data

if __name__=="__main__":
    app.run(host='127.0.0.1', debug=True, port=8080)