FROM php:7.4-apache

# Atualiza a lista de pacotes e instala as dependências necessárias
RUN apt-get update -y

RUN apt-get install -y \
    libpq-dev \
    postgresql-client

RUN  docker-php-ext-install pdo pdo_pgsql
