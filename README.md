Приложение написано по архитектуре https://feature-sliced.design/ru/docs

Стек приложения:
- React
- Typescript
- Redux
Для имитации бэкенда был использовано фейковый API сервер с помощью (json-server). JSON файл с вопросами тестов находится в папке json-server.

В приложение сделано 3 страницы
1) Начальная страница с выбором теста, вводом имени и кнопкой запуска теста.
2) Страница с вопросами теста.
3) Страница с результатом тестирования. Данные отображаются по последнему тесту и есть история по пройденным тестам.
   
Чтобы запустить приложение локально, необходимо:
 1) yarn install - для установки необходимых зависимостей.
 2) yarn start:dev:server - для запуска фейкового API
 3) yarn start - для запуска приложения
После этого, можно использовать приложение.
