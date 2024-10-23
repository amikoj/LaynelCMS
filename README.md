# LaynelCMS

LaynelCMS is a simple and lightweight content management system built with Python, FastAPI, SQLAlchemy and MySQL. It is designed to be easy to use and customize, and is ideal for small to medium-sized websites.


## Technologies Used

- FastAPI: A fast, easy to use, web framework for building APIs with Python.
- SQLAlchemy: A Python SQL toolkit and Object Relational Mapper.
- MySQL: A fast, reliable, and scalable database management system.
- NextJS: A React-based framework for building user interfaces.
- React: A JavaScript library for building user interfaces.
- Bootstrap: A CSS framework for building responsive web pages.
- Docker: A containerization platform for building and running applications.
- Nginx: A web server that can act as a reverse proxy, load balancer, and HTTP cache.

## Features

- Simple and lightweight design
- User-friendly interface
- Built-in blog system
- Customizable templates
- SEO-friendly
- Secure
- Free and open-source
- Easy to use
- Customizable
- Mobile-friendly
- Easy to install and setup
- Free support

## Requirements
- Python 3.8 or higher
- MySQL 5.7 or higher
- FastAPI 0.115.2 or higher
- SQLAlchemy 1.4 or higher
- Docker (optional)
- Nginx (optional)
- React 18 or higher
- NextJS 14 or higher

## Work directory structure

```
LaynelCMS
├── app
│   ├── api
│   │   ├── __init__.py
│   │   ├── blog.py
│   │   ├── home.py
│   │   ├── login.py
│   │   ├── register.py
│   │   └── user.py
│   ├── core
│   │   ├── __init__.py
│   │   ├── db.py
│   │   ├── exceptions.py
│   │   ├── security.py
│   │   └── settings.py
│   ├── models
│   │   ├── __init__.py
│   │   ├── blog.py
│   │   ├── user.py
│   │   └── __init__.py
│   ├── templates
│   │   ├── blog
│   │   │   ├── create.html
│   │   │   ├── delete.html
│   │   │   ├── edit.html
│   │   │   ├── index.html
│   │   │   └── show.html
│   │   ├── home
│   │   │   ├── index.html
│   │   │   └── login.html
│   │   ├── layout
│   │   │   ├── base.html
│   │   │   └── nav.html
│   │   ├── register.html
│   │   └── user
│   │       ├── create.html
│   │       ├── delete.html
│   │       ├── edit.html
│   │       ├── index.html
│   │       └── show.html
│   ├── __init__.py
│   ├── main.py
│   └── routes.py
├── config.py
├── docker-compose.yml
├── Dockerfile
├── manage.py
├── nginx.conf
├── README.md
├── requirements.txt
└── uwsgi.ini
```

## Installation

To install LaynelCMS, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/caihaifei/LaynelCMS.git
```

2. Install the required packages using pip:

```
pip install -r requirements.txt
```

3. Create a MySQL database and user with the following command:

```
mysql -u root -p
```

```
CREATE DATABASE laynelcms;
CREATE USER 'laynelcms'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laynelcms.* TO 'laynelcms'@'localhost';
```

4. Update the database configuration in `config.py` to match your MySQL database settings.

5. Run the following command to create the database tables:

```
python manage.py db upgrade
```

6. Start the development server:

```
python manage.py runserver
```

You can now access the CMS at `http://localhost:5000`.

## Credits

- [<NAME>](https://github.com/caihaifei)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.  