__version__ = '0.0.1'


from .manifest import Manifest
from .ini import BaseConfig
from .model import AppInfo, AppType,RouteInfo
from .vars import __configration_file_path__,  __config_folder_path__

# Initialize the core module
from fastapi import FastAPI


def init_app(app: FastAPI):
    '''
    Initializes the core configuration module.
    '''
    pass




__all__ = [
    'init_app', 
    'Manifest', 
    'BaseConfig', 
    '__configration_file_path__', 
    '__config_folder_path__',
    'AppInfo',
    'AppType',
    'RouteInfo'
]