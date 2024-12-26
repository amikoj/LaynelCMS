__table_prefix__ = 'laynel_'

def table_name(table_name: str):
    '''
    This function is used to generate the table name with the prefix.
    '''
    return  f'{__table_prefix__}{table_name}'



__all__ = ['table_name', '__table_prefix__']