
''''
This file contains the variables used in the Module.
'''
# softward manifest file path, it should be in the same file name as the plugins
__manifest_file_path__ = 'manifest.json' 
# configuration file path, it is generated by the system and should be in the same directory as the plugins
__configration_file_path__ = 'config.ini' 

__plugins_dir__ = 'plugins'  # plugins directory name


__all__ = [
    '__manifest_file_path__', 
    '__configration_file_path__',
    '__plugins_dir__'
]