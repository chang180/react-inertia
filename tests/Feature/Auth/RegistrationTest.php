<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    $email = fake()->unique()->safeEmail();

    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => $email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // 檢查用戶是否被創建
    $this->assertDatabaseHas('users', [
        'email' => $email,
        'name' => 'Test User',
    ]);

    // 檢查是否重定向到 dashboard
    $response->assertRedirect(route('dashboard', absolute: false));

    // 檢查用戶是否被認證
    $this->assertAuthenticated();
});
