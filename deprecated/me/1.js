function f() {
  console.log('f')
}
## 換電腦時一個指令安裝所有軟體 - brew bundle [#](https://jason-memo.dev/posts/my-mac-setting/#%E8%AE%93%E4%BD%A0%E7%9A%84%E6%A1%8C%E9%9D%A2%E9%87%8D%E8%A6%8B%E5%A4%A9%E6%97%A5---%E6%A1%8C%E9%9D%A2%E5%95%9F%E7%94%A8%E5%A0%86%E7%96%8A#%E6%8F%9B%E9%9B%BB%E8%85%A6%E6%99%82%E4%B8%80%E5%80%8B%E6%8C%87%E4%BB%A4%E5%AE%89%E8%A3%9D%E6%89%80%E6%9C%89%E8%BB%9F%E9%AB%94---brew-bundle)

brew 一直是 Mac 安裝 command line 的軟體首選，brew 也提供 `brew install --cask APP` 去安裝 App，透過 `brew tap homebrew/cask-fonts` 就可以安裝各種字型

在 terminal 安裝 homebrew 的方式

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

一直以來換電腦的時候重新安裝軟體都是頗花時間的過程，brew 其實有提供一個指令可以備份你裝過的軟體清單。

```bash
brew bundle dump --describe
```

跑完這個指令會生成一個 `Brewfile`，裡面會列出 brew 安裝過的 command line 軟體和 App

```ruby
# 'brew tap'tap "homebrew/cask"# 'brew tap' with custom Git URLtap "user/tap-repo", "https://user@bitbucket.org/user/homebrew-tap-repo.git"# 'brew tap' with argumentstap "user/tap-repo", "https://user@bitbucket.org/user/homebrew-tap-repo.git", force_auto_update: true# set arguments for all 'brew install --cask' commandscask_args appdir: "~/Applications", require_sha: true# 'brew install'brew "imagemagick"# 'brew install --with-rmtp', 'brew services restart' on version changesbrew "denji/nginx/nginx-full", args: ["with-rmtp"], restart_service: :changed# 'brew install', always 'brew services restart', 'brew link', 'brew unlink mysql' (if it is installed)brew "mysql@5.6", restart_service: true, link: true, conflicts_with: ["mysql"]# install only on specified OSbrew "gnupg" if OS.mac?brew "glibc" if OS.linux?# 'brew install --cask'cask "google-chrome"# 'brew install --cask --appdir=~/my-apps/Applications'cask "firefox", args: { appdir: "~/my-apps/Applications" }# bypass Gatekeeper protections (NOT RECOMMENDED)cask "firefox", args: { no_quarantine: true }# always upgrade auto-updated or unversioned cask to latest version even if already installedcask "opera", greedy: true# 'brew install --cask' only if '/usr/libexec/java_home --failfast' failscask "java" unless system "/usr/libexec/java_home --failfast"# 'mas install'mas "1Password", id: 443987910# 'whalebrew install'whalebrew "whalebrew/wget"
```

把這個檔案轉移到新電腦，並執行

```bash
brew bundle install
```

brew 就會重新安裝 `Brewfile` 裡面所有列出的 command line 軟體和 App，因此即使你可以從官網或 App Store 上安裝 App，我也推薦你用 `brew install APP --cask` 安裝，為的就是之後換電腦重新安裝更為方便快速。

網站：[https://brew.sh/](https://brew.sh/)

brew bundle：[https://github.com/Homebrew/homebrew-bundle](https://github.com/Homebrew/homebrew-bundle)



![11](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/11.png)

crate a picture:super cute man, Popmart style, Disney style::4, Pixar style::4, black hair, big eyes, glasses, happy face, young man face, 25 years old look, pastel color, clean background, fine luster::3, soft light, 3D render, Soft focus, o blender, IP. best quality. 8k - ar 1:1, --V 5

// 1
