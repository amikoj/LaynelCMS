from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import time
from ..router import reload_routes
from fastapi import FastAPI

class HtmlDependencyHandler(FileSystemEventHandler):
    def __init__(self,app: FastAPI):
        self.app = app
        
    def on_modified(self, event):
        print(event.src_path, "has been modified")
        reload_routes(self.app)
            
def notify_watcher(app: FastAPI):
    print("Start watching for html dependencies...", app)
    observer = Observer()
    observer.schedule(HtmlDependencyHandler(app), path='dist', recursive=True)
    observer.start()
    # try:
    #     while True:
    #         time.sleep(1)
    # except KeyboardInterrupt:
    #     observer.stop()
    # observer.join()
        
        
__all__ = ['HtmlDependencyHandler']