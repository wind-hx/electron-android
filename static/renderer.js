(() => {
    const electron = require('electron');
    // node内置模块 不需要远程调用
    const process = require('child_process');
    // 非node原生模块 需要通过electron 进行远程调用加载
    const remote = electron.remote;
    const schedule = remote.require('node-schedule');
    const adbkit = remote.require('adbkit');
    const client = adbkit.createClient()

    function exec(str, callback) {
        process.exec(str, callback);
    }

    function execSync(str) {
        return new Promise((resolve, reject) => {
            process.exec(str, (error, stdout, stderr) => {
                if (error !== null) {
                    resolve({error: error});
                    return;
                }
                resolve({stdout: stdout, stderr: stderr});
            });
        });
    }

    function checkConnectionTask(callback) {
        console.log("checkConnectionTask");
        var rule = new schedule.RecurrenceRule();
        var times = [];
        for(var i = 1; i < 60; i++){
        　　times.push(i);
        }
        rule.second = times;
        schedule.scheduleJob(rule, async () => {
            let result = await client.listDevices();
            if (result !== null && result !== undefined) {
                callback(result);
            }
        });
    }

    function screencapTask(serial, callback) {
        console.log("screencapTask");
        var rule = new schedule.RecurrenceRule();
        var times = [];
        for(var i = 1; i < 60; i++){
        　　times.push(i);
        }
        rule.second = times;
        schedule.scheduleJob(rule, async () => {
            client.screencap(serial, callback);
        });
        
    }

    let remoteApi = {
        exec: exec,
        execSync: execSync,
        checkConnectionTask: checkConnectionTask,
        screencapTask: screencapTask
    }

    global.remoteApi = remoteApi;
})()