from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

import pymongo

app = Flask(__name__)
cors = CORS(app)
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["notes"]
x = mycol.find_one()
if(x is None):
    mycol.insert_many([{"value":"Note 1"},{"value":"Note 2"},{"value":"Note 3"}])


@app.route("/api/notes")
def showNotes():
    curs =  mycol.find()
    notes = []
    for cur in curs:
        notes.append({"id":str(cur.get("_id")), "value":cur.get("value")})
    return {"notes":notes}

@app.route("/api/notes/")
def showNotes2():
    curs =  mycol.find()
    notes = []
    for cur in curs:
        notes.append({"id":str(cur.get("_id")), "value":cur.get("value")})
    return {"notes":notes}

@app.route("/api/login", methods=["POST"])
def login():
    dict = request.get_json()
    if("username" in dict.keys() and dict["username"] == "admin" and "password" in dict.keys() and dict["password"] == "admin"):
        return {
            "response":"success"
        }
    else:
        return {
            "response":"failure"
        }

@app.route("/api/notes/add", methods=["POST"])
def addNote():
    dict = request.get_json()
    if("note" in dict.keys()):
        x = mycol.insert_one({"value":dict["note"]})
        return {
            "done":True,
            "note":{"id":str(x.inserted_id),"value":dict["note"]}
        }
    else:
        return {
            "done":False
        }
@app.route("/api/notes/delete", methods=["POST"])
def deleteNote():
    dict = request.get_json()
    if("id" in dict.keys()):
        x = mycol.delete_one({"_id":ObjectId(dict["id"])})
        if(x.deleted_count == 1):
            return {
                "done":True
            }
        else:
            return {
                "done":False
            }
@app.route("/api/notes/update", methods=["POST"])
def updateNote():
    dict = request.get_json()
    print(dict)
    if("id" in dict.keys() and "value" in dict.keys()):
        x = mycol.update_one({"_id":ObjectId(dict["id"])},{"$set":{"value":dict["value"]}})
        print(x.modified_count)
        if(x.modified_count == 1):
            return {
                "done":True,
                "note":{"id":dict["id"],"value":dict["value"]}
            }
    return {
        "done":False
    }
    

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=3002)