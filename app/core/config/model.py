from dataclasses import dataclass
from enum import Enum
from typing import List, Dict, Any,Optional


@dataclass
class RouteInfo:
    """
    路由信息类
    Attributes:
        name: 路由名称
        title: 路由标题
        path: 路由路径  
        icon: 路由图标
        component: 路由组件
        description: 路由描述
        url: 路由url
        hidden: 是否隐藏
        redirect: 重定向地址
        children: 子路由列表
    """
    name: str
    title: str
    path: str
    icon: str
    component: str 
    description: str = None
    url: str = None 
    hidden: bool = False
    redirect: str = None
    children: list = None
    
    
    def __post_init__(self):
        if self.children and self.children.__len__() > 0:
            self.children: list[RouteInfo] =  [RouteInfo(**route) for route in self.children]
    
    

class AppType(Enum):
    """
    应用类型枚举类
    Attributes:
        MAIN: 主应用
        PLUGIN: 插件
        THEME: 主题
    """
    MAIN = 'main'
    PLUGIN = 'plugin'
    THEME = 'theme'
    
@dataclass
class AppInfo:
    """
    应用信息类
    Attributes:
        name: 应用名称
        version: 版本
        description: 描述
        author: 作者
        homepage: 主页
        license: 许可证
        type: 应用类型
        pages: 页面路由列表
        repository: 仓库信息
        keywords: 关键字列表
        dependencies: 依赖列表
        plugins: 插件列表
        enable: 是否启用, 默认为False[未启用]
    """
    name: str
    version: str = '0.0.1'
    description: str = ''
    author: str = ''
    homepage: str = ''
    license: str = ''
    type: AppType = AppType.MAIN
    pages: List[RouteInfo] = None
    repository: Optional[Dict] = None
    keywords: List[str] = None
    dependencies: List[str] = None
    enable: bool = False 

    
    def __post_init__(self):
        if self.pages and self.pages.__len__() > 0:
            self.pages: List[RouteInfo] =  [RouteInfo(**route) for route in self.pages]
        else:
            self.pages: List[RouteInfo] = []
            
        
__all__ = ['RouteInfo', 'AppType', 'AppInfo']