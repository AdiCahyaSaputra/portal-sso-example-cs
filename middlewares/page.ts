import nookies from "nookies"

export async function guest(ctx: any) {
	const {token} = nookies.get(ctx)
	// nookies.destroy(ctx, 'token')

	console.log(token)

	if (token) return ctx.res.writeHead(302, {
		Location: "/"
	}).end()

}

export async function auth(ctx: any) {
	const {token} = nookies.get(ctx)

	console.log(token)

	if (!token) return ctx.res.writeHead(302, {
		Location: "/auth/login"
	}).end()

	return {
		token
	}
}


