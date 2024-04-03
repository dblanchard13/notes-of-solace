// import { prisma } from '@/util/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  console.log(user)

  // const match = await prisma.user.findUnique({
  //   where: {
  //     clerkId: user.id as string,
  //   },
  // })

  // if (!match) {
  //   await prisma.user.create({
  //     data: {
  //       clerkId: user.id,
  //       email: user?.emailAddresses[0].emailAddress,
  //     },
  //   })
  // }

  redirect('/notepad')
}

const NewUser = async () => {
  await createNewUser()
  return <div>........</div>
}

export default NewUser
