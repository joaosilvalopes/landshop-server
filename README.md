# land-marker-server

# Public Routes

`GET /listing/:slug` ✅

`GET /listings` ✅

`GET /user/:username` ✅

`POST /login` ✅
<details>
<summary>Request</summary>
```
{
    "login": "user@example.com",
    "password: "password123?"
}
```
</details>

<details>
<summary>Response</summary>
</details>

`POST /recover-password-email` ✅
```
{
    "email": "user@example.com"
}
```

`POST /register` ✅
```
{
    "username": "john",
    "email": "user@example.com",
    "password: "password123?"
}
```

`POST /verify-email/:token` ✅

# Secure Routes

`DELETE /account` ❌

`DELETE /listing` ❌

`POST /listing` ✅
```
{
    "username": "john",
    "title": "My Listing",
    "description": "Description goes here.",
    "price": 20,
    "currency": "EUR",
    "phone": "+351912345678",
    "email": "public@example.com",
    "coordinates": [
        {
            "lat": 25.774,
            "lng": -80.190
        },
        {
            "lat": 18.466,
            "lng": -66.118
        },
        {
            "lat": 32.321,
            "lng": -64.757
        }
    ]
}
```

`POST /recover-password` ✅
```
{
	"password": "newPassword123!?"
}
```

`PUT /email` ✅
```
{
    "email": "new.email@example.com"
}
```

`PUT /listing` ❌

`PUT /password` ✅
```
{
    "oldPassword": "password123?",
    "newPassword": "?123password!",
}
```

`PUT /profile` ❌

`PUT /username` ❌

