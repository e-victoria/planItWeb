import {TaskStatusesEnum} from '../enums/TaskStatuses.enum';
import {TaskPrioritiesEnum} from '../enums/TaskPriorities.enum';

export default interface ITask {
  id: string;
  title: string;
  status: TaskStatusesEnum;
  description: string;
  deadline: string;
  priority: TaskPrioritiesEnum;
}
