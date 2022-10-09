import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  let { id } = await JSON.parse(req.body)
  let service = {}
  if (id) {
     service = await prisma.services.findUnique({
      where: {
        id
      }
    })
  }
  res.json(service)
}
