FROM php:8.1.8-fpm-alpine3.15
WORKDIR /code
RUN apk add icu-dev
RUN docker-php-ext-configure intl && docker-php-ext-install intl