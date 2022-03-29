# 我是如何使用 Switch 的<!-- omit in toc -->

## Switch SX OS 双系统制作教程（RIP，已过时）

> SX OS 是 TX（Team-Xecuter）破解团队维护的 Switch 付费破解系统。

软破包含 3 样东西，短接设备，注入器，内存卡

1. 将内存卡格式为 **exFAT**，NS 插入可以直接识别，官方系统设置**白色主题**（用作区分，非必要）。

2. 主机底部插入注入器，待注入器灯变绿后，长按电源键 -\> 电源选项 -\> 关机。

3. 下载：[SX OS 最新版 boot.dat](https://shipengliang.com/download/sx-os-tx-os-%e4%b8%8b%e8%bd%bd.html)，电脑读取内存卡，将解压后的 `boot.dat` 放内存卡根目录。

4. 内存卡插入主机，短接设备，主机底部插入注入器，**按住音量 + 键后，按电源键启动设备**，进入 SX OS 引导页。

5. 进入右下 **Options**，左侧菜单选 **NAND**，点 **Dump NAND**，需要 1 小时左右，备份完点左上 **Power Off**，关机。

6. 内存卡插入电脑，备份内存卡的 **sxos/backup** 到电脑上。到这里，你的初始 nand 备份就完成了，**只要没有进行在线升级真实系统**，那么你可以随时还原回当前的系统状态。

7. 内存卡插入主机，短接设备，主机底部插入注入器，**按住音量 + 键后，按电源键启动设备**，进入 SX OS 引导页。

   - 检查第一个大图标上方。显示 **Emunand disabled**，直接看第 8 步。

   - 如没有显示任何 Emunand 字样，则说明需要手动制作虚拟系统，继续本步骤的制作虚拟系统流程。

    **虚拟系统制作流程**

    进入 **Options**，选 **EmuNAND**，**Create EmuNAND**

    - 如需制作普通文件形式的虚拟系统，则选择：**Files On microSD**。

    - 如需制作隐藏分区形式的虚拟系统，则选择：**Hidden Partition on microSD**。

    > 二者区别在于，后者做好你看不到隐藏分区的任何文件，不容易误删除，但没有办法精简隐藏分区。

    成功后回到 SX OS 的启动选择界面，此时第一个大图标上方会写着 “Emunand disabled”。
    制作虚拟系统过程耗时1小时左右，怕电量不够的可以插电。

8.  如果你已经有 `license.dat`，一般不需要激活授权，可以跳过本步。

    **在线激活系统**

    SX 引导页点左下 **Boot Custom FW**，以破解状态进入官方系统。开启网络，进相册，拿掉短接器，插回手柄，按 A 在线激活 TX 系统，激活完成后，关机，备份内存卡根目录的授权`license.dat` 文件。

9.  内存卡插入主机。短接设备，主机底部插入注入器，**按住音量 + 键后，按电源键启动设备**，进入 SX OS 引导页。

    - 此时，第一个图标上方会写着 **Emunand enabled**，表示授权通过，虚拟系统已激活。

    - 点左下 **Boot custom FW**，即可进入虚拟系统。

    - 进入相册，右上显示 **EMUNAND**，表示成功进入虚拟系统。

    - 此时，修改破解系统为**黑色主题**（便于区分），关闭自动升级软件。开启飞行模式，开启蓝牙以确保无线手柄可用。

10. 至此，系统主题方便区分进入的系统，可以畅玩了。

## SX OS 拥抱大气层

### 判断使用的是单系统还是虚拟系统

进入相册，查看右上角是否有 **EMUNAND**，有的话，是双系统，没有显示的话，则是单系统。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/switch/SX.jpg)

### 双系统拥抱大气层

1. 访问：[Switch 大气层 整合包下载页](https://shipengliang.com/games/%e5%a4%a7%e6%b0%94%e5%b1%82-atmosphere-%e6%9c%80%e6%96%b0%e7%89%88-%e5%8e%86%e5%8f%b2%e7%89%88-%e4%b8%8b%e8%bd%bd.html)，下载**最新版**的大气层整合包。
2. 将压缩包里的全部文件放到 TF 卡根目录，文件列表如下：

    ```sh
    atmosphere
    boot.dat
    bootloader
    exosphere.ini
    hbmenu.nro
    payload.bin
    switch
    ```

    **删除 switch 文件夹中的全部文件**，避免旧版插件兼容性问题造成系统启动异常。

3.  内存卡插回设备，像以往一样，按**音量 + **和**电源键**即可启动进入 Hekate 引导页。

4.  进入 Hekate 启动页后，点右侧的 **emuMMC**

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/switch/emuMMC.jpg)

5.  之后，点击 **Migrate emuMMC**

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/switch/Migrate-emuMMC.jpg)

6.  然后点击 **Emunand**，点 **Continue**，即可将文件形式的虚拟系统转换为大气层的虚拟系统。

7.  点击右上 **Close**，返回引导页，点击左侧的 **Launch**按钮

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/switch/launch.jpg)

8.  点击第一个 **虚拟系统** 即可进入虚拟系统。

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/switch/Launch4.jpg)

## USB 安装游戏

