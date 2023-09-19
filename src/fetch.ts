import https from 'https';

export default function fetch<Type>(path: string): Promise<Type> {
    return new Promise<Type>((response, reject) => {
        https.get(
            {
                host: 'www.duolingo.com',
                path: path,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'duolingo-readme-stats'
                }
            },
            callback => {
                let data = '';

                callback.on('data', chunk => (data += chunk));
                callback.on('end', () => response(JSON.parse(data)));
                callback.on('error', error => reject(error));
            }
        );
    });
}