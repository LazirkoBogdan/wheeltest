import { Loader } from "pixi.js";
import { initAssets, particle,sounds} from "../config/assets";
import { parseAssets } from "../utils/AssetParser";
import { sound } from '@pixi/sound';
import {log} from "../utils/Logger";
const store: any = {};
store.assets = {};
store.assets.textures = [];

function init() {
  return new Promise<void>((res) => {
    Loader.shared.add(initAssets).load((Loader, resources) => {
      store.initAssets = parseAssets(resources);
      pushTexture("init", store.initAssets.atlas);
      res();

    });
  });

}

function initSound() {
    sound.add(sounds,{})

}

function getTextureFromAtlases(name:string){
  const tex = store.assets.textures
  let  texture
  for (const textureKey in tex) {
    for (const [key] of Object.entries(tex[textureKey])) {
      if(key === name){
        texture =  tex[textureKey][key]
        break
      }
    }
  }

  if(texture){
    return texture
  }
  else {
    log('Cant Find Texture', 'WARNING')
  }
}

function pushTexture(name: string, tex: any) {
  store.assets.textures[name] = tex;
}

function particleAssets() {
  return new Promise<void>((res) => {
    // eslint-disable-next-line no-unused-vars
    Loader.shared.add(particle).load((Loader, resources) => {
      store.particleAssets = parseAssets(resources);
      pushTexture("particle", store.particleAssets.atlas);
      res();
    });
  });
}
export const LoadManager = { init, particleAssets,initSound,getTextureFromAtlases, store };
