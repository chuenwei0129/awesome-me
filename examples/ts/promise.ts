type awaited<T> = T extends Promise<infer R> ? R : never
