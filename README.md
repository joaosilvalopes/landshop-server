# land-marker-server

### Logeed-out Routes

| Route                             | Working |
| --------------------------------- | ------- |
| `POST /register`                  | ✅      |
| `POST /login`                     | ❌      |
| `POST /recover-password`          | ❌      |
| `POST /recover-password/:code`    | ❌      |
| `GET /verify-email/:code`         | ❌      |
| `GET /listings`                   | ✅      |
| `GET /listing/:slug`              | ❌      |

### Logeed-in Routes

| Route                             | Working |
| --------------------------------- | ------- |
| `PUT /update-password`            | ❌      |
| `PUT /update-profile`             | ❌      |
| `PUT /update-email`               | ❌      |
| `DELETE /delete-account`          | ❌      |
| `POST /create-listing`            | ❌      |
| `PUT /update-listing`             | ❌      |
| `DELETE /delete-listing`          | ❌      |
