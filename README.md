# BTC application

## 1. HOW TO RUN

Inside project root directory build an image:

```bash
docker build . -t <your username>/node-web-app
```

Run the image:
```bash
docker run -p 8080:8080 -d <your username>/btc-app
```

##### 1.1. @application/sitemap-main
Використовується для створення сайтмапів для динамічних каталогів, статичних каталогів та кінцевих сторінок без тегу <changefreq>.

Запускається згідно з графіком зазначеного в полі ``config.sitemap.jobs.main.interval``.

##### 1.2. application/sitemap-final_page
Використовується для створення сайтмапів для кінцевих сторінок окремо з тегами ``<changefreq>daily</changefreq>``
``<changefreq>weekly</changefreq>``
``<changefreq>monthly</changefreq>``

Запускається згідно з графіком зазначеного в полі ``config.sitemap.jobs.final_page.interval``.

## 2. API

Программний інтерфейс створений для керування кронами сервісу за допомогою адмінки.

```bash
  sitemap-server:
    build:
      context: ./../bu-auto-services/@application-sitemap
    container_name: sitemap-server
    hostname: sitemap-server
    env_file:
      - secrets.env
    networks:
      - backend
    ports:
      - '3600:80'
    entrypoint: npm run server
```

##### 2.1. /getJobsInfo
GET an array ob objects from MongoDB with all crons info ``advertisement.vin_from_chat``.

##### 2.2. /regenerate
POST request to regenerate required cron job in ``2 seconds``.

Params - ``sitemapJobName``

##### 2.3. /reschedule
POST request to reschedule required cron job.

Functionality is not ready yet
