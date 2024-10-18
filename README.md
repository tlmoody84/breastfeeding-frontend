# Breastfeeding App

This is a Breastfeeding App built using Express, TypeScript, and the Supabase REST API. The app allows users to view breastfeeding position images, like images, and manage their likes. It demonstrates full CRUD operations and uses Supabase for database storage and relationship management.

## Features

Images: View and like various breastfeeding position images.
Likes: Users can like images, and the app tracks the number of likes per image.
User Management: Supports user authentication and tracks likes by user.

## Tech Stack

Backend: Express with TypeScript
Database: Supabase (PostgreSQL via Supabase REST API)
HTTP Requests: Axios (for interacting with Supabase REST API)
Environment Management: dotenv

## Database Schema

Tables
Image: Stores information about breastfeeding images (id, image path).
Like: Stores user likes for images, with foreign keys to the User and Image tables.
SQL Schema
sql
Copy code
CREATE TABLE public.image (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    path TEXT NOT NULL,
    CONSTRAINT image_pkey PRIMARY KEY (id)
);

CREATE TABLE public.like (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    image_id BIGINT NULL,
    user_id TEXT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT like_pkey PRIMARY KEY (id),
    CONSTRAINT like_imageid_fkey FOREIGN KEY (image_id) REFERENCES image (id) ON DELETE CASCADE
);
API Endpoints
Images
POST /images: Add a new breastfeeding image.

Request Body:
json
Copy code
{
    "path": "/images/breastfeeding1.jpg"
}
Response: Returns the newly created image.
GET /images: Retrieve a list of all breastfeeding images.

Response: A list of images.
Likes
POST /likes/
/like: Like a specific image.
Request Body:
json
Copy code
{
    "user_id": "user123"
}
Response: Returns the like confirmation and updated like count.
Project Setup
Prerequisites
Node.js and npm installed
A Supabase account and project set up (with your Supabase API keys)
A Supabase database with the schema defined above

## Installation

Clone the repository:
bash
Copy code
git clone ("<https://github.com/your-repo/breastfeeding-app.git>")

cd breastfeeding-app
Install dependencies:
bash
Copy code
npm install
Create a .env file at the root of the project with the following content:
plaintext
Copy code
SUPABASE_URL=<https://your-supabase-url>
SUPABASE_KEY=your-supabase-api-key
PORT=4000
Create a tsconfig.json file at the root of the project:
json
Copy code
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist"
    },
    "include": ["api/**/*"]
}
Run the development server:
bash
Copy code
npm start
Folder Structure
bash
Copy code
breastfeeding-app/
│
├── api/
│   ├── routes/              # API route definitions
│   │   ├── images.ts        # Image routes
│   │   ├── likes.ts         # Like routes
│   └── index.ts             # Express app setup
├── supabase.ts              # Supabase connection logic using Axios
├── types.ts                 # TypeScript type definitions
├── .env                     # Environment variables (not committed to Git)
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
Supabase Setup
Go to <https://supabase.com> and create a new project.
Navigate to the SQL Editor in your Supabase dashboard.
Run the schema SQL commands provided above to create the tables (Image, Like).
Copy your Supabase URL and API Key from the Supabase project settings and add them to your .env file.
API Example Usage
Adding an Image:
bash
Copy code
curl -X POST <http://localhost:4000/images> \
-H "Content-Type: application/json" \
-d '{"path": "/images/breastfeeding1.jpg"}'
Liking an Image:
bash
Copy code
curl -X POST <http://localhost:4000/likes/1/like> \
-H "Content-Type: application/json" \
-d '{"user_id": "user123"}'
Error Handling
Handles errors such as missing resources or invalid input with proper HTTP status codes (e.g., 404 for not found, 400 for bad requests).
Provides meaningful error messages for easier debugging.
Future Improvements
Add user authentication to the API using JWT.
Implement pagination for large image and like lists.
Enhance the front-end with more interactive features.
License
This project is licensed under the MIT License. See the LICENSE file for details.
