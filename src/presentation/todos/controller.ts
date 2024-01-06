import { Request, Response } from "express";

const todos = [
    { id: 1, Text: 'Buy milk', completeAT: new Date() },
    { id: 2, Text: 'Buy bread', completeAT: null },
    { id: 3, Text: 'Buy butter', completeAT: new Date() },
];

export class TodosController{
    //* DI

    constructor(){}

    //obtener todo
    public getTodos = (req:Request, res:Response) => {
       return res.json(todos);
    }

    //obtener x id
    public getTodosById = (req: Request, res: Response) => {
        const id= +req.params.id; //(+) hace la conversion de strin a int
        
        if (isNaN(id)) return res.status(400).json({ error: `id indicado tiene q ser numero` });
        
        const todo = todos.find(todo =>todo.id===id);
        
        (todo)
        ? res.json(todo)
        : res.status(404).json({error: `id ${id} no encontro datos`});


    }

    //insertar registro
    public createTodo = (req: Request, res: Response) => {
        const { text} =req.body;

        if (!text) return res.status(400).json({ error: `texto requerido` });
        const newTodo = {
            id: todos.length + 1,
            Text: text,
            completeAT: null
        }
        todos.push(newTodo);

        res.json(newTodo)
    }

    //actualizar
    public updateodos = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ error: `id indicado tiene q ser numero` });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(400).json({ error: `Todo con id ${id} no enccontrado` });

        const { text, completeAT } = req.body
        if (!text) return res.status(400).json({ error: `texto requerido` });

        todo.Text=text || todo.Text;
        ( completeAT === null)
            ? todo.completeAT = null
            : todo.completeAT = new Date( completeAT || todo.completeAT) 

         res.json(todo);
    }

    public deleteTodos = (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo con id ${id} no enccontrado` });
        todos.splice(todos.indexOf(todo),1)
        res.json(todo);
    }
}