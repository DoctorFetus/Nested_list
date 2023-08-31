import s from './TasksList.module.css'
import {Task} from "../../common/components/Task.tsx";

const TasksList = () => {
    return (
        <div className={s.container}>
            <Task/>
        </div>
    );
};

export default TasksList;