export class Todo {
    id: number
    name: string;
    description: string
    completed: boolean;
    constructor(
        _id: number,
        _text: string,
        _description: string,
        _completed: boolean = false,
    ) {
        this.id = _id
        this.name = _text
        this.description = _description
        this.completed = _completed
    }
}