# Finance-Manager

Этот финансовый менеджер. Он нужен для управления переодическими выплатами и распределения их на отдельные покупки.
Этот проект направлен на отслеживания трат.

## Технический стек

Весь проект написан на TypeScript

### Frontend

- NextJS
- Tailwindcss

### Backend

- NestJS
- PrismaORM
- Docker (в частоности Docker Compose для бд PostgreSQL)
- PostgreSQL
- Class Validator для DTO и проверки данных

## Backend

Примерный файл .env

```
POSTGRES_USER=test_user
POSTGRES_PASSWORD=secret
POSTGRES_DB=finance

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}

PUBLIC_FRONTEND_PORT=3010
```

### /route

- `GET /finance` - получение всех `Transaction`

- `POST /finance` - создание новой транзакции

<p>Примерный шаблон</p>

```json
{
	"value": 1,
	"closeDate": "1970-01-01T00:00:00.000Z",
	"operations": [
		{
			"label": "first",
			"value": 200,
			"type": "OTHERS"
		}
	]
}
```

- `DELETE /finance` - удаление транзакции по id

<p>Примерный шаблон</p>

```json
{
	"id": 1
}
```

## TO-DO

- [ ] Сделать крестики на карточках транзакций и операций для их удаления
- [ ] Обновить дизайн (сделать liquid glass ui)
- [x] Добавить dockerfile и конфиг для docker compose
