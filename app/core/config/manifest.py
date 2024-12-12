
import json
from os import path
from functools import lru_cache

from .vars import __manifest_file_path__,__plugins_dir__,__configuration_file_path__
from .model import ModuleInfo, ModuleType


def  create_default_manifest_file(manifest_file_path: str = __manifest_file_path__) -> None:
    """
    This function is used to create a default manifest.json file.
    """
    data = {
        "name": "LaynelCMS",
        "version": "0.0.1",
        "description": "A simple theme for LaynelCMS",
        "author": "Laynel",
        "license": "MIT",
        "homepage": "https://github.com/LaynelCMS/theme001",
        "repository": {
            "type": "git",
            "url": "https://github.com/LaynelCMS/theme001.git"
        },
        "type": "main",
        "keywords": ["LaynelCMS", "theme", "simple"],
        "dependencies": [],
        "pages":[]
    }
    with open(manifest_file_path, 'w') as f:
        json.dump(data, f, indent=4)
        print(f"Manifest file created at {manifest_file_path}") 
            
@lru_cache
def get_manifest_config(refresh: bool = False) -> ModuleInfo:
    """
    This function is used to get the manifest configuration.
    """
    if refresh:
        get_manifest_config.cache_clear()
    
    if not path.exists(__manifest_file_path__):
        create_default_manifest_file(__manifest_file_path__)
        
    with open(__manifest_file_path__, 'r') as f:
         module = ModuleInfo(**json.load(f))
         module.enable = True  # 主应用默认启用
         module.type = ModuleType.MAIN  # 主应用类型
    return module


def clear_manifest_config_cache() -> None:
    """
    This function is used to clear the manifest configuration cache.
    """
    get_manifest_config.cache_clear()

        
__all__ = [
    'get_manifest_config', 
    'clear_manifest_config_cache'
]