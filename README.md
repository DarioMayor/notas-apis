# notas-apis

Proyecto integrador de las clases 4 y 5:

- `web`: aplicación Next.js con el tablero de notas, sin autenticación.
- `api`: API REST en NestJS con validación, Swagger y persistencia JSON.

## Ejecutar

En una terminal:

```powershell
cd api
npm.cmd install
npm.cmd run start:dev
```

En otra terminal:

```powershell
cd web
npm.cmd install
npm.cmd run dev
```

La aplicación web queda en `http://localhost:3000` y la documentación de la API en `http://localhost:4000/docs`.

La variable `NEXT_PUBLIC_API_URL` permite cambiar la URL de la API. Su valor predeterminado es `http://localhost:4000/api`.
