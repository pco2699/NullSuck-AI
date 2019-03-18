import responder

import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '/config/env', '.env', '.' + os.getenv('PY_ENV', 'local'))
load_dotenv(dotenv_path)

api = responder.API()


@api.route("/")
def hello_world(req, resp):
    resp.media = {"hello": True}


if __name__ == '__main__':
    api.run(address="0.0.0.0")
