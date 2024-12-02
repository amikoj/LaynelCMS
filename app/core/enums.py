# plugin status
from enum import Enum

# plugin status
class PluginStatus(Enum):
    NOT_INSTALLED = 'default' # default status
    INSTALLED = 'installed' # installed but not activated
    ACTIVATED = 'activated' # activated and ready to use
    DEACTIVATED = 'deactivated' # deactivated and not ready to use
    ERROR = 'error' # error occurred during installation or activation
    
# plugin type    
class PluginType(Enum):
    PLUGIN = 'plugin'
    THEME = 'theme'
    

# export all enums
__all__ = ['PluginStatus', 'PluginType']