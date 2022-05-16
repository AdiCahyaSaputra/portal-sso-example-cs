import { useState } from 'react'
import Container from 'components/layout/Container'

import Head from "next/head"
import Route from "next/router"


import cookie from "js-cookie"
import { guest } from "middlewares/page"
import { GetServerSideProps } from 'next'


export const getServerSideProps: GetServerSideProps = async (ctx) => {
 await guest(ctx)
 return {
	 props: {}
 }
}

export default function login() {
	const [ user, setUser ] = useState({
		email: "",
		password: ""
	})

	function getValue(e: any): void {
		const name = e.target.name
		setUser({
			...user,
			[name]: e.target.value
		})
	}

	async function loginHandler(e: any):Promise<void> {
		e.preventDefault()

		const req = await fetch('/api/auth/login', {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify(user)
		})
		
		const res = await req.json()
		cookie.set("token", res.token, { expires: 7 })
		
		Route.push("/")
	}

	return (
		<div>
			<Head>
				<title>Login | SSO</title>
			</Head>

			<Container>
				<div className="mt-4 w-10/12 
					md:w-6/12 mx-auto p-4">
					<h1 className="text-2xl font-bold
						text-gray-700 inline-block">
						Login | SSO
					</h1>
					<div className={
						`${ user.email && user.password ? 'w-[100%]' : 
							user.email || user.password ? 'w-[60%]' : 'w-[10%]'} 
						h-1 transition-all duration-300 ease-in-out 
						bg-gray-700 mt-4`}></div>
					<form className="mt-16" onSubmit={loginHandler}>
						<div className="w-full flex flex-col">
							<input 
								onChange={getValue}
								placeholder="Example@gmail.com"
								id="email"
								name="email"
								type="email"
								autoComplete="off"
								className="outline-none order-last
									px-2 py-1.5 rounded-md border-2
									text-sm mt-1 w-full focus:border-gray-300 
									border-gray-200 peer"
							/>
							<label htmlFor="email"
								className={`
									block ${ user.email ? 
									"text-gray-700" : "text-gray-500/80" } 
									order-first font-bold 
									peer-focus:text-gray-700 
									transition-colors duration-300 
									ease-in-out
								`}>
								Email
							</label>
						</div>
						<div className="w-full mt-4 flex flex-col-reverse">
							<input 
								onChange={getValue}
								placeholder="Password"
								id="password"
								name="password"
								type="password"
								autoComplete="off"
								className="outline-none
									px-2 py-1.5 mt-1 rounded-md border-2
									text-sm w-full focus:border-gray-300
									border-gray-200 peer"
							/>
							<label htmlFor="password"
								className={`
									block ${ user.password ? "text-gray-700" :
									"text-gray-500/80" }
									font-bold peer-focus:text-gray-700
									transition-colors duration-300 
									ease-in-out
								`}>
								Password
							</label>
						</div>
						<button type="submit"
							className="px-4 py-2 text-center bg-gray-700
								w-full text-white mt-12 rounded-md font-bold
								hover:bg-gray-800 transition-colors duration-300
								ease-in-out"
						>
							Login
						</button>
					</form>
				</div>
			</Container>
		</div>
	)
}
