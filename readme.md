# Blog API

API для создания постов в блоге.

## Зависимости
- NPM
- NodeJS/Express.js
- PostgreSQL Server
- Sequelize

## Запуск проекта локально
Установить зависимости проекта с помощью `npm install`

Прежде чем вы сможете запустить проект локально, вам нужно установить базу данных:
```
psql postgres --u postgres

postgres-# CREATE ROLE root WITH LOGIN PASSWORD 'p@ssw0rd!';
postgres-# ALTER ROLE root CREATEDB;
postgres-# \q

psql postgres -U root

postgres=> CREATE DATABASE node_sequelize1;
postgres=> GRANT ALL PRIVILEGES ON DATABASE node_sequelize1 TO root;
postgres=> \q
```

Запустите скрипты миграции Sequelize используя `sequelize db:migrate`

После этого вы можете запустить проект с помощью `DEBUG=myapp:* npm start`

Когда уже программа будет запущена, вы можете получить доступ к API по адресу: `http://localhost:3000/`

## Тестирование Swagger
Swagger документация и тесты доступны на `http://localhost:3000/docs`

Потестировать с Swagger:
 - Создать нового пользователя `POST /users`
 - Войти как новый пользователь `POST /users/login`
 - Swagger запросы с авторизацией:
   - Скопировать токен возвращенный при входе
   - Нажать Authorize кнопку на верху
   - Вставить токен авторизации
   - Нажать Login.
 - Создать пост `POST /posts`
 - Получить информацию о пользователях и постах используя другие endpoint'ы.
   - endpoint'ы с иконкой замка нуждаются в токене авторизации