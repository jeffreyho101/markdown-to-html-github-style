var showdown = require("showdown");
var fs = require("fs");
let pageTitle = process.argv[2] || "";
var newFileSplit = pageTitle.split(".")[0];

fs.readFile(__dirname + "/style.css", function (err, styleData) {
  fs.readFile(process.cwd() + "/" + pageTitle, function (err, data) {
    if (err) {
      throw err;
    }
    let text = data.toString();

    converter = new showdown.Converter({
      ghCompatibleHeaderId: true,
      simpleLineBreaks: true,
      ghMentions: true,
      tables: true,
    });

    let preContent =
      `
      <html>
        <head>
          <title>` +
      "Jeffrey Ho" +
      `</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- navbar -->
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
          <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

          <!-- FontAwesome icon import -->
          <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <div class = "container">
            <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
              <div>
                <a class="navbar-brand" href="#">Jeffrey Ho</a>
              </div>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="nav navbar-nav ml-auto" style="float: right;">
                    <a class="nav-item nav-link" data-toggle="collapse" data-target=".navbar-collapse" href="#about">About</a>
                    <a class="nav-item nav-link" data-toggle="collapse" data-target=".navbar-collapse" href="#experience">Experience</a>
                    <a class="nav-item nav-link" data-toggle="collapse" data-target=".navbar-collapse" href="#coursework">Coursework</a>
                    <a class="nav-item nav-link" data-toggle="collapse" data-target=".navbar-collapse" href="#cv">CV</a>
                </div>
              </div>
            </nav>
          </div>
        </head>
        <body>
          <div id='content'>
    `;

    let postContent =
      `
        </div>
        <style type='text/css'>` +
      styleData +
      `</style>
      </body>
    </html>`;

    html = preContent + converter.makeHtml(text) + postContent;

    converter.setFlavor("github");
    // console.log(html);

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
