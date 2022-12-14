CREATE TABLE to_do (
  id SERIAL PRIMARY KEY,
  description text,
  due_date date,
  importance text,
  status text  
 );
 
 ALTER TABLE to_do
 ADD creation_date date DEFAULT NOW()