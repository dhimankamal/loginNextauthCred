import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  const services = await prisma.services.findMany()
  console.log('services', services)
  res.json(services)
}
