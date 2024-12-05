from configparser import ConfigParser


class CaseSensitiveConfigParser(ConfigParser):
    """_summary_ 继承自 ConfigParser 类，实现大小写敏感的配置解析器

    Args:
        ConfigParser (_type_): _description_ 继承自 ConfigParser 类
    """
    def optionxform(self, optionstr):
        return optionstr

class BaseConfig:
    """
    _summary_ 基础配置类
    用于生成和读取运行时的程序配置信息
    """
    def __init__(self, filename: str ):
        assert filename is not None, "配置文件地址不能为空"
        self.config = CaseSensitiveConfigParser()
        self.filename = filename
        self.config.read(self.filename, encoding="utf-8")
        
    def with_write(self):
        with open(self.filename,'w+') as f:
            self.config.write(f)
    
    # 写入 section
    def add_section(self, section):
        # 写入section 值
        self.config.add_section(section=section)
        self.with_write()
        
    def set_options(self, section, option, value=None):
        '''写入option'''
        self.config.set(section=section,option=option, value=value)
        self.with_write()
        
    def remove_section(self,section):
        '''移除section值'''
        self.config.remove_section(section)
        self.with_write()
        
    def remove_option(self,section,option):
        self.config.remove_option(section, option)
        self.with_write()
    
    def commit(self):
        '''提交写入的配置信息'''
        with open(self.filename,'w') as file:
            self.config.write(file)
    
    def get_option(self, section, option):
        '''获取option值'''
        return self.config.get(section, option)
    
    def get_options(self, section = None):
        '''获取section的所有值'''
        if section is None:
            return self.config.options()
        return self.config.items(section)
    
    def get_all_sections(self):
        '''获取所有section'''
        return self.config.sections()
    
    def get_all_options(self, section):
        '''获取section的所有option'''
        keys = self.config.options(section)
        values = dict()
        for key in keys:
            value = self.config.get(section, key)
            values[key] = value
        return values
    

__all__ = ["BaseConfig"]