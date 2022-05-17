import Container from "components/layout/Container"
import {GetServerSideProps} from "next"
import cookie from "js-cookie"
import { auth } from "middlewares/page"

import Route from "next/router"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = await auth(ctx)

  return {
    props: {}
  }
}

export default function Home({ auth }: any) {
  let user: any
  if(typeof window !== "undefined") {
    if(auth.user) localStorage.setItem('user', auth.user)
    user = localStorage.getItem('user') 
  }

  function logoutHandler() {
    if(typeof window !== "undefined") localStorage.clear()
    cookie.remove("token")
    Route.replace("/auth/login")
  }

  return (
    <div>
      <Container>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p onClick={logoutHandler} 
              className="hover:bg-gray-800 text-center 
              px-4 py-2 bg-gray-700 rounded-md text-white
              w-max text-xs font-medium">
              Logout
            </p>
            <p className="px-4 py-2 w-max bg-gray-700
              text-white text-xs rounded-md">
              <span className="font-bold">
                Signed as : </span>{user}
            </p>
          </div>
          <h1 className="text-xl
            text-gray-700 font-bold">
            Applications that are already logged in using this account :
          </h1>
        </div>
        <div className="mt-16 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 px-4 py-2
            border border-gray-200 rounded-md">
            <h1 className="text-lg font-bold">
              Blog Post: NextJS
            </h1>
            <p className="text-gray-400 text-sm">Login At 2 Days Ago</p>
            <p className="text-sm font-medium hover:bg-gray-800 text-center px-3 py-1.5 bg-gray-700 text-white rounded-md mt-10 mb-2">
              Logout in this App
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
