from flask_mongoengine import MongoEngine
from uuid import uuid4

db = MongoEngine()


def get_uuid():
    return uuid4().hex


class User(db.Document):
    __tablename__ = "users"

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    surname = db.Column(db.String(50), nullable=False)
    degree = db.Column(db.String(30), nullable=False)
