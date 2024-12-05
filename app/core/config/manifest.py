
import json
from os import path, scandir
from .vars import __manifest_file_path__,__plugins_dir__,__configration_file_path__
from .model import AppInfo, AppType, RouteInfo
from fastapi import APIRouter,FastAPI
from .ini import BaseConfig

class ManifestConfig:
    """
    ManifestConfig class is used to read the manifest.json file and get the configuration details.
    """
    
    def __init__(self, app:APIRouter | FastAPI ,mainfest_file: str = __manifest_file_path__):
        assert isinstance(app, APIRouter | FastAPI), "app should be an instance of APIRouter or FastAPI"
        self.app: APIRouter | FastAPI = app
        self.mainfest_file: str = mainfest_file
        self.config_data: dict = {}
        self.mainfest: AppInfo = None
        self.plugins: list[AppInfo] = None
        self.theme: AppInfo = None
        # 生成的配置文件 ,默认config.ini
        
        if not path.exists(__configration_file_path__):
            self.create_default_config_file()
        else:
            self.config = BaseConfig(__configration_file_path__).get_options()
        
        # load the manifest.json file and get the configuration details.
        self.load_config() # 主应用信息
        self.load_plugins() # 插件信息
        
    def  create_default_config_file(self) -> None:
        """
        This method is used to create a default config.ini file.
        """
        config = BaseConfig(__configration_file_path__)
        config.add_section('app')
        config.set_options('app', 'name', 'LaynelCMS')
        config.set_options('app', 'theme', "default")
        
        self.config = config.get_options()
        
        
    def create_default_mainfeat_file(self) -> None:
        """
        This method is used to create a default manifest.json file.
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
        with open(self.mainfest_file, 'w') as f:
            json.dump(data, f, indent=4)
            self.config_data = data
            self.mainfest = self.parse() # parse the data
            print(f"Manifest file created at {self.mainfest_file}")
        
    def load_plugins(self) -> None:
        """
        This method is used to load the plugins from the plugins directory.
        """
        plugins: list[AppInfo] = []
        theme: AppInfo = None
        
        plugins_dir = []
        
        
        # get all the plugin directories
        for pluginEntry in scandir(__plugins_dir__):
            if pluginEntry.is_dir():
                plugins_dir.append(pluginEntry.path)
            else:
                print(f"Invalid plugin found at {pluginEntry.path}")
         

                
                
                
                
                
                
                
        
        # load the manifest.json file of each plugin and get the configuration details.
        for plugin_dir in plugins_dir:
            plugin_manifest_file = path.join(plugin_dir.path, 'manifest.json')
            if path.exists(plugin_manifest_file):
                with open(plugin_manifest_file, 'r') as f:
                    data = f.read()
                    plugin_data = json.loads(data)
                    plugin = self.parse(plugin_data)
                    plugins.append(plugin)
                        
        self.plugins = plugins
        
        
                    
        
        
        
        
        
        
        
        
    def load_config(self) -> None:
        """
        This method is used to load the manifest.json file and get the configuration details.
        """
        try:
            with open(self.mainfest_file, 'r') as f:
                data = f.read()
                self.config_data = json.loads(data)
                self.mainfest = self.parse()
        except FileNotFoundError:
            print(f"Manifest file not found at {self.mainfest_file}, creating a default one...")
            self.create_default_mainfeat_file()
            

            
        
        
    def parse(self) -> AppInfo:
        """
        This method is used to parse the manifest.json file and get the configuration details.
        """
        data_dict = self.config_data
        
        data: dict = {
            "name": data_dict.get('name'),
            "version": data_dict.get('version'),
            "description": data_dict.get('description'),
            "author": data_dict.get('author'),
            "license": data_dict.get('license'),
            "homepage": data_dict.get('homepage'),
            "type": AppType(data_dict.get('type', AppType.MAIN)),
            "keywords": data_dict.get('keywords', []),
            "dependencies": data_dict.get('dependencies', []),
            "pages": [RouteInfo(**page) for page in data_dict.get('pages', [])]
        }
        return AppInfo(**data)
        
        
__all__ = ["ManifestConfig"]