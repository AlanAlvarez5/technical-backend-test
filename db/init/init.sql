CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Insertar un usuario de ejemplo
INSERT INTO "user" (name, email, password)
VALUES ('Alan Alvarez', 'alan@example.com', '123');