
## requirement.txt
### `pip install -r requirements.txt`

# Note Object
Note = {
    id:<note_id>
    value:<some_text>
}


## All notes
[GET] "/api/notes" - Landing page
    Return all the available notes
response = {
    "notes":[Note]
}

## Update note
[POST] "/api/notes/update" - POST Req to edit notes
body = {
    "id":<note_id>,
    "value":<some_text>
}

response = {
    "done":True/False,
    "note":Note
}

## Delete note
[POST] "/api/notes/delete" - POST Req to delete notes
body = {
    "id":<note_id>
}
response = {
    "done":True/False
}

## Add note
[POST] "/api/notes/add" - POST Req to add note
body = {
    "note":<some_text>
}
response = {
    "done":True/False,
    "notes":Note
}

# To run
python app.py

## PORT - 3002