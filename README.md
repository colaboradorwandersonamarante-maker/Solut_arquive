# Solut_Arquive

Aplicativo web/PWA e Android baseado no artefato original.

## O que foi preparado

- Ícone original substituído pelo PNG fornecido em `resources/icon.png` e `public/assets/icon.png`.
- Removida a dependência do runtime proprietário do artefato original.
- Dados locais permanecem em `localStorage`.
- Exportação funciona no navegador e, no Android, usa o plugin Capacitor Filesystem.
- Bibliotecas DOCX/XLSX/PPTX são empacotadas localmente; o APK não depende de CDN para essas funções.
- Fontes remotas do Google foram removidas para funcionamento offline.
- Capacitor 8 configurado para Android.
- GitHub Actions prepara e publica o APK como artefato.
- GitHub Pages publica uma versão web de preview.

## GitHub

1. Crie um repositório vazio.
2. Envie todo o conteúdo desta pasta.
3. O workflow `Android APK` será executado e disponibilizará o APK de teste em **Actions > run > Artifacts**. Tags `vX.Y.Z` usam o workflow de release, desde que os quatro Secrets de assinatura estejam configurados.
4. Ative GitHub Pages com **GitHub Actions** para obter a URL da versão web.

## Build local

```bash
npm ci
npm run build
npx cap add android
npx @capacitor/assets@3.0.5 generate --android
npx cap sync android
cd android
./gradlew assembleDebug
```

O APK de debug ficará em `android/app/build/outputs/apk/debug/`.

## Assinatura de produção

O workflow atual gera APK de debug. Para publicação na Play Store, deve ser adicionada uma etapa de assinatura usando um keystore guardado em GitHub Secrets. Não coloque keystores ou senhas no repositório.

### Secrets para release

Configure no repositório: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` e `ANDROID_KEY_PASSWORD`. Nunca comite o `.keystore`.
