__version__ = '0.0.1'


from .manifest import ManifestConfig, getManifestConfig
from .model import AppInfo, AppType,RouteInfo
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
    print(' initializing core settings moudle: ', config)
    app.state.config = config


__all__ = [
    'init_app', 
    'ManifestConfig', 
    'getManifestConfig',
    'BaseConfig', 
    '__configuration_file_path__', 
    '__plugins_dir__',
    'AppInfo',
    'AppType',
    'RouteInfo'
]