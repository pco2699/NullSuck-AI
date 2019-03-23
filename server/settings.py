import os
from os.path import join, dirname
from dotenv import load_dotenv

if os.environ.get('PY_ENV') == 'local':
    dotenv_path = join(dirname(__file__), 'env', '.env.{0}'.format(os.getenv('PY_ENV', 'local')))
    load_dotenv(dotenv_path)