# Используем официальный Node.js образ
FROM node:23

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Открываем порт приложения
EXPOSE 3000

# Указываем аргумент для выбора команды запуска
ARG COMMAND=start
ENV COMMAND=${COMMAND}

# Запускаем приложение в зависимости от указанной команды
CMD ["sh", "-c", "npm run $COMMAND"]
