import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  //const { body } = await req
  let { id } = await JSON.parse(req.body)
  console.log('id++++2233', id)
  let service = {}
  if (id) {
     service = await prisma.services.findUnique({
      where: {
        id
      }
    })
  }
  console.log(service)
  res.json(service)
  // console.log('services', service)
}
