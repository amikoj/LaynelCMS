docker rmi laynel-api:latest
docker rmi registry.cn-shanghai.aliyuncs.com/enjoytoday/laynel-api:latest
docker build -t laynel-api:latest .
docker tag laynel-api:latest registry.cn-shanghai.aliyuncs.com/enjoytoday/laynel-api:latest
docker push registry.cn-shanghai.aliyuncs.com/enjoytoday/laynel-api:latest
