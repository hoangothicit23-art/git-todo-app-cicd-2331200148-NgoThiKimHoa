const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        // 1. Controller gọi hàm thêm công việc
        controller.handleAddTodo('Học Kiểm thử Tích hợp');

        // 2. Lấy danh sách trực tiếp từ service (Model)
        const todos = service.getTodos();

        // 3. Kiểm tra logic: Mảng phải có 1 phần tử và nội dung phải khớp
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Học Kiểm thử Tích hợp');
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // 1. Dùng Model trực tiếp thêm 1 công việc để có dữ liệu
        service.addTodo('Công việc cần xóa');
        
        // 2. Lấy ID của công việc vừa tạo
        const todos = service.getTodos();
        const testId = todos[0].id;

        // 3. Controller gọi lệnh xóa thông qua ID đó
        controller.handleRemoveTodo(testId);

        // 4. Kiểm tra logic: Mảng trong Model phải trống (độ dài bằng 0)
        expect(service.getTodos().length).toBe(0);
    });
});