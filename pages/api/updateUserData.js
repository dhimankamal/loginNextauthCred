import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {

  //get values
  const  data = await JSON.parse(req.body)
console.log("values test" , data)
  //update values
  const services = await prisma.user.update({where:{
    id:data.id
  },
  data:{
    name:data.values.fullname
  }
})
  console.log("services" , services)
  res.json(services)
}