// Garante que o binário do Electron está instalado.
// Necessário quando o npm/yarn roda com ignore-scripts=true: o postinstall do
// Electron (que baixa o binário e cria path.txt) não executa e o `dev` falha com
// "Electron uninstall".
import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'

const require = createRequire(import.meta.url)
const electronDir = path.dirname(require.resolve('electron/package.json'))
const pathFile = path.join(electronDir, 'path.txt')
const exeName = process.platform === 'win32' ? 'electron.exe' : process.platform === 'darwin' ? 'Electron.app/Contents/MacOS/Electron' : 'electron'

if (fs.existsSync(pathFile) && fs.existsSync(path.join(electronDir, 'dist', exeName))) {
  process.exit(0)
}

console.log('Binário do Electron não encontrado. Baixando...')
const { downloadArtifact } = require(require.resolve('@electron/get', { paths: [electronDir] }))
const { version } = require(path.join(electronDir, 'package.json'))

const zipPath = await downloadArtifact({
  version,
  artifactName: 'electron',
  platform: process.platform,
  arch: process.arch,
  checksums: require(path.join(electronDir, 'checksums.json'))
})

const dist = path.join(electronDir, 'dist')
fs.mkdirSync(dist, { recursive: true })
// extract-zip trava sem erro em algumas máquinas; usa o extrator do sistema.
const [cmd, args] = process.platform === 'win32'
  ? ['tar', ['-xf', zipPath, '-C', dist]]
  : ['unzip', ['-q', '-o', zipPath, '-d', dist]]
const result = spawnSync(cmd, args, { stdio: 'inherit' })
if (result.status !== 0) {
  console.error(`Falha ao extrair o Electron com "${cmd}".`)
  process.exit(1)
}
const typeDefs = path.join(dist, 'electron.d.ts')
if (fs.existsSync(typeDefs)) fs.renameSync(typeDefs, path.join(electronDir, 'electron.d.ts'))
fs.writeFileSync(pathFile, exeName)
console.log('Electron instalado.')