1. 下载所需文件：[DBI-最新版.rar](https://shipengliang.com/go/dbinro)

2. 将压缩包里的 **DBI.nro** 放到 TF 卡的 **switch 文件夹中**。插回主机后启动设备进入系统。

3.  桌面随便找个图标，**按住 R 键**启动图标，**进入高权限模式**，启动 DBI。(桌面没图标的就进入相册启动 DBI)

4. 使用 USB 数据线连接电脑和 Switch

5. 选择 **Run MTP responder**，按**A 键**确认，进入 MTP 模式。

    ```sh
    Main menu
    --------------------------------------------------------
    Browse SD Card # 浏览 SD 卡
    Install title from USB # 
    Browse installed applications # 浏览已安装的游戏
    Cleanup orphaned files # 清理孤立文件
    Browse tickets # 浏览游戏票
    Run MTP responder # 启动 MTP 响应器
    Exit #
    ```

<!-- 4. 耐心等待，稍待片刻，会加载成功：

5. 需要 **安装游戏到内存卡** ，选择第5项：**MicroSD install**。

6. 将游戏文件，拖拽到 **Place NSP, NSZ, XCI or XCZ files here**，即可自动安装。

    重点，一定一定一定要耐心等待进度条**走完并且消失**，之后按B或X键关闭MTP模式。 返回桌面即可发现已经装好的游戏图标。![](https://pic.shipengliang.com/wp-content/uploads/2021/10/DBI-%E6%B8%B8%E6%88%8F%E5%AE%89%E8%A3%85%E7%A4%BA%E6%84%8F%E5%9B%BE.jpg)

7. 卸载补丁(DLC)

    1.  相册启动DBI 或 按住R键启动个游戏进入高权限模式后启动DBI（**推荐**）。
    2.  进入**Browse installed applications**：

```
                                    Main menu------------------------------------------------------------------Browse SD CardInstall title from USBBrowse installed applicationsCleanup orphaned filesBrowse ticketsRun MTP responderExit
        
    3.  之后，会列出游戏列表：
        
                            Installed applications (1) sorted by name---------------------------------------------------------------------------[s|bu  ] Biped                                                    6.54 GB[s|bud ] Boomerrang Fu                                             702 MB---------------------------------------------------------------------------X - (de)select, Y - invert selection, (+) - menu, R -sorting, L3 - launch
        
        先说`[s|budl]`的意思，s表示有存档，b表示有本体，u表示有补丁，d表示有DLC，l表示有ticket。
        
        下面说一下底部操作按钮的意思：**X键**是选中或取消选中，**Y键**是反选，**+键**是调出菜单，**R键**是排序，**左摇杆按下**运行游戏。
        
    4.  按**A键**进入会显示类似下面的样子。选中要卸载的补丁或者DLC。
        
            游戏图片以及其他信息[ SD ] Appication     |  Version 0[ SD ] Update              |  Version 3[ SD ] AddOnContent (0001) |  Version 1[ SD ] AddOnContent (0002) |  Version 0------------------------------------------------------------------X - (de)select, Y - invert selection, (+) - menu, R -sorting, L3 - launch
        
    5.  按**+键**弹出的菜单如下：
        
            1 title (xxx.xx MB)Delete recordMove title to NANDReset required versionForce languageCheck integrityExpose contents via MTP
        
        这些菜单功能如下：
        
        *   Delete record 表示 删除对应本体、补丁或DLC
        *   Move record to NAND 表示 将本体、补丁或DLC移动到机身存储
        *   Reset required version 表示重置游戏当前系统要求版本
        *   Force language 表示强制指定游戏识别的系统语言，默认随系统语言展示游戏界面的可以通过这个选项强制成其他语言
        *   Check integrity 表示 检查完整性，一般很少用到，能玩儿就行了
        *   Expose contents via MTP 表示 暴露游戏数据（MTP模式可读），这功能没用过
    6.  选中Delete record后，按**A键**确认删除即可。
8.  ## 重置游戏所需系统版本
    
    1.  相册启动DBI 或 按住R键启动个游戏进入高权限模式后启动DBI（**推荐**）。
    2.  进入**Browse installed applications**：
        
                                    Main menu------------------------------------------------------------------Browse SD CardInstall title from USBBrowse installed applicationsCleanup orphaned filesBrowse ticketsRun MTP responderExit
        
    3.  之后，会列出游戏列表：
        
                            Installed applications (1) sorted by name---------------------------------------------------------------------------[s|bu  ] Biped                                                    6.54 GB[s|bud ] Boomerrang Fu                                             702 MB---------------------------------------------------------------------------X - (de)select, Y - invert selection, (+) - menu, R -sorting, L3 - launch
        
    4.  选中要重置版本要求的游戏后，按**+键**调出菜单：
        
            1 title (xxx.xx MB)Delete titleMove title to NANDReset required versionCheck integrityExpose contents via MTP
        
        这些菜单功能如下：
        
        *   Delete title 删除游戏
        *   Move title to NAND 移动游戏到机身存储
        *   Reset required version 重置游戏当前系统要求版本
        *   Check integrity 检查完整性
        *   Expose contents via MTP 表示 暴露游戏数据（MTP模式可读），这功能没用过
    5.  选中Reset required version后，按**A键**确认重置游戏运行版本即可。
    6.  重置完成后，按**Home键**返回到桌面。
        
                                    Reset required version------------------------------------------------------------------Curren required version: 196608Resetting required version to 0....[OK]Press B t o return
        
    7.  再次启动游戏，除了提示升级外，会出现运行的按钮，允许你直接运行低版本的游戏。
9.  ## TF卡安装游戏
    
    1.  相册启动DBI 或 按住R键启动个游戏进入高权限模式后启动DBI（**推荐**）。
    2.  进入**Browse SD Card**：
        
                                    Main menu------------------------------------------------------------------Browse SD CardInstall title from USBBrowse installed applicationsCleanup orphaned filesBrowse ticketsRun MTP responderExit
        
    3.  找到要安装的游戏文件，按A确认后安装即可。 -->


