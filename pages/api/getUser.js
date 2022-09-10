import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  const { body } = await req

  console.log('get id data', body)

  const services = await prisma.user.findUnique({
    where: {
      id: body?.accessToken
    }
  })
  console.log('services', services)
  res.json(services)
}
