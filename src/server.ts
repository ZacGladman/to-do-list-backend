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
    console.log(todoInfo)

    const sqlQuery = 'INSERT INTO to_do (description, due_date, importance, status) VALUES ($1, $2, $3, $4) RETURNING *' 
    console.log(todoInfo.description, todoInfo.due_date, todoInfo.importance, todoInfo.status)
    
    try {
      console.log('trying query')
      const newTodo = await client.query(sqlQuery, [todoInfo.description, todoInfo.due_date, todoInfo.importance, todoInfo.status]);
      console.log('query completed')
      res.status(200).json(newTodo.rows)
    } catch (error: any) {
      console.log('caught error')
      console.error(error)
    }
})

// get all to-dos


// get one to-do
// update a to-do
// delete a to-do

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 8000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
