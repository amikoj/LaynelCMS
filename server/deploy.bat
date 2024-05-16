docker rmi laynel-liaocaowu:latest
docker rmi registry.cn-shanghai.aliyuncs.com/enjoytoday/laynel-liaocaowu:latest
docker build -t laynel-liaocaowu:latest .
docker tag laynel-liaocaowu:latest registry.cn-shanghai.aliyuncs.com/enjoytoday/laynel-liaocaowu:latest
docker push registry.cn-shanghai.aliyuncs.com/enjoytoday/laynel-liaocaowu:latest