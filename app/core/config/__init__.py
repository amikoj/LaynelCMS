__version__ = '0.0.1'


from .manifest import ManifestConfig, getManifestConfig
from .ini import BaseConfig
from .model import AppInfo, AppType,RouteInfo
from .vars import __configuration_file_path__,  __plugins_dir__
from .settings import Settings, AppSettings,get_settings, refresh_settings

# Initialize the core module
from fastapi import FastAPI


def init_app(app: FastAPI):
    '''
    Initializes the core configuration module.
    '''
    # config = getManifestConfig()
    # app.state.config = config
    settings = get_settings()
    print(' initializing core settings moudle: ', settings.model_dump())
    app.state.settings = settings


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