import { HTTPContext, logger, Xerus } from "xerus/xerus";

function root(title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body>
      ${content}
      <script src='/static/gridkid.js'></script>
    </body>
    </html>
  `
}

let app = new Xerus()

app.use(logger)

app.get("/static/*", async (c: HTTPContext) => {
  return await c.file("." + c.path);
})

app.get('/', async (c: HTTPContext) => {
  return c.html(root('gridkid - css grid made easy', `
    <header>
      <grid-kid at-default='
        "title"
        "sub"
      ' at-500='
        "sub"
        "title"
      ' at-1024='
        "title"
        "sub"
      '></grid-kid>
      <h1 area='title'>gridkid</h1>
      <p area='sub'>gridkid</p>
    </header>  
  `))
})

await app.listen()