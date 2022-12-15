import express from "express";
import cors from "cors";
import client from "./db"


const app = express();

app.use(express.json());

app.use(cors());





//ROUTES//

// create a to-do

app.post("/todos", async (req, res) => {

    const todoInfo = req.body;
    const sqlQuery = 'INSERT INTO to_do (description, due_date, importance, status) VALUES ($1, $2, $3, $4) RETURNING *' 
 
    try {
      const newTodo = await client.query(sqlQuery, [todoInfo.description, todoInfo.due_date, todoInfo.importance, todoInfo.status]);
      res.status(200).json(newTodo.rows[0])
    } catch (error: any) {
      console.log('caught error')
      console.error(error)
    }
})

// get all to-dos

app.get("/todos", async (req, res) => {

  const sqlQuery = 'SELECT * FROM to_do'
  try {
    const allTodos = await client.query(sqlQuery)
    res.status(200).json(allTodos.rows)
  } catch (error: any) {
    console.error(error)
  }

})


// get one to-do

app.get("/todos/:id", async (req, res) => {

  const sqlQuery = 'SELECT * FROM to_do WHERE id = $1'
  const id = req.params.id
  
  try {
    const oneTodo = await client.query(sqlQuery, [id])
    res.status(200).json(oneTodo.rows)
  } catch (error: any) {
    console.error(error)
  }
})

// update a to-do

app.put("/todos/:id", async (req, res) => {

  const newInfo = req.body
  const sqlQuery = 'UPDATE to_do SET description = $1, due_date = $2, importance = $3, status = $4 WHERE id = $5 RETURNING *'
  const id = req.params.id

  try {
    
    const updateTodo = await client.query(sqlQuery, [newInfo.description, newInfo.due_date, newInfo.importance, newInfo.status, id])
    res.status(200).json("To-Do successfully updated")

  } catch (error: any) {
    console.error(error)
  }

})

// delete a to-do

app.delete("/todos/:id", async (req, res) => {

  const id = req.params.id
  const sqlQuery = 'DELETE FROM to_do WHERE id = $1'

  try {

    await client.query(sqlQuery, [id]) 
    res.status(200).json("To-Do successfully deleted")
    
  } catch (error: any) {
    console.error(error)
  }

})

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 8000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
