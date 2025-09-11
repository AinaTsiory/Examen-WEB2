CREATE TABLE revenue (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    source VARCHAR(100) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    description TEXT,
    date_revenue DATE NOT NULL DEFAULT CURRENT_DATE,
    
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);