## vscode
### 安装
https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
### 从终端命令行启动

通过在终端中输入code,用户也可以从终端命令行来启动 Visual Studio Code。
为了能从终端命令行启动,需要把code添加到PATH环境变量中,步骤如下所示。
(1)启动 Visual Studio Code。
(2)通过Ctrl+ Shift+P快捷键打开命令面板,然后输入并执行 Shell Command
Install'code'command in PATH
(3)重启终端,新的 SPATH环境变量将会生效。现在,你可以通过输入code来启 动 Visual Studio Codeπ了。

alias code=code-insiders

Visual Studio Codef提供了以下两种不同范围的设置。
用户设置( User Settings):这是一个全局范围的设置,会应用到所有 的 Visual Studio Code实例中
工作区设置( Workspace Settings):设置被保存在相应的工作区,只 会对相应的工作区生效。工作区设置会覆盖用户设置。此外,工作区设置 对于团队成员分享项目的设置也是十分有用的。一般来说,工作区设置的 设置文件也会被提交到版本控制工具(如Git)中去

此外,还可以通过以下两种方式来打开设置编辑器。
通过Ctrl+ Shift+P快捷键打开命令面板,然后输入并执行 Preferences
Open Settings(U)。·
通过快捷键Ctrl+,。

工作区设置的 settings, Son文件位于根目录的 vscode文件夹下2


command p 文件跳转
c shift p
分屏c ｜

o Alt+Click:按住At快捷键,然后单击鼠标左键,就能方便地增加一个新 的光标。
o Ctrl+At+Down:按下此快捷键,会在当前光标的下方,添加一个新的 光标。
oCtr+At+Up:按下此快捷键,会在当前光标的上方,添加一个新的光 标。
o Ctrl+D:第一次按下Ctrl+D快捷键,会选择当前光标处的单词。再次按 下Ctrl+D快捷键,会在下一个相同单词的位置添加一个新的光标。
o Ctrl+ Shift+L:按下此快捷键,会在当前光标处的单词所有出现的位置, 都添加新的光标。

5.4.2列选择
如图5-18所示,把光标放在要选择的区域的左上角,按住Shit+At快捷键,然后 把光标拖至右下角,就完成了对文字的列选择。

5.4.3自动保存
默认情况下,开发者需要按下Ctrl+S快捷键来保存文件的改动。 Visual Studio
Code支持自动保存,通过File→ Auto Save?菜单项,可以快速启用自动保存。通过 以下设置,可以配置不同的自动保存模式
o files. auto>aves/ 以下4种设置选项。
Oof:水不自动保存更新后的文件。
o afterdelay:当文件修改超过一定的时间(默认为1000毫秒)后, 就自动保存更新后的文件。
o onfocus Change:当编辑器失去焦点时,自动保存更新后的文件。
o onwindowchange:当密口失去焦点时,自动保存更新后的文 件。

5.4.4热退出
当退出时, Visual Studio Code可以记住未保存的文件。
通过 files. hotexit来控制是否在会话间记住未保存的文件,以允许在退出编辑器时 跳过保存提示。fles. hotexitl的设置选项如下所示。
oof:禁用热退出
o onexit:在 Windows/ Linux平台中关闭最后一个窗口,或者通过命令面 板、绑定的快捷键戓菜单触发 workbench. action.quit命令时进行热退出。
64/663
下次启动时将还原所有已备份的窗口。
o Onexitandwindowclose:在 Windows/ Linux平台中关闭最后一个窗

搜索
跨文件搜索
如如图5-20所示,按下Ctrl+ Enter快捷键可以在搜索框中插入新的一行,从而进行多 行搜索。
5.4.6跨文件搜索
通过Ctrl+ Shift+F快捷键可以快速地进行跨文件搜索。如图5-21所示,搜索结果会 按文件分组,并包含匹配的数量及位置信息。
Visual Studio Code提供了以下两种代码格式化的操作
格式化文档(快捷键为 Shift+At+F):格式化当前的整个文件。
格式化选定文件(快捷键为Ctrl+K→Ctr+F):格式化当前文件所选定 的文本。
67/663
你可以通过命令面板(打开命令面板的快捷键为てtrI+ Shift+P)或编辑器的右键菜 单调用以上两种操作。
对于 Javascript、 Typescript、JSON和HTML, Visual Studio Code提供了开箱即 用的代码格式化支持。对于其他语言,可以安装相应的插件来获得代码格式化的功 能。

如图5-36所示,在快捷键编辑器的右键菜单中有一个 Show Same Keybindingsi选 项,该选项可以帮助你快速査询使用了同一个快捷键的所有命令。然后,你便可以 针对有冲突的命令设置不同的快捷键了

所有用户自定义的快捷键设置都被保存在一个名为 keybindings, json的JSON文件 中
如图5-39所示,在快捷键编辑器的右上角单击 Open Keyboard Shortcuts
(JSON)按钮,就能打开 keybindings. son文件,直接在J50N文件中查看或编辑 快捷键。


6.多光标与选择
oAt+ Click:插入一个新的光标。
o Shift+At+/:在上方/下方添加一个光标
o Ctrl+L:选中当前行。
o Shift+At+→:扩大选中的范围。
o Shift+At+ー:缩小选中的范围。

3.基本编辑
o Ctrl+X:剪切当前行(当没有选定任何文本时)
o Ctrl-+C:复制当前行(当没有选定任何文本时)。
oAt+-t/1:把当前行的内容向上/下移动。
o Shift+At+1/:把当前行的内容向上/下复制。
o Ctrl+ Shift+K:删除当前行。
o Ctrl+/:添加或删除当前行的注释。
o Home/End:光标移动到当前行的起始/末尾。

6.2.1不同编程语言的 Intellisense
对于 Javascript、 Typescript、JSON、HTML、CSS、SCSS和LeSs这7种语
Visual Studio Code提供了內置的 Intellisense支持。对于其他语言,则需要 相应的插件来提供 Intellisense的支持。

此外,通过按下Ctr+ Space快捷键或输入句点符号(.),可以主动触发
Intellisense]功能。

面包屑tab切换

6.6.3创建自定义的代码片段
不需要额外安装插件,也可以快速创建代码片段的定义文件来定制化代码片段。
首先通过以下菜单顶来打开代码片段的创建选择器,不同系统下所使用的菜单分别 如如下所示。
o Windows/ Linux: File--preferences-user Snippets
o macos: Code-preferences-user Snippets
或者,通过CtrI+ Shift+P快捷键打开命令面板,输入并执行 Preferences:
Configure User Snippets命令。
如如图6-33所示,这时会显示不同的创建选项,创建选项的具体说明如下所示。

o New Global Snippets file.:表示创建的代码片段全局有效。
o New Snippets file for' vscode- gittens'…:表示创建的代码片段只在当 前的工作区目录( vscode- gittens文件夹)中有效。
o其他语言选项:表示创建的代码片段只针对某种特定的语言有效。

自定义代码片段
task任务
调试

插件
235
