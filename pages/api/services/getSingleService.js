import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  const { body } = await req
  const service = await prisma.services.findUnique({
    where: {
      id: body?.id
    }
  })
  console.log('services', service)
  res.json(service)
}
