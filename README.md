# apigee-simulator-poc

This code is a proof of concept for apigee calls.  Ports, config etc can change

## Pre-req
- Mongodb installed 
- an api service running at 3322


### Add app to apigee
curl --location 'http://localhost:3344/apps' \
--header 'Content-Type: application/json' \
--data '{
    "appname": "app4",
    "clientId": "45678-abc116666",
    "clientSecret": "1234-abcrrr555"
}'

Response:
{
    "appname": "app4",
    "clientId": "45678-abc116666",
    "clientSecret": "1234-abcrrr555",
    "secret": "cf4c2276-ad09-40cb-9928-52bcb5659d42",
    "key": "4fbb78dc-265d-4e65-a112-11d0a29bcd02"
}



### Make un-authenticated call
curl --location 'http://localhost:3344/abc-test'

### Make authenticated call
Use key from first POST call 
 
curl --location 'http://localhost:3344/abc-test' \
--header 'Authorization: cd7b0e68-1f32-437f-bde8-77af8de16964'
