import json
from typing import Dict, List


def load_js_libs(file_path: str):
    with open(file_path, 'r') as f:
        chunks = json.load(f)
        
    target: Dict = {}
    for key in chunks:
        targetKey = key.replace('/', '.')[:-3]
        info = chunks[key]
        info['component'] = targetKey
        target[targetKey] = info
    return target



def  load_dependencies(entryJs: Dict, libs: Dict, plugin_name: str) -> str:
    '''加载入口依赖
    '''
    static_prefix = 'static' if plugin_name == 'main' else f'static/{plugin_name}/'
    def load_dep(dep: str) -> str:
        key = dep.replace('/', '.')[:-3]
        info = libs.get(key)
        if not info:
            return ''
        return f'<link rel="modulepreload" crossorigin href="/admin/{static_prefix}/{info['file']}" >'
    deps: List[str] = []
    if 'imports' in entryJs:
        imports = entryJs['imports']
        deps.extend([load_dep(dep) for dep in imports])
        
    if 'css' in entryJs:
        css = entryJs['css']
        for filePath in css:
            deps.append(f'<link rel="stylesheet" href="/admin/{static_prefix}/{filePath}" >')
    return deps


__all__ = ['load_js_libs', 'load_dependencies']