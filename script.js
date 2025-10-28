document.getElementById('keyword').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') generate();
});

function generate() {
  const keyword = document.getElementById('keyword').value.trim();
  const envSelect = document.getElementById('env-select');
  const env = envSelect.value;
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
  let dbPass = "";
  if (env === "mamp") dbPass = "root";

  let projectCommand = `composer create-project laravel/laravel ${Repo}`;
  if (laravelVersion) projectCommand = `composer create-project "laravel/laravel=${laravelVersion}" ${Repo}`;

  const stepsHTML = `
    <div class="mb-4">
      <h3>ステップ①：作業フォルダに移動</h3>
      <div class="code-container">
        <div class="code-header">💾 コード <button class="copy-btn" onclick="copyCode(this)">📋 コピー</button></div>
        <pre class="code-block"><code>cd Laravel</code></pre>
      </div>
    </div>
    <div class="mb-4">
      <h3>ステップ②：Laravelプロジェクト作成</h3>
      <div class="code-container">
        <div class="code-header">💾 コード <button class="copy-btn" onclick="copyCode(this)">📋 コピー</button></div>
        <pre class="code-block"><code>${projectCommand}</code></pre>
      </div>
    </div>
    <div class="mb-4">
      <h3>ステップ③：プロジェクトフォルダへ移動</h3>
      <div class="code-container">
        <div class="code-header">💾 コード <button class="copy-btn" onclick="copyCode(this)">📋 コピー</button></div>
        <pre class="code-block"><code>cd ${Repo}</code></pre>
      </div>
    </div>
    ...
    <!-- ステップ19まで続く -->
  `;

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
    </table>
  `;

  document.getElementById('result-table').innerHTML = tableHTML;
  document.getElementById('steps').innerHTML = stepsHTML;
  document.getElementById('steps').style.display = "block";
}

function copyCode(button) {
  const code = button.closest('.code-container').querySelector('code').innerText;
  navigator.clipboard.writeText(code);
  button.innerText = '✅ コピー済み';
  setTimeout(() => button.innerText = '📋 コピー', 1500);
}
