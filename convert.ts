require('sucrase/register')
import { compile } from './flow-to-typescript'
//import { readFileSync, writeFileSync } from 'fs'

import jetpack from 'fs-jetpack'

// let path = './packages/jss/StyleSheet.js'
// let file = jetpack.read(path, 'utf8')

// compile(file, path).then(ts =>
//   jetpack.write('transpiled/jss/StyleSheet.ts', ts)
// )

const PACKAGES = jetpack.find('packages', { 
      matching: ["./*"],
      recursive: false,
      files: false,
      directories: true 
})

// const FILES = jetpack.find('packages', { 
//   matching: ["./**/*.js", "!*.test*"],
//   //recursive: false,
//   files: true,
//   directories: false 
// })

const FILES_TEMP = jetpack.find('packages_temp', { 
  matching: ["./**/*.js", "!*.test*"],
  //recursive: false,
  files: true,
  directories: false 
})

//console.log(FILES_TEMP)


let convertPackages = () => {
  FILES_TEMP.forEach(path => {
    let file = jetpack.read(path, 'utf8')
    compile(file, path).then(ts =>
    jetpack.write(path, ts)

  )
}
)
}

convertPackages()