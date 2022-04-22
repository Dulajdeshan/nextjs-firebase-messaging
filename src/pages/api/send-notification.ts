import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    if(request.method !== 'POST') {
        response.setHeader('Allow', ['POST'])
        response.status(405).json({
            message: `Method ${request.method} Not Allowed`
        })
    }else {

        const {token, title, body} = request.body;

        if(!token) {
            response.status(400).json({
                message: 'Missing parameters - token'
            })
        }else {
            try {
                const res = await fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    body: JSON.stringify({
                        to: token,
                        notification: {
                            title: title ?? "Test Notification",
                            body: body ?? "Test Notification Body"
                        }
                    }),
                    headers: { 'Content-Type': 'application/json', 'Authorization': `key=${process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY}` },
                });
                if(res.status === 200) {
                    const data = await res.json();
                    response.status(200).json(data)
                }else {
                    response.status(res.status).json({
                        message: res.statusText
                    })
                }

            }catch (error: any) {
                console.log(error);
                response.status(500).json({
                    message: error.message ?? 'Internal Error'
                })
            }

        }

    }


}