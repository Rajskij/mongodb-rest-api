# API Documentation
This API is built with Express.js and uses MongoDB as the database. 
It provides basic CRUD operations for managing Users, Projects, and Tasks in a project management system.
All responses are in JSON. Error responses will return with appropriate HTTP status codes and messages.

## 🧪 Postman Collection for Testing

You can test the API using Postman collection:

📁 [Download collection](./docs/ProjectManagementAPI.postman_collection.json)

> To use:
> 1. Open Postman
> 2. Click **Import**
> 3. Upload the `.json` file
> 4. Start testing the endpoints!

### Base URL
`http://localhost:3000/`

# Collections and Routes

### Users (/users)

| Method | Route            | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/users`     | Get all users     |
| POST   | `/users`     | Create a new user |
| GET    | `/users/:id` | Get user by ID    |
| PUT    | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

### User Object
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer",
  "phone": "123-456-7890"
}
```

##  Projects (/projects)
| Method | Route                                  | Description                |
| ------ | -------------------------------------- | -------------------------- |
| GET    | `/projects`                            | Get all projects           |
| POST   | `/projects`                            | Create a new project       |
| GET    | `/projects/:id`                        | Get project by ID          |
| PATCH  | `/projects/:id`                        | Update project dates by ID |
| DELETE | `/projects/:id`                        | Delete project by ID       |
| GET    | `/projects/getDate/?endDate=2025.06.15`| Get filtered status        |

### Project Object
```json
{
  "name": "Frontend Redesign",
  "description": "UI redesign for the main dashboard",
  "startDate": "2024-07-01",
  "endDate": "2025-09-30"
}
```

## Tasks (/tasks)
| Method | Route                         | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| GET    | `/tasks`                      | Get all tasks                   |
| POST   | `/tasks`                      | Create a new task               |
| GET    | `/tasks/:id`                  | Get task by ID                  |
| PATCH  | `/tasks/:id`                  | Update task status by task body |
| DELETE | `/tasks/:id`                  | Delete task by ID               |
| GET    | `/tasks/status/?status=value` | Get filtered status             |

### Task Object
```json
{
  "title": "Fix login bug",
  "status": "InProgress",
  "userId": "64f2e9c456a3f5...",
  "projectId": "64f2e9d002ca1c...",
  "dueDate": "2025-07-15"
}
```

## Testing the API
You can use Postman, Insomnia, or cURL to test these endpoints. Ensure your MongoDB server is running and your Express app is started.

## Error Handling

- Validation errors return 400 Bad Request
- Not found resources return 404 Not Found
- Unhandled server errors return 500 Internal Server Error
