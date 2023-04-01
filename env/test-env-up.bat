call docker compose -f env\\docker-compose.yml up -d
call npx knex migrate:latest
call npx knex seed:run