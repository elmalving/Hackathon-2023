import redis
from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ['SECRET_KEY']

    MONGODB_SETTINGS = {
        'db': 'db',
        'host': os.environ.get('MONGODB_HOST', 'localhost'),
        'port': 27017
    }

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.StrictRedis(host=os.environ.get('REDIS_HOST', 'localhost'), port=6379)
