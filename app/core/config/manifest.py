
import json
from .vars import __manifest_file_path__,__plugins_dir__
from .model import AppInfo, AppType, RouteInfo
from fastapi import APIRouter,FastAPI

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
            self.parse() # parse the data
            print(f"Manifest file created at {self.mainfest_file}")
        
        
        
    def load_config(self) -> None:
        """
        This method is used to load the manifest.json file and get the configuration details.
        """
        try:
            with open(self.mainfest_file, 'r') as f:
                data = f.read()
                self.config_data = json.loads(data)
                self.parse()
        except FileNotFoundError:
            print(f"Manifest file not found at {self.mainfest_file}, creating a default one...")
            self.create_default_mainfeat_file()
            
        
        
    def parse(self):
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
        self.name = data['name']
        self.version = data['version']
        self.description = data['description']
        self.author = data["author"]
        self.license = data["license"]
        self.homepage = data["homepage"]
        self.type = data["type"]
        self.keywords = data["keywords"]
        self.dependencies = data["dependencies"]
        self.pages = data["pages"]

        
        
__all__ = ["ManifestConfig"]