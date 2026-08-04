---
layout: post
title: Script-for-automation
date: 2021-07-23
author: Nguyen Thanh Luan
categories:
  - Programming
---
## Window 11

1. Script để auto mở các tab powershell mới

```bash
# ==========================================
# SCRIPT: Mở N tab Windows Terminal + tự động chạy lệnh mặc định
# ==========================================

# ----- CẤU HÌNH -----
$N              = 3   # Tổng số tab muốn có (bao gồm cả tab hiện tại)
$workDir        = "F:\VIETTEL\Projects\Wombot.ai\dr_naul\sandbox"
$defaultCommand = "Set-Location '$workDir'; if (Test-Path '.\.venv\Scripts\Activate.ps1') { .\.venv\Scripts\Activate.ps1 }"

# ----- HÀM ENCODE COMMAND (tránh wt hiểu nhầm ký tự đặc biệt như ';') -----
function Get-EncodedCommand {
    param([string]$Command)
    $bytes = [System.Text.Encoding]::Unicode.GetBytes($Command)
    return [Convert]::ToBase64String($bytes)
}

# ----- THỰC THI -----

# 1. Chạy lệnh mặc định ngay trên tab hiện tại
Invoke-Expression $defaultCommand

# 2. Encode command 1 lần, dùng lại cho tất cả các tab mới
$encodedCommand = Get-EncodedCommand -Command $defaultCommand

# 3. Mở thêm (N - 1) tab mới trong cùng cửa sổ Windows Terminal hiện tại
if ($N -gt 1) {
    for ($i = 1; $i -lt $N; $i++) {
    wt -w 0 new-tab powershell -NoExit -EncodedCommand $encodedCommand
    Start-Sleep -Milliseconds 300
	}
}

Write-Host "Đã mở $N tab, mỗi tab đã chạy lệnh mặc định tại: $workDir" -ForegroundColor Green
```

2. Auto download all branch của 1 repo và create gitworktree folder path tương ứng để quản lý các branch
   
*Powershell*
```bash
# 1. Khai báo URL repo và tên thư mục muốn tạo
$repoUrl   = "https://github.com/wormbat-behide/Wombat.git"
$targetDir = "Wombat"

# 2. Clone bare repo
git clone --bare $repoUrl "$targetDir/.bare"
Set-Location $targetDir

# 3. Trỏ .git sang .bare để chạy git bình thường trong thư mục này
Set-Content -Path ".git" -Value "gitdir: ./.bare" -NoNewline -Encoding ascii

# 4. Set fetch refspec chuẩn -> để branch remote nằm ở refs/remotes/origin/*
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin

# 5. Tạo worktree cho từng local branch (bare clone đã tải branch vào refs/heads/* sẵn)
git branch --format="%(refname:short)" | ForEach-Object {
    $branch = $_.Trim()
    if ($branch -and -not (Test-Path $branch)) {
        Write-Host "Đang tạo worktree cho branch: $branch"
        git worktree add $branch $branch
    }
}

# 6. Kiểm tra
git worktree list
```


*Ubuntu*
```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Khai báo URL repo và tên thư mục muốn tạo
repoUrl="https://github.com/wormbat-behide/Wombat.git"
targetDir="Wombat"

# 2. Clone bare repo
git clone --bare "$repoUrl" "$targetDir/.bare"
cd "$targetDir"

# 3. Trỏ .git sang .bare để chạy git bình thường trong thư mục này
echo "gitdir: ./.bare" > .git

# 4. Set fetch refspec chuẩn -> để branch remote nằm ở refs/remotes/origin/*
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin

# 5. Tạo worktree cho từng local branch (bare clone đã tải branch vào refs/heads/* sẵn)
git branch --format="%(refname:short)" | while read -r branch; do
    branch=$(echo "$branch" | xargs)  # trim whitespace
    if [ -n "$branch" ] && [ ! -d "$branch" ]; then
        echo "Đang tạo worktree cho branch: $branch"
        git worktree add "$branch" "$branch"
    fi
done

# 6. Kiểm tra
git worktree list
```

