# 使用 python:3.12-alpine 作为基础镜像并集成node 16
FROM python:3.12-alpine

# 安装依赖
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libxml2-dev \
    libxslt-dev \
    libjpeg-dev \
    zlib1g-dev \
    libpq-dev \
    git \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

# 安装node 16
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn


# 创建工作目录
RUN mkdir /LaynelCMS

# 设置工作目录
WORKDIR /LaynelCMS

# 复制requirements.txt文件
COPY requirements.txt ./

# 复制package.json文件
COPY package.json ./

# 安装依赖
RUN yarn install  

# 升级pip
RUN pip install --upgrade pip

# 安装依赖
RUN pip install --trusted-host pypi.python.org  -r requirements.txt

# 复制项目文件
COPY . .

# Define environment variable
ENV LANG=C.UTF-8

# Build the application
RUN npm run build

# 启动fastapi
RUN gunicorn -c gunicorn.conf.py main:app

# Make port 80 available to the world outside this container
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]