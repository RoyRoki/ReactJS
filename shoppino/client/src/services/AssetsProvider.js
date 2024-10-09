const svgAssets = import.meta.glob('../assets/svgs/*.svg', { query: '?raw', import: 'default' });


export const getSvgAsset = async (name) => {
  const path = `../assets/svgs/${name}.svg`;
  if (svgAssets[path]) {
    return await svgAssets[path]();
  } else {
    throw new Error(`SVG asset "${name}" not found`);
  }
};