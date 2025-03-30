# Инструкция по запуску React приложения

## Установка

# Клонировать репозиторий
git clone https://github.com/Aleksei-Mikheichev-Veb/test-matrix.git

# Перейти в директорию проекта
cd test-matrix

# Установить зависимости
npm install

## Запуск приложения

# Запуск в режиме разработки
npm start

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Используемые библиотеки
uuid
classnames
reduxjs/toolkit
react-redux
sass

## Структура проекта

src/
├── components/   # React компоненты
├── services/     # Хук для подключения Websocket
├── store/        # Файлы хранилища redux
├── style/        # Стили
├── types/        # Типы assets 
└── App.tsx   # Корневой компонент
