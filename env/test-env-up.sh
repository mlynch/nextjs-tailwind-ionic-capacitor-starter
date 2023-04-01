#!\bin\bash
docker compose -f env\\docker-compose.yml up -d
npx knex migrate:latest
npx knex seed:run