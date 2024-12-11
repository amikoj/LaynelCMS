'''
当前应用配置项,  
请在此文件中配置当前应用的配置项,  
具体配置项请参考 pydantic_settings 库的文档.  
'''

from configparser import ConfigParser
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, List
from pydantic import BaseModel
from pydantic_settings import BaseSettings, JsonConfigSettingsSource
from .vars import __configuration_file_path__


class IniConfigSettingsSource:
    '''
    配置文件配置源, 读取配置文件中的配置项
    '''
    def __init__(self, file_path: str):
        self.file_path = file_path
        
    def __call__(self) -> Dict[str, Any]:
        config = ConfigParser()
        config.read(self.file_path)
        sectionKeys: List[str]=  config.sections()
        target: Dict[str, Any] =  {k: {k: v for k, v in config.items(k)} for k in sectionKeys}
        return target


class AppSettings(BaseModel):
    app_name: str = 'LaynelCMS'
    app_version: str = '1.0.0'
    theme: str = 'default'


class ExtSettings(BaseModel):
    pass

# 定义配置类, 当前运行时配置信息
class Settings(BaseSettings):
    debug: bool = False
    app: AppSettings
    ext: ExtSettings
    
    
    class Config:
        cli_settings_source  = IniConfigSettingsSource(__configuration_file_path__)  # 配置文件配置源
        case_sensitive = True
        
# 获取配置实例
@lru_cache(maxsize=128, typed=False)
def get_settings() -> Settings:
    return Settings()

# 刷新配置缓存
def  refresh_settings():
    get_settings.cache_clear()
        
        
__all__ = ['Settings', 'AppSettings', 'get_settings','refresh_settings']