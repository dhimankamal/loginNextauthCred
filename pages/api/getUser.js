import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {

  // let data = await JSON.parse(req.body)

   console.log("get id data" )
 
  const services = await prisma.user.findUnique({
    where:{
        id:'cl7loi59c0014f8fjrxjndtbq'
    }
  })
  console.log('services', services)
  res.json(services)
}
