# RoyoPack — Frontend

Frontend de la plataforma RoyoPack, desarrollado para **[APBOX](https://apbox.es)**, empresa especializada en soluciones de packaging industrial y e-commerce con más de 20 años de experiencia.

Construido con **Angular 17** y desplegado en **Railway** usando Caddy como servidor web de producción.

## Stack

- **Angular 17** — standalone components, signals
- **TypeScript** — strict mode
- **Caddy** — servidor web en producción (menor uso de CPU/memoria que `ng serve`)
- **Railway** — despliegue con nixpacks
- **ESLint + EditorConfig**

## Repo relacionado

Backend: [`royoPackBackend`](https://github.com/FuentesCubells/royoPackBackend) — Node.js / Express

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4200`

## Despliegue en Railway

El proyecto incluye `nixpacks.toml` y `Caddyfile` preconfigurados para Railway.

```bash
# Railway detecta nixpacks.toml automáticamente
# El build genera el estático y Caddy lo sirve en producción
```

### ¿Por qué Caddy en vez de `ng serve`?

- Menor consumo de memoria y CPU en producción
- Compresión gzip nativa
- Configuración de SPA con `try_files` para el routing de Angular
- Costes de hosting más bajos

## Estructura

```
src/
├── app/          # Módulos, componentes y servicios
└── environments/ # Variables por entorno
```

## Cliente

Desarrollado para [APBOX](https://apbox.es) — soluciones de packaging 360 para empresas industriales, comerciales y e-commerce.
