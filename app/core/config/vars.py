
''''
This file contains the variables used in the Module.
'''
# software manifest file path, it should be in the same file name as the plugins
__manifest_file_path__ = 'manifest.json' 
# configuration file path, it is generated by the system and should be in the same directory as the plugins
__configuration_file_path__ = 'config.ini' 

__plugins_dir__ = 'plugins'  # plugins directory name


__all__ = [
    '__manifest_file_path__', 
    '__configuration_file_path__',
    '__plugins_dir__'
]