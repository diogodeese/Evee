<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="assets/evee.png" alt="Logo" width="80" height="80">

  <h3 align="center">Evee Discord Bot</h3>
  
  <!-- PROJECT SHIELDS -->
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

  <p align="center">
    Evee is an awesome discord bot made to cover all the needs in discord community such as fun, music and management!
    <br />
    <br />
    <a href="https://github.com/diogodeese/Evee/issues">Report Bug</a>
    ·
    <a href="https://discord.com/api/oauth2/authorize?client_id=775530325572976640&permissions=8&scope=bot">Invite Evee to your Server</a>
    ·
    <a href="https://github.com/diogodeese/Evee/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#license">License</a>
    </li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

There are many great Discord Bots that have really cool features; however, we didn't find one that covered all of our needs so we started to develop Evee in order to just have 1 bot on our server that can do what would take 5 bots to do.

Why should you add Evee to your Discord server? Here's why:
* With Evee you can request a feature that you find really cool and we will implement it
* Why have a lot of bots with different commands and prefix when you can have just one that does everything



<!-- BUILT WITH -->
### Built With

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Discord JS](https://discord.js.org/)


<!-- GETTING STARTED -->
## Getting Started

In case you want to run this code on your computer make sure you follow this guide in the right order and everything should work just fine.


<!-- PREREQUISITES -->
### Prerequisites

Install 
Make sure to install Node.js version 16.6 or higher, and Discord JS version 13. After installing Node.js you can install Discord v13 by running the appropriate command in your terminal or command prompt.

Discord JS

```
npm install discord.js
```


<!-- INSTALLATION -->
### Installation

_This are the steps you must follow in order to make your bot work in your computer._

1. Clone the repository
   ```
   git clone git@github.com:diogodeese/Evee.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Create and config the `.env` file   
   ```
   TOKEN=<Bot Token Here>
   GUILD_ID=<Your Guild ID>
   ENV=production
   ```
Only use `ENV` variable equals to `production` when you intend to deploy the commands to all the servers that the bot are in, otherwise leave it blank. If you are editing and testing new features with the bot **DO NOT** assign the variable to `production`.  

<!-- LICENSE -->
## License

Distributed under the GNU GPLv3 License. See `LICENSE.txt` for more information.


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/diogodeese/Evee.svg?style=for-the-badge
[contributors-url]: https://github.com/diogodeese/Evee/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/diogodeese/Evee.svg?style=for-the-badge
[forks-url]: https://github.com/diogodeese/Evee/network/members
[stars-shield]: https://img.shields.io/github/stars/diogodeese/Evee.svg?style=for-the-badge
[stars-url]: https://github.com/diogodeese/Evee/stargazers
[issues-shield]: https://img.shields.io/github/issues/diogodeese/Evee.svg?style=for-the-badge
[issues-url]: https://github.com/diogodeese/Evee/issues
[license-shield]: https://img.shields.io/github/license/diogodeese/Evee.svg?style=for-the-badge
[license-url]: https://github.com/diogodeese/Evee/blob/main/LICENSE
