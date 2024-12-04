

from fastapi import Request


def get_routes():
    """
    This function returns all the routes of the application 【Admin Panel】.
    :return: A list of routes.
    """
    return [
        {
            "name": "Dashboard",
            "url": "/admin",
            "icon": "fa fa-tachometer-alt",
            "component": "Dashboard"
        },
        {   
            "name": "Users",
            "url": "/admin/users",
            "icon": "fa fa-users",
            "component": "Users"
        },
        {
            "name": "Settings",
            "url": "/admin/settings",
            "icon": "fa fa-cogs",
            "component": "Settings"
         }
    ]
    
    
def plugin_dependencies(request: Request):
    """
    This function returns all the plugins that are required by the application.
    :return: A list of plugins.
    """
    routes = get_routes()
    return {
        "routes": routes
    }
    
    
def theme_dependencies():
    """
    This function returns all the themes that are required by the application.
    :return: A list of themes.
    """
    pass