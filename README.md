# d3-codeivate-wakatime
**API Implementation Codeivate and WakaTime**

API Implementation Codeivate and WakaTime to present statistics on website

## Instalation

- Clone the repo: `git clone https://github.com/wendrowycz/d3-codeivate-wakatime.git`
- Run composer: `coposer install` for install dependecies

## Setup

You must set [API_SECRET](https://wakatime.com/settings) in file ```waka_api.php```

```php
const API_SECRET = 'your_secret_api';
```

and set the correct URL in file `js/codeivate.js`

```javascript
$.getJSON('https://codeivate.com/users/bgrzesiak.json?callback=?', 
      function data(data){
      ...
    });
    
```

**and enjoy :)**
