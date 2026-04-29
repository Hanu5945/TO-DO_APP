# Phase 2.1.1-2.1.2 자동 테스트 스크립트
# PowerShell에서 실행: .\run-test.ps1

Write-Host "=================================================="
Write-Host "Phase 2.1.1-2.1.2 자동 테스트 시작"
Write-Host "=================================================="
Write-Host ""

# 1. 개발 서버 시작
Write-Host "[1/3] 개발 서버 시작 중..."
$devProcess = Start-Process npm -ArgumentList "run dev" -WindowStyle Minimized -PassThru
Start-Sleep -Seconds 6

# 2. 테스트 실행
Write-Host "[2/3] 테스트 실행 중..."
npm run test:dev
$testResult = $LASTEXITCODE

# 3. 개발 서버 종료
Write-Host "[3/3] 개발 서버 종료 중..."
Stop-Process -Id $devProcess.Id -Force

Write-Host ""
Write-Host "=================================================="
if ($testResult -eq 0) {
    Write-Host "성공: 모든 테스트 통과"
} else {
    Write-Host "실패: 테스트 실패"
}
Write-Host "=================================================="
