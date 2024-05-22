const zip = (arr: unknown[][]) => {
  return arr.reduce<unknown[][]>(
    (acc, curr) => (
      curr.forEach((v: unknown, k: number) => acc[k].push(v)), acc
    ),
    Array.from({ length: Math.max(...arr.map((v) => v.length)) }).map(() => []),
  )
}

export default zip
