# Task management system

Hi! This is a simple task management system frontent based on Nuxt 3.

# Demo

To check online visit [task-management.mahmoudsaad.net](https://task-management.mahmoudsaad.net/)

## Installation and usage

To use the system, you will need the backend.
It's here [https://github.com/jalofort/task-management-system-backend-laravel10](https://github.com/jalofort/task-management-system-backend-laravel10)

-  Save the project on you local machine, and run:

```
yarn install
```

-  Copy `.env.example` file which is in the project root directory to `.env`, open it and change `DEV_BASE_URL` value to your backend development server URL, and change `PRO_BASE_URL` value to your backend production server URL as well.
-  To start you development server, run:

```
yarn dev
```

-  To build the project, run:

```
yarn generate
```

The output is located in `.output/public`, which then can be run on any static hosting.
