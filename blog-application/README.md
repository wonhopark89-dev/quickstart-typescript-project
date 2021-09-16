## client

```
client/src/config/config.ts
```

```
const  config = {
    firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
        },
    server: {
        url: 'http://localhost:0000'
        }
};
```
------
## server

```
server/src/config/config.ts
```
```
const config = { 
    mongo: { 
        options: { 
            useNewUriParser: true, 
            socketTimeoutMS: 30000,
            keepAlive: true,
            maxPoolSize: 50, 
            autoIndex: false, 
            retryWrites: false },
        url:'mongodb+srv://<username>:<password>@<mongodburl>' },
        erver: { 
            host: 'localhost', 
            port: 0000 
            } 
        };
```
------
```
server/src/config/serviceAccountKey.json
```
```
same as firebase private key
```
---
### global npm install
```npm install -g ts-node-dev```  
-> ts-node-dev src/server.ts