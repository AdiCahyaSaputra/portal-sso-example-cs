import jwt from "jsonwebtoken"

async function authorization(req: any, res: any) {
	const {token} = req.body
	const secret: any = process.env.JWT_SECRET

	return jwt.verify(token, secret, async (err: any, decode: any) => {
		if (err) return res.status(403).end()
		return await decode
	})
}

export default authorization
