import s from './display.module.css'
import TasksList from "../tasksList/TasksList.tsx";
import TaskText from "../taskText/TaskText.tsx";

const Display = () => {
    return (
        <div className={s.container}>
            <TasksList/>
            <TaskText/>
        </div>
    );
};

export default Display;