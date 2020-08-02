var showdown = require('showdown');
var fs = require('fs');
let pageTitle = process.argv[2] || ""
var newFileSplit = pageTitle.split(".")[0];

fs.readFile(__dirname + '/style.css', function (err, styleData) {
  fs.readFile(process.cwd() + '/' + pageTitle, function (err, data) {
    if (err) {
      throw err;
    }
    let text = data.toString();

    converter = new showdown.Converter({
      ghCompatibleHeaderId: true,
      simpleLineBreaks: true,
      ghMentions: true,
      tables: true
    });

    let preContent = `
    <html>
      <head>
        <title>` + "Jeffrey Ho" + `</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id='content'>
    `

    let postContent = `

        </div>
        <style type='text/css'>` + styleData + `</style>
      </body>
    </html>`;

    html = preContent + converter.makeHtml(text) + postContent

    converter.setFlavor('github');
    console.log(html);

    let filePath = process.cwd() + "/" + newFileSplit + ".html";
    fs.writeFile(filePath, html, { flag: "wx" }, function (err) {
      if (err) {
        console.log("File '" + filePath + "' already exists. Aborted!");
      } else {
        console.log("Done, saved to " + filePath);
      }
    });
  });
});
