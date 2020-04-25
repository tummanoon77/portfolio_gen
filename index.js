const inquirer = require("inquirer")
const axios = require("axios")
const fs = require("fs")

const createTag =(tagName, str) =>{
    return `<${tagName}>${str}</${tagName}>`
};

const createATag =(url, str) =>{
    return `<a href =${url}>${str}</a>`
};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name"
    }
    ,
    {
      type: "input",
      message:"What is your Github username?" ,
      name: "gitHubName"
    },
    {
      type: "input",
      message: "What is your location?"   ,
      name: "location"
    },
    {
        type: "input",
        message: "What is your linkedInUrl?"   ,
        name: "linkedInUrl"
      },
      {
        type: "input",
        message: "What is your short bio?"   ,
        name: "bio"
      }

  ]).then(response =>{
      const gitHubUrl = `https://github.com/${response.gitHubName}`;
      let html = `
      <html>
      <head>
          <title>${response.name}'s Portfolio </title>
      </head>
      <body>
     
    ` ;
    //adding location to html
    const locationSubHeader = createTag("h6",`location: ${response.location}`);
    html += locationSubHeader;


        const bioDiv = createTag("div", response.bio);
        html += bioDiv;
// adds the header to the html string
      const  header = createTag("h1", `${response.name}'s Portfolio`);
      html += header;

      const gitHubAnchor = createATag(gitHubUrl, "My Github");
      const liGithub = createTag("li", gitHubAnchor);

      const linkedInAnchor = createATag(response.linkedInUrl, "My LinkendIn");
      const liLinkendIn = createTag("li",linkedInAnchor);

      const links = liGithub + liLinkendIn ;
      const imortantLinksUl =createTag("ul", links);
      html += imortantLinksUl;

      
      html +=`
      </body>
      </html>    
      `;
      console.log(html);

      fs.writeFile("index.html", html , err =>{
          if(err){
              return console.log (err)
          }
          console.log("success")
      })
  }); 