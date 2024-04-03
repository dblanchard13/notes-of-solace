import { PrismaClient } from '@prisma/client'

const globalForDB = globalThis as unknown as {
  db: PrismaClient | undefined
}

export const db =
  globalForDB.db ??
  new PrismaClient({
    log: ['warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDB.db = db
}
