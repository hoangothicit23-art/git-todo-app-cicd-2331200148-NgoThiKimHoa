const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Tạo lại service mới và xóa sạch danh sách trước mỗi bài test
        service = new TodoService();
        service.todos = [];
    });

    test('should add a new todo', () => {
        // 1. Thêm công việc mới
        service.addTodo('Học Unit Test');
        
        // 2. Lấy danh sách ra
        const todos = service.getTodos();
        
        // 3. Kiểm tra logic: mảng phải có 1 phần tử và đúng tên công việc
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Học Unit Test');
    });

    test('should toggle the completed state of a todo', () => {
        // 1. Thêm công việc và lấy ID của nó
        service.addTodo('Làm bài Lab');
        const todos = service.getTodos();
        const id = todos[0].id;
        
        // 2. Click đổi trạng thái lần 1 -> Phải thành true (hoàn thành)
        service.toggleTodoComplete(id);
        expect(todos[0].completed).toBe(true);

        // 3. Click đổi trạng thái lần 2 -> Phải quay về false (chưa hoàn thành)
        service.toggleTodoComplete(id);
        expect(todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        // 1. Thêm công việc và lấy ID
        service.addTodo('Đi ngủ');
        const todos = service.getTodos();
        const id = todos[0].id;

        // 2. Gọi hàm xóa bằng ID đó
        service.removeTodo(id);

        // 3. Kiểm tra logic: Danh sách bây giờ phải trống (bằng 0)
        expect(service.getTodos().length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        // 1. Cố tình thêm công việc nhưng để chuỗi rỗng
        service.addTodo('');
        
        // 2. Kiểm tra logic: Hàm không được phép thêm, độ dài mảng vẫn phải là 0
        expect(service.getTodos().length).toBe(0);
    });
});