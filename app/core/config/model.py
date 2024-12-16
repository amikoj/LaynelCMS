from enum import Enum
from typing import List, Dict, Any,Optional

from pydantic import BaseModel
from pydantic_settings import BaseSettings


class RouteInfo(BaseModel):
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
    plugin_name: Optional[str] = None  # 关联插件名，用于插件路由挂载，代码生成
    name: str = None  #  name 必填，用于标识路由 【唯一】，可根据name获取路由级别信息
    parent_name: Optional[str] = None  # 父路由名称, 用于生成菜单【可选】，用于指定插件路由挂载的父路由，存在层级关系的，如children,可不指定
    title: Optional[str] = None
    path: Optional[str] = None
    icon: Optional[str] = None
    component: Optional[str] = None
    description: Optional[str] = None
    url: str   # 访问地址  [必填] [唯一]
    hidden: Optional[bool] = False # 是否隐藏, 默认为False[不隐藏]
    redirect: Optional[str] = None # 重定向地址
    children: Optional[List['RouteInfo']] = None
    index: Optional[int] = None # 排序索引，用于生成菜单
    
class ModuleType(Enum):
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
    
class ModuleInfo(BaseSettings):
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
    path: Optional[str] = None
    name: str
    version: str = '0.0.1'
    description: str = ''
    author: str = ''
    homepage: str = ''
    license: str = ''
    type: ModuleType = ModuleType.MAIN
    pages: List[RouteInfo] = None
    repository: Optional[Dict[str, Any]] = None
    keywords: List[str] = None
    dependencies:Optional[List[str]]  = None
    enable: bool = False # 是否启用, 默认为False[未启用]
    
    
class JsLibInfo(BaseModel):
    """
    js库信息类
    Attributes:
        name: 库名称
        version: 版本
        description: 描述
        author: 作者
        homepage: 主页
        license: 许可证
        url: 库地址
    """
    file: str
    name: str
    component: str # 组件名称,唯一标识
    src: Optional[str] = None
    isEntry: Optional[bool] = False
    imports: Optional[List[str]] = None
        
        
__all__ = ['RouteInfo', 'ModuleType', 'ModuleInfo', 'JsLibInfo']