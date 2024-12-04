import json
from os import DirEntry,path
import os
from fastapi import FastAPI
from .enums import PluginStatus, PluginType
from .page import Page


class PluginInfo:
    PLUGIN_DIR = 'plugins'  # prefix of the plugin directory name
    
    
    def __init__(self,app: FastAPI,  dirpath: DirEntry):
        self.dirpath: DirEntry[str] = dirpath  # directory path of the plugin
        self.app: FastAPI = app  # FastAPI app instance
        self.valid: bool = False  # whether the plugin is valid or not
        self.name: str = None  # name of the plugin
        self.description: str = None  # description of the plugin
        self.version: str = None  # version of the plugin
        self.author: str = None  # author of the plugin
        self.url: str = None  # url of the plugin
        self.license: str = None  # license of the plugin
        self.homepage: str = None  # homepage of the plugin
        self.dependencies: list[str] = []  # list of dependencies of the plugin
        self.keywords: list[str] = []  # list of keywords of the plugin
        self.pages: list[Page] = []  # list of pages of the plugin
        self.status: PluginStatus = PluginStatus.NOT_INSTALLED  # status of the plugin
        self.type: PluginType = PluginType.UNKNOWN  # type of the plugin
        self.main: str = None  # main module of the plugin
        self.pageDir: str = None  # directory of the plugin's pages
        self.manifest = {}  # manifest of the plugin
        
        # load the plugin information
        self.load(dirpath)
        
    def dumpInfo(self, manifest: dict):
        """
        Dump the plugin information to the console.
        """
        self.name = manifest.get('name')
        self.description = manifest.get('description')
        self.version = manifest.get('version')
        self.author = manifest.get('author')
        self.url = manifest.get('url')
        self.license = manifest.get('license')
        self.homepage = manifest.get('homepage')
        self.dependencies = manifest.get('dependencies', [])
        self.keywords = manifest.get('keywords', [])
        self.main = manifest.get('main')
        self.type = PluginType(manifest.get('type', PluginType.UNKNOWN))
        self.status = PluginStatus(manifest.get('status', PluginStatus.NOT_INSTALLED))
        self.pageDir = Page.PAGE_DIR
        self.pages =    manifest.get('pages', [])
        
        if self.status == PluginStatus.ACTIVATED:
            print(f"Plugin {self.name} is activated.")
            self.enable()
        else:
            print(f"Plugin {self.name} is not activated. current status: {self.status}")


        
    def load(self,dirpath: DirEntry):
        """
        Load the plugin information from the plugin directory.
        """
        pluginPath = dirpath.path
        
        manifestJsonPath =  path.join(pluginPath, 'manifest.json')
        if path.exists(manifestJsonPath):
            with open(manifestJsonPath, 'r') as f:
                manifest = json.load(f)
                self.manifest = manifest
                self.dumpInfo(manifest)
        else:
            print(f"Manifest file not found in {pluginPath}")
            return
    
    def  enable(self):
        """
        Enable the plugin.
        """
        type = self.type
        pages = self.pages
        
        if type == PluginType.THEME:
            '''
            Enable the theme. append the theme directory to the template search path.
            '''
            if pages.__len__() > 0:
                _pages__: list[Page] =  []
                for page in pages:
                    page = Page(app=self.app,plugin_dir=self.dirpath,  **page)
                    _pages__.append(page)
                self.pages = _pages__
            else:
                print(f"No pages found in {self.pageDir}")
            self.valid = True  # set the plugin as valid
            
            pass
        elif type == PluginType.PLUGIN:
            '''
            Enable the plugin.
            '''
            self.valid = True  # set the plugin as valid
        else:
            '''
            Unknown plugin type.
            ''' 
            self.valid = False  # set the plugin as valid
            
        
    
    def disable(self):
        """
        Disable the plugin.
        """
        self.valid = False  # set the plugin as valid
    
    
    
__all__ = ['PluginInfo']