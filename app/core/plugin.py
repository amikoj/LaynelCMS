from fastapi import FastAPI
import os


def load_plugin(app: FastAPI, plugin: str):
    pass

# scanning plugins
def scanning_plugins(app: FastAPI):
    for entry in os.scandir('plugins'):
        if entry.is_dir():
            # 加载插件
            load_plugins(app, entry)
        
    pass

# loading plugins
def load_plugins(app: FastAPI):
    pass

# registering plugins
def register_plugins():
    pass

# unregistering plugins
def unregister_plugins():
    pass

def init_app(app: FastAPI):
    
    # 加载所有插件
   return  load_plugins(app)




__all__ = ['scanning_plugins', 'load_plugins','register_plugins', 'unregister_plugins', 'init_app']