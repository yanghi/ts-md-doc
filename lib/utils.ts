export function stringifyValue(v: string | number | boolean): string {
  let type = typeof v
  if(type =='string'){
    return `"${v}"`
  }
  
  return v + ""
} 
