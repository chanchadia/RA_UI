  export default function getColor (value)
  {
    if(value === 1)
      return '#00B050 !important';
    if(value === 2)
      return '#00B0F0 !important';
    if(value === 3)
      return '#FFFF00 !important';
    if(value === 4)
      return '#FFC000 !important';
    if(value === 5)
      return '#FF3B37 !important';
    return null;
  }

  export function getRiskRatingColor (r, c)
  {
    const colours = [
      ['#FF3B37', '#FF3B37', '#FFC000', '#FFFF00', '#00B0F0'],
      ['#FF3B37', '#FFC000', '#FFC000', '#FFFF00', '#00B0F0'],
      ['#FFC000', '#FFC000', '#FFFF00', '#FFFF00', '#00B0F0'],
      ['#FFFF00', '#FFFF00', '#FFFF00', '#00B0F0', '#00B050'],
      ['#00B0F0', '#00B0F0', '#00B0F0', '#00B050', '#00B050']
    ];
    return colours[r][c];
  }

  export const tableHeaderBgColor = '#eff0e9ff';