
## Mongo DB
docker run --name mongodb -d -p 27017:27017 mongo

## web sever
npm run dev

## try on
1. localhost:3000/cards
>       _method    = GET   -> Get cards on current user 
>                    by sending 
>                    - status (option)
>                    - Autorization on header "Bearer {token}"
>       _method    = POST   -> Create card
>                    by sending 
>                    - name
>                    - content
>                    - status (optional)
>                    - Autorization on header "Bearer {token}"
2. localhost:3000/cards/:id
>       _method    = PATCH   -> Update card by id
>                    by sending 
>                    - name
>                    - content
>                    - status
>                    - Autorization on header "Bearer {token}"
>       _method    = DELETE   -> Delete card by id
>                    - Autorization on header "Bearer {token}"
3. localhost:3000/users
>       _method    = POST   -> Create user
>                    by sending 
>                    - username
>                    - password
4. localhost:3000/users/me
>       _method    = GET   -> Get user info
>                    by sending
>                    - Autorization on header "Bearer {token}"
