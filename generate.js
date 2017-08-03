const { exec } = require('child_process');
const fs = require('fs');

const head = "convert linus.gif -coalesce -gravity south -font WenQuanYi-Zen-Hei -pointsize 80 -fill '#FFFF' -stroke '#0008' ";
const tail = " -layers OptimizeFrame ";

function generate(text, filename, success) {
	var center = "";
	for (var i = 8; i < 25; i++) {
		center += "\\( -clone " + i + " -annotate 0 '" + text + "' \\) -swap " + i + " +delete ";
	}
	for (var i = 25; i < 60; i++) {
		center += "\\( -clone " + i + " -annotate 0 'Fuck You!' \\) -swap " + i + " +delete ";
	}

	exec(head + center + tail + "'" + filename + "'", (err, stdout, stderr) => {
		if (err) {
			console.log(`run command failed: ` + err);
			return;
		}
		success(filename);
	});
}

function getOrGenerate(text, success=function (filename){}) {
	text = text.replace(/[\/\\'"]/g, "");
	const filename = "generated/" + text + ".gif";

	fs.stat(filename, function(err, stat) {
		if(err == null) {
			success(filename);
		} else if(err.code == 'ENOENT') {
			generate(text, filename, success);
		} else {
			console.log('An error occurred: ', err.code);
		}
	});
}

exports.getOrGenerate = getOrGenerate
