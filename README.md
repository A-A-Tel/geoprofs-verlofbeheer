# GeoProfs verlofbeheer

## Projectopzet

Installeer de deps met:
```shell
cp .env.example .env
composer install --dev
npm install --include=dev
php artisan key:generate
```

Voor het opzetten van de database voer je deze commando's uit:
```shell
php artisan migrate:fresh --seed
```


Je kan het project uitvoeren met:
```shell
node ./node_modules/concurrently/dist/bin/index.js "php artisan serve" "npm run dev"
```

## Format

Met deze commando's kun je de code standaardiseren.

PHP:
```shell
php ./vendor/bin/pint
```

React:
```shell
npm run format
npm run lint
```

## Testen

Met deze commando kun je testen uitvoeren

### Laravel
Laravel gebruikt PHPUnit voor testen, deze zijn gemakkelijk uit de voeren met:
```shell
php artisan test
```
