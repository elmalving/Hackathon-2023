import redis
from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ['SECRET_KEY']

    MONGODB_SETTINGS = {
        'db': 'db',
        'host': 'mongodb://localhost:27017/'
    }

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')
