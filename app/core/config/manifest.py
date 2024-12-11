
import json
from os import path
from functools import lru_cache

from .vars import __manifest_file_path__,__plugins_dir__,__configuration_file_path__
from .model import ModuleInfo


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


class ManifestConfig(ModuleInfo):
    enable = True  # 主应用默认启用
    
    class Config:
        env_file = __manifest_file_path__  # 指定环境文件路径
            
@lru_cache
def get_manifest_config() -> ManifestConfig:
    """
    This function is used to get the manifest configuration.
    """
    if not path.exists(__manifest_file_path__):
        create_default_manifest_file(__manifest_file_path__)
    return ManifestConfig()


def clear_manifest_config_cache() -> None:
    """
    This function is used to clear the manifest configuration cache.
    """
    get_manifest_config.cache_clear()

        
__all__ = [
    "ManifestConfig", 
    'get_manifest_config', 
    'clear_manifest_config_cache'
    ]