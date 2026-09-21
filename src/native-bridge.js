import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

function safeName(name) {
  return String(name || 'arquivo').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 120) || 'arquivo';
}

if (Capacitor.isNativePlatform()) {
window.nativeSaveFile = async function nativeSaveFile(filename, base64Data) {
  const name = safeName(filename);
  const path = `Solut_Arquive/${name}`;
  await Filesystem.writeFile({
    path,
    data: base64Data,
    directory: Directory.Documents,
    recursive: true,
  });
  const message = `Arquivo salvo em Documentos/Solut_Arquive: ${name}`;
  if (typeof window.showNativeSaveNotice === 'function') {
    window.showNativeSaveNotice(message);
  } else {
    console.info(message);
  }
};
}
