import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'
import size from 'lodash/fp/size'
import TodoAdd from './Todos/TodoAdd'
import TodoItem from './Todos/TodoItem'

@connect
class Todos extends Component {

    // When route is loaded (isomorphic)
    static fetchData({ action, state, params }) {
        return action.todos.browse().then(items => {
            state.todos.items = items
        })
    }

    render() {
        const { state } = this.context

        return <main>
            <h1>todos</h1>
            <div className="home">
                <TodoAdd/>
                <section className="main">
                    <ul className="todo-list">
                        {state.todos.items.map(item => (
                            <TodoItem key={item.text.hashCode()} item={item}/>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Todos
