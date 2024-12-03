"""
This is the core plugin package.
It contains all the core plugins of the CMS.
"""
__version__ = "0.0.1"
from fastapi import FastAPI
from os import DirEntry, scandir
from .info import PluginInfo

__current_theme__: str = "default" # 当前主题
__plugins__: list = [] # 插件列表

def load_plugin(app: FastAPI, plugin: DirEntry):
    # 加载插件
    print(f"Loading plugin {plugin.name}")
    return PluginInfo(app, plugin)

# loading plugins
def load_plugins(app: FastAPI):
    plugins: list[PluginInfo] = []
    # 扫描插件目录
    for entry in scandir(PluginInfo.PLUGIN_DIR):
        if entry.is_dir():
            print(f"Loading plugin {entry.path}")
            plugin = load_plugin(app, entry)
            if plugin.valid == True:
                plugins.append(plugin)
    return plugins

# 
def register_plugin(plugin: PluginInfo):
    pass

# unregistering plugins
def unregister_plugin(plugin: PluginInfo):
    pass

def init_app(app: FastAPI):
    # 加载所有插件
   __plugins__ =  load_plugins(app)




__all__ = ['scanning_plugins', 'load_plugins','register_plugins', 'unregister_plugins', 'init_app']