# GeoProfs verlofbeheer

## Projectopzet

Installeer de deps met:
```shell
cp .env.example .env
composer install --dev
npm install --include=dev
php artisan key:generate
php artisan migrate
```

Je kan het project uitvoeren met:
```shell
node ./node_modules/concurrently/dist/bin/index.js "php artisan serve" "npm run dev"
```

## Format

Met deze commando's kun je de code standaardiseren.

PHP:
```shell
php ./vendor/bin/pint;
npm run format:check;
npm run lint:check;
```
