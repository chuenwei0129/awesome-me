const { PrismaClient } = require('@prisma/client')

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
const prisma = globalThis.prisma || new PrismaClient()
globalThis.prisma = prisma

// 导出 prisma 实例，以便在其他文件中使用
module.exports = { prisma }
