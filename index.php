<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Codeivate API example</title>
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/css/bootstrap-theme.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body role="document">
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Codeivate API example</a>

            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/index.php">Codeivate</a></li>
                    <li><a href="/waka.php">WakaTime</a></li>
                </ul>
            </div>
        </div>

    </div>
</nav>
<div class="container theme-showcase" role="main">
    <div class="jumbotron">
        <div class="row">
            <h1 class="col-md-6 pull-left">Level: <span class="level"></span></h1>
            <span class="programming pull-right label col-md-6 "></span>
        </div>
        <div>
            <svg class="chart"></svg>
        </div>
    </div>
    <div class="page-header">
        <h1>Alignment</h1>
    </div>
    <div class="svgs"></div>

    <div class="text-center">
        <div class="page-header text-left">
            <h2>Major languages</h2>
        </div>
        <svg class="major-languages"></svg>
    </div>
    <div class="text-center">
        <div class="page-header text-left">
            <h2>Languages</h2>
        </div>
        <svg class="minor-languages"></svg>
    </div>
</div>

<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
<script src="vendor/twbs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="js/d3.v3.min.js" language="JavaScript"></script>
<script src="js/liquidFillGauage.js" language="JavaScript"></script>
<script src="js/functions.js" type="text/javascript"></script>
<script src="js/codeivate.js" type="text/javascript"></script>

</body>
</html>