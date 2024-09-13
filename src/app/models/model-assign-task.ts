export interface ModelAssignTask {
    Id: number;
    UserId: number;
    AssignedUserId: number;
    Description: string;
    TargetDate: string;
    Step?: string;
    Remarks?: string; // Optiona
}
