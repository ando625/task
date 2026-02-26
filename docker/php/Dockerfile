FROM php:8.4-fpm

# 設定ファイルをコピー
COPY php.ini /usr/local/etc/php/

# 必要な道具をインストール
RUN apt update && apt install -y \
    default-mysql-client \
    zlib1g-dev \
    libzip-dev \
    unzip \
    curl \
    gnupg

# PHPの拡張機能（魔法の追加パーツ）を入れる
RUN docker-php-ext-install pdo_mysql zip bcmath

# Node.js (React/TypeScriptを動かすのに必須) をインストール
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Composer (PHPの道具箱) をインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www