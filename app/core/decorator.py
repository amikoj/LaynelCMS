# 定时器函数
from functools import wraps
import threading

def debounce(wait, immediate=False):
    """Debounce decorator to prevent a function from being called
    more than once in a specified time.
    """
    def decorator(func):
        timer = None
 
        @wraps(func)
        def wrapper(*args, **kwargs):
            nonlocal timer
 
            def call_it():
                nonlocal timer
                timer = None
                func(*args, **kwargs)
 
            if timer is None:
                timer = threading.Timer(wait, call_it)
                timer.start()
            else:
                timer.cancel()
                timer = threading.Timer(wait, call_it)
                timer.start()
 
        return wrapper
 
    return decorator


__all__ = ['setTimeout', 'debounce']