## 插件
本目录用于存放插件信息，可以通过将插件放入此目录，来实现插件的自动加载。



### 如何编写插件
插件的结构如下：
```
plugins/
├── plugin1/
│   ├── manifest.json
│   ├── app.py
│   ├── README.md
│   └── ...
├── plugin2/
│   ├── manifest.json
│   ├── app.py
│   ├── README.md
│   └── ...
└── ...
```

- `manifest.json`：插件的配置文件，用于配置插件的名称、版本号、作者、描述、依赖等信息。
- `app.py`：插件的主程序，用于实现插件的功能。
- `README.md`：插件的说明文档，用于介绍插件的功能、使用方法、注意事项等。


如下为一个简单插件的示例：

```
plugins/
├── myplugin/
│   ├── manifest.json
│   ├── app.py
│   ├── README.md
│   └── ...
└── ...


# manifest.json
{
    "name": "myplugin",
    "version": "1.0.0",
    "author": "Laynel",
    "description": "This is a simple plugin.",
    "dependencies": []
}

# app.py
def hello_world():
    print("Hello, world!")


# README.md
# myplugin

## 功能

- 打印“Hello, world!”到控制台。

## 使用方法

在LaynelCMS的`config.json`文件中，添加`myplugin`到`plugins`列表中：

'''
{
    "plugins": [
        "myplugin"
    ]
}
'''

```

然后激活插件，即可使用插件的功能。   



### 如何加载插件

插件的加载方法请参考LaynelCMS的官方文档。


### 如何管理插件

插件的管理方法请参考LaynelCMS的官方文档。


### 如何更新插件

插件的更新方法请参考LaynelCMS的官方文档。


### 如何卸载插件

插件的卸载方法请参考LaynelCMS的官方文档。

## 注意事项

- 插件的开发者应当遵守LaynelCMS的开发规范，确保插件的安全性和稳定性。
- 插件的开发者应当遵守LaynelCMS的开源协议，确保插件的开源性。
- 插件的开发者应当遵守LaynelCMS的版权协议，确保插件的版权归属。
- 插件的开发者应当遵守LaynelCMS的插件使用协议，确保插件的合法使用。
- 插件的开发者应当遵守LaynelCMS的插件命名规范，确保插件的名称唯一性。
- 插件的开发者应当遵守LaynelCMS的插件版本号规范，确保插件的版本号唯一性。
- 插件的开发者应当遵守LaynelCMS的插件更新规范，确保插件的更新及时性。