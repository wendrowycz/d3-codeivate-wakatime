<?php
require_once("vendor/autoload.php");
use GuzzleHttp\Client as Guzzle;
use Mabasic\WakaTime\WakaTime;

const API_SECRET = 'your_secret_api'; // get from https://wakatime.com/settings

header('Content-Type: application/json');
echo getJSON();

function getJSON() {

    $cacheFile = 'cache_'.md5('waka');
    if (file_exists($cacheFile)) {
        $f = fopen($cacheFile,'r');
        $cacheTime = trim(fgets($f));

        if ($cacheTime > strtotime('-20 seconds')) {
            return fgets($f);
        }

        fclose($f);
        unlink($cacheFile);
    }

    $wakaTime = new WakaTime(new Guzzle());
    $wakaTime->setApiKey(API_SECRET);


    $user = $wakaTime->currentUser();
    $daily = $wakaTime->dailySummary(date('Y-m-d'), date('Y-m-d'));
    $ret = array();
    if (isset($user['data'])) {
        $ret['user'] = $user['data'];
    } else {
        $ret['user'] = array();
    }

    if (isset($daily['data'])) {
        $ret['daily'] = $daily['data'][0];
    } else {
        $ret['daily'] = array();
    }
    $json = json_encode($ret);
    $f = fopen($cacheFile, 'w');
    fwrite($f, time() . "\n");
    fwrite($f, $json);
    fclose($f);

    return $json;
}