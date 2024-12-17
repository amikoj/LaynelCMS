from fastapi import FastAPI
from . import generateDepends
import threading

def init_app(app: FastAPI):
    # threading.Thread(target=generateDepends.notify_watcher, args=(app,)).start()
    generateDepends.notify_watcher(app)



__all__ = ["init_app"]