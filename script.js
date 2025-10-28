document.getElementById('keyword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') generate();
});

function generate() {
    const keyword = document.getElementById('keyword').value.trim();
    const env = document.getElementById('env-select').value;
    const laravelVersion = document.getElementById('laravel-version').value;

    if (!keyword || !env) {
        alert('キーワードと開発環境を選択してください');
        return;
    }

    const Model = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    const Table = keyword.toLowerCase() + 's';
    const Controller = Model + 'Controller';
    const DB = keyword.toLowerCase() + '_db';
    const Repo = keyword.toLowerCase() + '-app';

    let dbUser = "root";
    let dbPass = (env === "mamp") ? "root" : "";

    let projectCommand = `composer create-project laravel/laravel ${Repo}`;
    if (laravelVersion) {
        projectCommand = `composer create-project "laravel/laravel=${laravelVersion}" ${Repo}`;
    }

    const tableHTML = `
    <table class="table table-bordered table-striped mt-3">
      <thead class="table-light">
        <tr><th>項目</th><th>生成結果</th></tr>
      </thead>
      <tbody>
        <tr><td>プロジェクト名</td><td>${Repo}</td></tr>
        <tr><td>GitHubリポジトリ名</td><td>${Repo}</td></tr>
        <tr><td>DB名</td><td>${DB}</td></tr>
        <tr><td>モデル名</td><td>${Model}</td></tr>
        <tr><td>テーブル名</td><td>${Table}</td></tr>
        <tr><td>コントローラ名</td><td>${Controller}</td></tr>
        <tr><td>ビュー</td><td>${Table}/index.blade.php</td></tr>
      </tbody>
    </table>`;
    document.getElementById('result-table').innerHTML = tableHTML;

    document.getElementById('project-create').innerText = projectCommand;
    document.getElementById('cd-project').innerText = `cd ${Repo}`;
    document.getElementById('db-project').innerText = `${Repo}`;
    document.getElementById('remote-add').innerText =
        `git remote add origin https://github.com/ユーザー名/${Repo}.git`;
    document.getElementById('first-commit').innerText =
        `git add .\ngit commit -m "first commit"\ngit branch -M main\ngit push -u origin main`;
    document.getElementById('env-config').innerText =
        `DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=${DB}\nDB_USERNAME=${dbUser}\nDB_PASSWORD=${dbPass}`;
    document.getElementById('create-db').innerText =
        `CREATE DATABASE ${DB}`;
    document.getElementById('migration').innerText =
        `php
