# LaynelCMS

LaynelCMS is a simple and lightweight content management system built with Python, FastAPI, SQLAlchemy and MySQL. It is designed to be easy to use and customize, and is ideal for small to medium-sized websites.


## Technologies Used

- FastAPI: A fast, easy to use, web framework for building APIs with Python.
- SQLAlchemy: A Python SQL toolkit and Object Relational Mapper.
- MySQL: A fast, reliable, and scalable database management system.

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
- PHP 7.2 or higher

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