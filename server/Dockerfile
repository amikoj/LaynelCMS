FROM node:18 AS build

WORKDIR /app

COPY . .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
# 把源代码复制过去， 以便报错能报对行
COPY --from=build /app/src ./src
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./
RUN apk add --no-cache tzdata

ENV TZ="Asia/Shanghai"

RUN npm config set registry https://registry.npmmirror.com
RUN npm install --production
RUN npm install -g prisma
RUN npx prisma generate
RUN npx prisma migrate save --experimental
RUN npx prisma migrate up --experimental


ENV DATABASE_URL=mysql://laynelcms:laynelcms123@mysql:3306/laynelcms

# 如果端口更换，这边可以更新一下
EXPOSE 7001

CMD ["npm", "start"]