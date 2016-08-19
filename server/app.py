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


def clean_entries():
    entries = [item for item in db.tododb.find()];
    for entry in entries:
        if "name" not in entry or entry["name"] == '':
            db.tododb.delete_one({"_id":ObjectId(entry["_id"])}).deleted_count


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('static/images', path)

# Get entries
@app.route('/entries', methods=['GET'])
def get_entries():
    entries = [item for item in db.tododb.find()];
    page = int(request.args.get('page'))
    page_size = 10
    entries = sorted(entries, key=lambda x: x["name"])[page*page_size:(page+1)*page_size]
    for entry in entries:
        entry['_id'] = str(entry['_id'])
    return jsonify({'entries': entries})

# Get entry
@app.route('/entries/<id>', methods=['GET'])
def get_entry(id=''):
    entries = [item for item in db.tododb.find({"_id":ObjectId(id)})];
    if entries is None or len(entries) == 0: return jsonify({'entry':None})
    entry = entries[0]
    entry['_id'] = str(entry['_id'])
    return jsonify({'entry': entry})


@app.route('/entries', methods=['POST'])
def create_entry():
    db.tododb.insert_one(request.get_json())
    return ''

@app.route('/entries', methods=['DELETE'])
def delete_entry():
    return str(db.tododb.delete_one({"_id":ObjectId(request.get_json()["id"])}).deleted_count)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory('static', 'index.html')

if __name__ == "__main__":
    clean_entries()
    app.run(host='0.0.0.0', debug=True)
