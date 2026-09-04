# DAVA'S — Home Colección Japón

Proyecto fuente del home DAVA'S preparado para GitHub y Vercel a partir de la versión v25.

## Estado incluido

- Home completo con hero, catálogo, Colección Japón, taller, clientes, invitación de Escuela/Kit, showroom y footer.
- Showroom ubicado al final, después de clientes y Escuela/Kit.
- Hero ajustado para mantener el texto fuera de la pieza principal.
- `public/cursos/index.html` contiene la interna aprobada de Escuela, integrada sin modificar su código.
- `/cursos` abre esa interna mediante una regla externa al HTML.
- `app/gestion/` reservado y sin diseño; solo contiene `.gitkeep`.
- Assets originales conservados en `public/`.

## Revisión de la interna de Escuela

- El HTML entregado se conserva byte por byte, con SHA-256 `4E09CAD02E4C0558233B918A9D641BE2FE91109C0AD506287EB74F49512B94D0`.
- Es autocontenido para el diseño y la navegación: incorpora sus estilos, lógica, imágenes y un video MP4 dentro del mismo archivo.
- La vista de revisión permite entrar como estudiante de prueba, ver los 13 bloques de la ruta, abrir módulos y entrar a sus lecciones.
- Pendiente del archivo original: de sus 10 referencias MP4, una contiene video y nueve son marcadores `data:video/mp4;base64,` sin contenido, incluidos el video de método y los reproductores de lecciones. No se alteraron para respetar el HTML aprobado.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Verificación

```bash
npm run build
npm run lint
```

## Vercel

Importa el repositorio en Vercel con el preset **Next.js**. No hace falta definir un comando de compilación personalizado.

Configura `NEXT_PUBLIC_SITE_URL` con la URL final del despliegue para que las tarjetas de vista previa social usen el dominio correcto.

Este paquete no despliega ni modifica la publicación existente en ChatGPT Sites.
