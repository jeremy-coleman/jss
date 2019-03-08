import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
var jetpack = require('fs-jetpack')


const PACKAGES = jetpack.find('build/es', { 
      matching: ["./*"],
      recursive: false,
      files: false,
      directories: true 
})



const MonoPackageDeps = () => {
let deps = []
PACKAGES.PKG_JSONS.forEach((pkgJsonFile) => {
   let theFileContents = jetpack.read(pkgJsonFile, 'json')
    deps.push(Object.keys({...theFileContents.dependencies, ...theFileContents.devDependences, ...theFileContents.peerDependencies} || {}))
  })
  return [...new Set(...deps)]
}

const EXTERNALS = MonoPackageDeps()

async function main() {
    let results = []

    PACKAGES.PACKAGES.forEach((pkg) => { 
    
    const basePath = path.relative(__dirname, pkg)
    const pkgEntryFileArray = path.join(basePath, 'lib/index.js'); 
      //console.log(pkg.location)

      //console.log(input)

    results.push({
        input: pkgEntryFileArray,
        output: [
            {
                file: path.join(basePath, "bundle/index.js"),
                format: 'es'
            },
        ],
        external: EXTERNALS,
        plugins: [
          peerDepsExternal({includeDependencies: true}),
          //sourcemaps(),
          resolve({
              extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
              browser: true,
              preferBuiltins: false,
          }),
          commonjs({namedExports: {'resource-loader': ['Resource']}}),
          //typescript()
          //sucrase({transforms: []})
          //autoExternal(),
          //string({include: ['**/*.frag','**/*.vert']}),
          //replace({__VERSION__: repo.version}),
          //babelTranspile({extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"]}),
          //bubleTranspile(),
      ],
    });
 });

  return results;
}

export default main();




// const tsFiles = jetpack.find(
//   'packages', { matching: [
//     "**/*.js",
//     "**/*.ts",
//     "**/*.tsx",
//     "**/*.jsx"
// ], files: true, directories: false });
