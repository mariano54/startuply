import os
from flask import Flask, redirect, url_for, request, send_from_directory, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from flask_compress import Compress
from bson.objectid import ObjectId

app = Flask(__name__)
Compress(app)
CORS(app)
client = MongoClient('db', 27017)
db = client.tododb


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('static/images', path)

@app.route('/')
def root():
    return send_from_directory('static', 'index.html')


@app.route('/entries', methods=['GET'])
def get_entries():
    entries = [item for item in db.tododb.find()];
    for entry in entries:
        entry['_id'] = str(entry['_id'])
    return jsonify({'entries': entries})

@app.route('/entries', methods=['POST'])
def create_entry():
    db.tododb.insert_one(request.get_json())
    return ''

@app.route('/entries', methods=['DELETE'])
def delete_entry():
    return str(db.tododb.delete_one({"_id":ObjectId(request.get_json()["id"])}).deleted_count)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
