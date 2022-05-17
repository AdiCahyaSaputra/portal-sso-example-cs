import type {NextApiRequest, NextApiResponse} from 'next'
import knex from "lib/knex"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

type data = {
    name: string,
    username: string,
    token: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<data>) {
    if (req.method !== "POST") return res.status(401).end()

    const {email, password} = req.body
    const secret: any = process.env.JWT_SECRET

    const user = await knex('users').where('username', email).first()
    const isAuth = await bcrypt.compare(password, user.password)
    if (!isAuth) return res.status(403).end()

    const token = jwt.sign({
        email: user.username,
        password: user.password
    }, secret)

    return res.status(200).json({
        name: "Login Api",
        username: user.username,
        token
    })
}

export default handler
