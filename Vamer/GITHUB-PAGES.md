# Publicar VAMER en GitHub Pages

Desde esta PC no se puede subir solo a tu cuenta de GitHub: hace falta **tu usuario** y subir los archivos (navegador, GitHub Desktop o Git).

## 1. Carpeta que debe subirse (toda)

En el mismo nivel que `index.html` tenés que tener como mínimo:

- `index.html` — entrada para GitHub Pages (lleva a `vamer.html`)
- `vamer.html`
- `admin.html`
- `js/cms.js`
- `data/site-config.json`
- `vamer-assets/` (imagenes: hero, proyecto, etc.)

## 2. Crear el repositorio en GitHub

1. Entrá a [https://github.com/new](https://github.com/new)
2. Nombre del repo: por ejemplo `vamer-site` (público para Pages gratis).
3. **No** marques "Add a README" si vas a subir una carpeta ya armada.
4. Crear repositorio.

## 3. Subir archivos

**Opción A — Web:** en el repo vacío, "uploading an existing file", arrastrá **todo** el contenido de la carpeta `Vamer` (incluida `vamer-assets`), confirmá commit.

**Opción B — GitHub Desktop:** Add local repository → elegí la carpeta `Vamer` → Publish repository.

**Opción C — Git en terminal** (si lo instalás):

```bash
cd ruta/a/Vamer
git init
git add .
git commit -m "Sitio VAMER estático"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

(Reemplazá `TU-USUARIO` y `TU-REPO`.)

## 4. Activar GitHub Pages

1. Repo en GitHub → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **main**, carpeta: **/ (root)**
4. Guardar. A los 1–3 minutos aparece el enlace.

## 5. Enlace para el cliente

Si tu usuario es `miusuario` y el repo `vamer-site`, la URL queda:

`https://miusuario.github.io/vamer-site/`

Eso abre `index.html` y redirige a `vamer.html`.

Centro de mando (editor):

`https://miusuario.github.io/vamer-site/admin.html`

**Importante:** reemplazá `miusuario` y `vamer-site` por los tuyos reales.

## 6. Sitio de usuario (sin nombre de repo en la URL)

Si el repo se llama exactamente **`TU-USUARIO.github.io`** (una sola vez por cuenta), la URL base es:

`https://TU-USUARIO.github.io/`

En ese caso subí el mismo contenido a la raíz de ese repo.
