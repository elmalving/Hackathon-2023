from datetime import datetime

from flask_mongoengine import MongoEngine
from mongoengine import ListField, ReferenceField
from uuid import uuid4

db = MongoEngine()


def get_uuid():
    return uuid4().hex


class Assignment(db.Document):
    id = db.StringField(primary_key=True, default=get_uuid)
    subject = db.StringField(max_length=50, required=True)
    difficulty = db.StringField(max_length=30, required=True)
    text = db.StringField(max_length=400, required=True)
    url = db.StringField(max_length=100)
    assigned_date = db.DateTimeField(default=datetime.now)
    rect = db.StringField(max_length=10, required=True, unique=True)


class User(db.Document):
    id = db.StringField(primary_key=True, default=get_uuid)
    email = db.EmailField(max_length=345, unique=True)
    password = db.StringField(required=True)
    name = db.StringField(max_length=50, required=True)
    surname = db.StringField(max_length=50, required=True)
    degree = db.StringField(max_length=30, required=True)
    assignments = ListField(ReferenceField(Assignment))
