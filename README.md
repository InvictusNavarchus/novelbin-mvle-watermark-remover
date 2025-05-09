# Novelbin - My Virtual Library Watermark Remover
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Version](https://img.shields.io/badge/Version-0.1.5-blue.svg)

A simple userscript that automatically removes sentences containing "My Virtual Library" watermarks/ads from [Novelbin](https://novelbin.me) novel pages.

## ✨ Features

- Automatically detects and removes paragraphs containing "My Virtual Library" texts
- Works on all Novelbin domains (novelbin.me, novelbin.net, novelbin.com, novelbin.io)
- Handles dynamically loaded content
- Lightweight and efficient with minimal performance impact

## 📋 Requirements

- A userscript manager:
  - [Tampermonkey](https://www.tampermonkey.net/) (recommended)
  - [Violentmonkey](https://violentmonkey.github.io/)
  - [Greasemonkey](https://www.greasespot.net/)

## 🔧 Installation

### Option 1: One-click Install
Click one of the links below to install directly (requires a userscript manager):

- [Install from GitHub](https://raw.githubusercontent.com/InvictusNavarchus/novelbin-mvle-watermark-remover/master/novelbin-mvle-watermark-remover.user.js)

### Option 2: Manual Installation

1. Copy the content of the [userscript file](https://github.com/InvictusNavarchus/novelbin-mvle-watermark-remover/blob/master/novelbin-mvle-watermark-remover.user.js)
2. Open your userscript manager dashboard
3. Create a new script and paste the copied content
4. Save the script

## 🚀 Usage

Once installed, the script will automatically run on any Novelbin page. It will:

1. Remove watermark sentences when the page loads
2. Continue monitoring for dynamically added content to remove watermarks
3. Perform periodic checks to catch any missed watermarks

No configuration necessary - just install and enjoy clean, watermark-free reading!

## 🔍 How It Works

The script:
1. Scans paragraphs for the text "My Virtual Library"
2. Removes matching paragraphs from the DOM
3. Uses a MutationObserver to detect when new content is added
4. Periodically rescans to ensure complete removal

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

