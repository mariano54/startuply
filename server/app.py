import os
from flask import Flask, redirect, url_for, request, render_template, jsonify
from pymongo import MongoClient
from flask.ext.cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient(
    os.environ['DB_PORT_27017_TCP_ADDR'],
    27017)
db = client.tododb


@app.route('/')
def entries():

    _items = db.tododb.find()
    items = [item for item in _items]

    return render_template('todo.html', items=items)


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
