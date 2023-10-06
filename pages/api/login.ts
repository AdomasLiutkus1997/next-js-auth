import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_TOKEN_KEY = "super duper secret key";
const cookieOptions = {
    httpOnly: true,
    maxAge: 2592000,
    path: "/",
    sameSite: "Strict",
    secure: false,
};

function setCookie(
    res: any,
    name: string,
    value: string,
    options: Record<string, unknown> = {}
): void {
    const stringValue =
        typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

    res.setHeader("Set-Cookie", serialize(name, stringValue, { ...options }));
}

export function authenticateUser(res: NextApiResponse): void {

    const token = jwt.sign({ email: 'some.test@email.com' }, JWT_TOKEN_KEY, {
        expiresIn: "1d",
    });

    setCookie(res, "auth", token, cookieOptions);
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        authenticateUser(res);
        return res.status(200).json({ success: true });
    }

    return res.status(405).end(); // Method Not Allowed
};