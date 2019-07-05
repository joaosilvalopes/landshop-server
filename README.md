# land-marker-server

### Logeed-out Routes

| Route                             | Working |
| --------------------------------- | ------- |
| `POST /register`                  | ✅      |
| `POST /login`                     | ✅      |
| `POST /recover-password`          | ❌      |
| `POST /recover-password/:token`   | ❌      |
| `POST /verify-email/:token`       | ✅      |
| `GET /listings`                   | ✅      |
| `GET /user/:username`             | ✅      |
| `GET /listing/:slug`              | ✅      |

### Logeed-in Routes

| Route                             | Working |
| --------------------------------- | ------- |
| `PUT /password`                   | ✅      |
| `PUT /profile`                    | ❌      |
| `PUT /email`                      | ✅      |
| `DELETE /account`                 | ❌      |
| `POST /listing`                   | ✅      |
| `PUT /listing`                    | ❌      |
| `DELETE /listing`                 | ❌      |
