
import { useState, useEffect } from 'react';
import { getSvgAsset } from '../services/AssetsProvider';

const SvgComponent = ({ name, className = '' }) => {
  const [svgCode, setSvgCode] = useState(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const svg = await getSvgAsset(name);
        setSvgCode(svg);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };
    fetchSvg();
  }, [name]);

  return svgCode ? (
    <div className={`inline-block ${className}`} dangerouslySetInnerHTML={{ __html: svgCode }} />
  ) : null;
};

export default SvgComponent;
