
export  function parseAssets(resource:any) {
  const res = {
    atlas:{},
    sounds:{}
  }

  const trimPngExtension = (str:string) => {
    return str.replace('.png', '')
  }

  const trimWavExtension = (str:string) => {
    return str.replace('.wav', '')
  }
  for (let resourceKey in resource) {
    if(resource.hasOwnProperty(resourceKey) && resourceKey.includes('animations')) {

    }

    if(resource.hasOwnProperty(resourceKey) && resourceKey.includes('atlases')) {
      if(resource[resourceKey].textures !== undefined){
        let tex = resource[resourceKey].textures
        for (let key in tex) {
          if(tex.hasOwnProperty(key)){
            let newKey =  trimPngExtension (key.substr(key.lastIndexOf('/') + 1))
            // @ts-ignore
            res.atlas[newKey] = tex[key]
          }
        }
      }
    }

    if(resource.hasOwnProperty(resourceKey) && resourceKey.includes('sounds')) {
     const name =  trimWavExtension(resource[resourceKey].name.substr(resource[resourceKey].name.lastIndexOf('/') + 1))
      // @ts-ignore
      res.sounds[name] = resource[resourceKey]
    }



  }
  return res
}
