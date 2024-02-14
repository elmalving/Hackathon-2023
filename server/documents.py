from flask_mongoengine import MongoEngine
from uuid import uuid4

db = MongoEngine()


def get_uuid():
    return uuid4().hex


class User(db.Document):
    id = db.StringField(primary_key=True, default=get_uuid)
    email = db.EmailField(max_length=345, unique=True)
    password = db.StringField(required=True)
    name = db.StringField(max_length=50, required=True)
    surname = db.StringField(max_length=50, required=True)
    degree = db.StringField(max_length=30, required=True)
