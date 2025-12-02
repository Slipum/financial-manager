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
PORT=4000
POSTGRES_USER=test_user
POSTGRES_PASSWORD=secret
POSTGRES_DB=finance

DATABASE_URL="postgresql://test_user:secret@localhost:5432/finance"
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
