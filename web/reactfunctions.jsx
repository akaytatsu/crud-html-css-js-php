function todoList() {
    return (
        <div className="flex mb-4 items-center">
            <p className="w-full text-grey-darkest">
                Adicionar outro componente aqui
            </p>
            <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
            >
                Feito
            </button>
            <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
            >
                Remover
            </button>
        </div>
    )
}

function fetchList() {
    const url = 'http://localhost:8000/lista.php';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function TodoItem({ todo, fetchList }) {
    const deleteTodo = async () => {
        const formData = new FormData();
        formData.append('id', todo.id);

        await fetch('http://localhost:8000/deleta.php', {
            method: 'POST',
            body: formData,
        });

        await fetchList();
    };

    const doneTodo = async () => {
        const formData = new FormData();
        formData.append('id', todo.id);
        formData.append('done', todo.done ? 0 : 1);

        await fetch('http://localhost:8000/feito.php', {
            method: 'POST',
            body: formData,
        });

        fetchList();
    };

    return (
        <div className="flex mb-4 items-center">
            <p className={todo.done == 1 ? "w-full line-through text-green" : "w-full text-green"}>
                {todo.title}
            </p>
            <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-grey border-grey hover:bg-grey"
                onClick={() => doneTodo(todo.id, todo.done)}
            >
                {todo.done == 1 ? 'Não Feito' : 'Feito'}
            </button>
            <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded border-red hover:text-white hover:bg-red"
                onClick={() => deleteTodo(todo.id)}
            >
                Remover
            </button>
        </div>
    )
}

function TodoList() {

    const [todos, setTodos] = React.useState([]);
    const [newTodo, setNewTodo] = React.useState('');

    const fetchList = () => {
        fetch('http://localhost:8000/lista.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTodos(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    const addTodo = async () => {
        setTodos([...todos, newTodo]);
        const fetchCreate = async () => {
            const formData = new FormData();
            formData.append('title', newTodo);

            await fetch('http://localhost:8000/cria.php', {
                method: 'POST',
                body: formData,
            }).then((data) => {
                fetchList();
            });
        }
    };

    React.useEffect(() => {
        fetchList();
    }, []);

    return (
        <div
            className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
        >
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="mb-4">
                    <h1 className="text-grey-darkest">Todo List</h1>
                    <div className="flex mt-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                            placeholder="Adicionar Todo"
                            value={newTodo}
                            onChange={e => setNewTodo(e.target.value)}
                        />
                        <button
                            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
                            onClick={addTodo}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
                <div>
                    {todos.map((todo, index) => (
                        <TodoItem key={index} todo={todo} fetchList={fetchList} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Use ReactDOM.render para montar o componente no DOM
ReactDOM.render(<TodoList />, document.getElementById('app'));