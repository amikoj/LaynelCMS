from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
from ..router import reload_routes
from fastapi import FastAPI

class HtmlDependencyHandler(FileSystemEventHandler):
    def __init__(self,app: FastAPI):
        self.app = app
          
    def on_modified(self, event):
        print(event.src_path, "has been modified")
        reload_routes(self.app)
        print("Routes reloaded")
            
def notify_watcher(app: FastAPI):
    print("Start watching for html dependencies...")
    handler = HtmlDependencyHandler(app)
    observer = Observer()
    observer.schedule(handler, path='dist', recursive=True)
    observer.start()
        
__all__ = ['HtmlDependencyHandler']