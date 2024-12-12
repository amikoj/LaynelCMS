'''
当前应用配置项,  
请在此文件中配置当前应用的配置项,  
具体配置项请参考 pydantic_settings 库的文档.  
'''

from configparser import ConfigParser
from functools import lru_cache
from os import path
import re
from typing import Any, Dict, List
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from .vars import __configuration_file_path__

def  create_default_settings_file(settings_file_path: str = __configuration_file_path__):
    '''
    创建默认配置文件
    '''
    config = ConfigParser()
    config['app'] = {
        'app_name': 'LaynelCMS',
        'app_version': '1.0.0',
        'theme': 'default'
    }
    config['ext'] = {}
    with open(settings_file_path, 'w', encoding='utf-8') as f:
        config.write(f) 


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
        
        if target.get('app') and target['app'].get('plugins'):
            text =  re.sub(r'\s+', ' ', target['app']['plugins'])
            target['app']['plugins'] = text.split()
            
        return target


class AppSettings(BaseModel):
    app_name: str = 'LaynelCMS'
    app_version: str = '1.0.0'
    theme: str = 'default'
    plugins: List[str]


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
def get_settings(refresh: bool = False) -> Settings:
    if refresh:
        get_settings.cache_clear()
    if not path.exists(__configuration_file_path__):
        create_default_settings_file(__configuration_file_path__)
    return Settings()

# 刷新配置缓存
def  refresh_settings():
    get_settings.cache_clear()
        
        
__all__ = [
    'Settings', 
    'AppSettings', 
    'get_settings',
    'refresh_settings', 
    'create_default_settings_file'
    ]