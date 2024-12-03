from os import DirEntry
import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


class Page:
    '''
    This class represents a page in the Plugin System.
    you can create a new page by inheriting this class and implement the render method.
    The render method should return a TemplateResponse object.
    '''
    
    PAGE_DIR = "pages" # 页面目录
    STATIC_DIR = "static" # 静态资源目录
    
    '''
    This class represents a page in the Plugin System.
    {
        
        "name": "plugin_name", // 页面名称
        "title": "Plugin Title", // 页面标题
        "path": "path/to/plugin", // 页面文件地址
        "url": "http://example.com/plugin", // 页面访问地址
        "icon": "icon_url", // 页面图标
        "description": "Plugin Description" // 页面描述，可空
    }
    
    '''
    
    @property
    def plugin_name(self):
        return self.plugin_dir.name
    
    def __init__(self,app: FastAPI, plugin_dir: DirEntry[str],name: str, title: str, path: str, url: str,   description: str = None, icon: str = None,):
        self.name = name
        self.plugin_dir = plugin_dir
        self.url = url
        self.description = description
        self.path = path
        self.icon = icon
        self.title = title
        self.app = app
        self.templates = Jinja2Templates(
            directory=os.path.join(plugin_dir.path, Page.PAGE_DIR),
            trim_blocks=True,
            lstrip_blocks=True,
            )
        
        # 注册路由和静态文件
        self.register()
        
    
    def render(self, request: Request):
        """
        Render the page template, not support context yet.
        :param request: The request object. 
        :return: The rendered template response.
        
        """
        return self.templates.TemplateResponse(self.path, {"request": request, "context":{}})
        
        
    def register(self):
        '''
        Register the page route and static files.
        '''
        static_dir = os.path.join(self.plugin_dir.path, Page.STATIC_DIR)
        self.app.mount(f"/{self.plugin_name}/{Page.STATIC_DIR}", StaticFiles(directory=static_dir), name=f"{self.plugin_name}_{Page.STATIC_DIR}")
        self.app.get(self.url, response_class=HTMLResponse)(self.render)
        
    def to_dict(self):
        return {
            "name": self.name,
            "title": self.title,
            "path": self.path,
            "url": self.url,
            "description": self.description,
            "icon": self.icon
        }   
        

    def __repr__(self):
        return f"Page(name='{self.name}', title='{self.title}', path='{self.path}', url='{self.url}', description='{self.description}', icon='{self.icon}')"
        
        
    def __str__(self):
        return f"Page {self.name} created."
        
        
        
__all__ = ['Page']