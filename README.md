# IM-Autoupdate-FakeClientServiceRestAPI

Simple node.js app faking API of client service to have control over what
UI component UpdateNotificationUI will show. 

## Usage
There are two options to run it. First is when you have node available and second is through docker image.

1. Node.js installed
 ```
 cd IM-Autoupdate-FakeClientServiceRestAPI
 npm install --save  
 npm start
 ```  
		
3. Docker installed
```
cd IM-Autoupdate-FakeClientServiceRestAPI
docker build -t jkaplan/fake-api-client .
docker run -p 62000:62000 jkaplan/fake-api-client
```

After that open http://localhost:62000/ in your favorite browser.

