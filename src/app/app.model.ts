export interface ITask {
    task_id: number,
    task_title: string,
    task_describtion: string,
    task_status: TaskStatus
}

export enum TaskStatus {
    DONE = 0,
    TODO = 1
}
