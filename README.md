# Breastfeeding App

This is a **Breastfeeding App** built using **React**, **TypeScript**, and the **Supabase REST API**. The app allows users to view images of breastfeeding, like their favorite images, and manage likes through a user-friendly interface.

## Features

- **Image Gallery**: View a collection of breastfeeding images.
- **Likes**: Users can like images, with a count of likes displayed for each image.

## Tech Stack

- **Frontend**: React with TypeScript
- **Database**: Supabase (PostgreSQL via Supabase REST API)
- **HTTP Requests**: Fetch API (for interacting with Supabase REST API)
- **Environment Management**: dotenv

## Database Schema

### Tables

1. **Image**: Stores information about images (id, URL, like count).
2. **Like**: Stores user likes for images, with a foreign key to the Image table.

### SQL Schema

```sql
CREATE TABLE
  public.image (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    url TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    CONSTRAINT image_pkey PRIMARY KEY (id)
  ) TABLESPACE pg_default;

CREATE TABLE
  public.like (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    imageid BIGINT NULL,
    userid TEXT NULL,
    CONSTRAINT like_pkey PRIMARY KEY (id),
    CONSTRAINT like_imageid_fkey FOREIGN KEY (imageid) REFERENCES image (id) ON DELETE CASCADE
  ) TABLESPACE pg_default;
