import {NextApiRequest, NextApiResponse} from 'next'
import knex from 'lib/knex.js'
import bcrypt from "bcryptjs"

type data = {
    msg: string,
    user: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<data>) {
    if (req.method !== "POST") return res.status(401).end()

    const {username, password} = req.body

    const salt = bcrypt.genSaltSync(10)
    const pw = bcrypt.hashSync(password, salt)

    await knex("users").insert({
        username, password: pw
    })

    const user = await knex("users").where({username}).first()

    return res.status(200).json({
        msg: "Berhasil Membuat User Baru",
        user
    })

}


export default handler
