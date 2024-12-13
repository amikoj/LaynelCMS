

from fastapi import Request
from .config import BaseConfig, get_config
    
def admin_dependencies(request: Request):
    """
    This function returns all the plugins that are required by the application.
    :return: A list of plugins.
    """
    config =  {}
    
    return {
        "routes": [],
    }
    
    
def theme_dependencies():
    """
    This function returns all the themes that are required by the application.
    :return: A list of themes.
    """
    pass