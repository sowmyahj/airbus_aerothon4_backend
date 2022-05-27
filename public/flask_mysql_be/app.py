from tkinter import N
from flask import Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
 
app = Flask(__name__)
cors = CORS(app)
app.debug = True
 
# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
 
# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String, nullable=False)

    def __repr__(self):
        return "Note(id={}, value={})".format(self.id, self.value)


db.create_all()
# print(Note.select()

@app.route("/api/notes/")
def showNotes():
    curs =  Note.query.all()
    notes = []
    for cur in curs:
        notes.append({"id":str(cur.id), "value":cur.value})
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
        note = Note(value=dict["note"])
        db.session.add(note)
        db.session.commit()
        if(note.id):
            return {
                "done":True,
                "note":{"id":note.id,"value":dict["note"]}
            }
    return {
        "done":False
    }
@app.route("/api/notes/delete", methods=["POST"])
def deleteNote():
    dict = request.get_json()
    if("id" in dict.keys()):
        note = Note.query.filter_by(id=dict["id"]).first()
        if(note):
            db.session.delete(note)
            db.session.commit()
            return {
                "done":True
            }
    return {
        "done":False
    }
@app.route("/api/notes/update", methods=["POST"])
def updateNote():
    dict = request.get_json()
    print(dict)
    if("id" in dict.keys() and "value" in dict.keys()):
        note = Note.query.filter_by(id=dict["id"]).first()
        if(note):
            note.value = dict["value"]
            db.session.commit()
            return {
                "done":True,
                "note":{"id":note.id,"value":dict["value"]}
            }
    return {
        "done":False
    }
    


if __name__ == '__main__':
      app.run(host='0.0.0.0', port=3002)

