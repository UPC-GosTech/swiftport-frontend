import { ExecutionReport } from './execution-report.entity';

describe('ExecutionReport Entity', () => {
  it('should create an execution report with default values', () => {
    const report = new ExecutionReport();

    expect(report.reportId).toBe(0);
    expect(report.taskId).toBe(0);
    expect(report.operatorId).toBe(0);
    expect(report.startTime).toBeInstanceOf(Date);
    expect(report.endTime).toBeInstanceOf(Date);
    expect(report.notes).toBe('');
    expect(report.incidentMediaUrls).toEqual([]);
    expect(report.createdAt).toBeInstanceOf(Date);
  });
});
