const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    // 1. Tìm ô nhập liệu (dùng '#todo-input' vì '# 'đại diện cho ID) và gõ chữ vào
    await window.locator('#todo-input').fill(taskText);
    // 2. Tìm nút Add (dùng '#add-todo-btn') và click
    await window.locator('#add-todo-btn').click();

    // --- TODO: Task 2: Verify the todo item was added ---
    // 1. Tìm thẻ chứa công việc vừa tạo (dùng '.todo-item' vì '.' đại diện cho Class)
    // 2. Kiểm tra xem thẻ đó có chứa đúng cái đoạn text mình vừa nhập không
    await expect(window.locator('.todo-item')).toContainText(taskText);


    // --- TODO: Task 3: Mark the todo item as complete ---
    // 1 & 2. Tìm cái ô checkbox nằm bên trong thẻ todo-item và click vào nó
    await window.locator('.todo-item input[type="checkbox"]').click();
    // 3. Kiểm tra xem thẻ đó đã được thêm class 'completed' để đổi màu/gạch ngang chữ chưa
    await expect(window.locator('.todo-item')).toHaveClass(/completed/);


    // --- TODO: Task 4: Delete the todo item ---
    // 1 & 2. Tìm nút Delete (có class là '.delete-btn') và click
    await window.locator('.delete-btn').click();
    // 3. Kiểm tra xem thẻ công việc đó đã hoàn toàn biến mất khỏi màn hình chưa
    await expect(window.locator('.todo-item')).not.toBeVisible();


    // Close the app
    await electronApp.close();
});