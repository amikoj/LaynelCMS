from functools import lru_cache
import json
from os import path, scandir
from typing import List
from .vars import __plugins_dir__
from .manifest import  get_manifest_config
from .settings import get_settings, Settings
from .model import ModuleInfo



class BaseConfig:
    """
    This class is used to define the base configuration of the app.
    """
    
    @property
    def active_plugins(self) -> List[ModuleInfo]:
        """
        This function is used to get the enabled plugins.
        """
        return [plugin for plugin in self.plugins if plugin.enabled]
    
    def get_plugin_by_name(self, name: str) -> ModuleInfo:
        """
        This function is used to get the plugin by name.
        """
        for plugin in self.plugins:
            if plugin.name == name:
                return plugin
        return None
    
    @property
    def plugins_all_dict(self) -> dict:
        """
        This function is used to get the plugins configuration as a dictionary.
        """
        plugins_dict = {}
        for plugin in self.plugins:
            plugins_dict[plugin.name] = plugin.model_dump()
        return plugins_dict
    
    def __init__(self):
        self.settings: Settings  = get_settings() # 运行时配置
        self.appInfo: ModuleInfo =  get_manifest_config() # app manifest config
        self.plugins: List[ModuleInfo] = {} # 加载当前所有的插件【存在的，不论是否启用】
        self.theme: ModuleInfo = None # 当前主题插件
        self.load_plugins() # 加载插件
        
    def load_plugins(self):
        """
        加载插件
        """
        plugins_dir: List[str] = []
        plugins: List[ModuleInfo] = []
         
        # get all the plugin directories
        for pluginEntry in scandir(__plugins_dir__):
            if pluginEntry.is_dir():
                plugins_dir.append(pluginEntry.path)
            else:
                print(f"Invalid plugin found at {pluginEntry.path}")
                
        # load the manifest.json file of each plugin and get the configuration details.
        for plugin_dir in plugins_dir:
            plugin_manifest_file = path.join(plugin_dir, 'manifest.json')
            if path.exists(plugin_manifest_file):
                with open(plugin_manifest_file, 'r') as f:
                    data = f.read()
                    plugin_data = json.loads(data)
                    plugin = ModuleInfo(**plugin_data)
                    plugin.path = plugin_dir
                    
                    if plugin.name in self.settings.app.plugins:
                        # set the enabled status of the plugin according to the config.ini app.plugins control.[only control normal plugins]
                        plugin.enabled = True
                        
                    if plugin.name == self.settings.app.theme:
                        # set the current theme plugin, theme is or not actiavted only according to the config.ini app.theme control.
                        self.theme = plugin
                    
                    plugins.append(plugin)
                    
        self.plugins = plugins
        
        
    def __str__(self):
        settings_str = str(self.settings.model_dump())
        appInfo_str = str(self.appInfo.model_dump())
        plugins_str = str(self.plugins)
        theme_str = str(self.theme)
        return f"BaseConfig(settings={settings_str}, appInfo={appInfo_str}, plugins={plugins_str}, theme={theme_str})"

    def __repr__(self):
        return self.__str__()

@lru_cache
def get_config(refresh: bool = False) -> BaseConfig:
    """
    This function is used to get the app global configuration.
    """
    if refresh:
        get_config.cache_clear()
    return BaseConfig()

def clear_config_cache() -> None:
    """
    This function is used to clear the cache of the app global configuration.
    """
    get_config.cache_clear()

def  get_plugin_info(name: str)-> ModuleInfo:
    """
    This function is used to get the plugin information by name.
    """
    config = get_config()
    plugins = config.plugins_all_dict
    if name in plugins:
        return ModuleInfo(**plugins[name])
    else:
        return None


__all__ = ["get_config", "BaseConfig", "clear_config_cache", "get_plugin_info"]