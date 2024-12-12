__version__ = '0.0.1'


from .manifest import get_manifest_config, clear_manifest_config_cache
from .model import ModuleInfo, ModuleType,RouteInfo
from .vars import __configuration_file_path__,  __plugins_dir__
from .settings import Settings, AppSettings,get_settings, refresh_settings
from .conf import BaseConfig, get_config, clear_config_cache

# Initialize the core module
from fastapi import FastAPI


def init_app(app: FastAPI):
    '''
    Initializes the core configuration module.
    '''
    config = get_config()
    app.state.config = config


__all__ = [
    'init_app', 
    'BaseConfig', 
    '__configuration_file_path__', 
    '__plugins_dir__',
    'ModuleInfo',
    'ModuleType',
    'RouteInfo',
    'AppSettings',
    'get_settings',
   'refresh_settings',
    'get_config',
    'clear_config_cache',
    'Settings',
    'get_manifest_config',
    'clear_manifest_config_cache'
]