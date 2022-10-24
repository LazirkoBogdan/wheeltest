let list = {};
export const Global = {
  addGlobal,
  cleanGlobal,
  getGlobal,
};

function addGlobal(name: string, node: any) {
  // @ts-ignore
  list[name] = node;
}

function cleanGlobal() {
  // @ts-ignore
  list = {};
}

function getGlobal(name: string) {
  // @ts-ignore
  if (list[name]) {
    // @ts-ignore
    return list[name];
  } else {
    return null;
  }
}
