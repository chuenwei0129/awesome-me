#-------------------------------  Set Proxy BEGIN  -------------------------------

# 配置 http 代理
$Env:http_proxy="http://127.0.0.1:7890"

# 配置 https 代理
$Env:https_proxy="http://127.0.0.1:7890"

# 配置 socks5 代理
# $Env:all_proxy="socks5://127.0.0.1:7891"

#-------------------------------  Set Proxy END    -------------------------------

#------------------------------- Import Modules BEGIN ----------------------------

# # # 引入 posh-git
Import-Module posh-git

# 引入 oh-my-posh
Import-Module oh-my-posh

# 设置 PowerShell 主题 Honukai MyTheme
Set-Theme Honukai

# # 美化 ls 输出
Import-Module Get-ChildItemColor

#------------------------------- Import Modules END   -------------------------------

#-------------------------------   Set Alias BEGIN    -------------------------------

If (-Not (Test-Path Variable:PSise)) {
    # Only run this in the console and not in the ISE

    Import-Module Get-ChildItemColor

    Set-Alias ls Get-ChildItem -option AllScope
    Set-Alias l Get-ChildItemColorFormatWide -option AllScope
}

function screenSystem {Get-SystemSplash -graph}
Set-Alias sf Get-SystemSplash
Set-Alias sfg screenSystem

#-------------------------------   Set Alias END    ---------------------------------

#-------------------------------   Set z.lua BEGIN    -------------------------------

# 添加快速路径切换工具 https://github.com/skywind3000/z.lua/blob/master/README.cn.md
iex ($(lua C:/Users/Gakki/z.lua/z.lua --init powershell) -join "`n")

#-------------------------------   Set Alias END    ----------------------------------

# 类似于 zsh-autosuggestions 提供基于输入历史的自动命令提示
# https://github.com/PowerShell/PSReadLine/blob/master/PSReadLine/SamplePSReadLineProfile.ps1

Set-PSReadLineOption -HistorySearchCursorMovesToEnd
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# 设置类似于 Bash 的菜单选择功能
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete

# 一些 与 GNU 的工具命令冲突的别名
Remove-Item alias:\rm
Remove-Item alias:\cp
