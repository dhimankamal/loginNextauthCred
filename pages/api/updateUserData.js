import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  //get values
  const data = await JSON.parse(req.body)
  const { values } = data
  console.log('values test', values)
  //update values
  const services = await prisma.user.update({
    where: {
      id: data.id
    },
    data: {
      name: values.fullname,
      gender: values.gender,
      placeOfBirth: values.placeOfBirth,
      age: +values.age
    }
  })
  console.log('services', services)
  res.json(JSON.stringify(services))
}
