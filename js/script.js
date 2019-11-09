'use strict'
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink :Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink :Handlebars.compile(document.querySelector('#template-tag-Cloud-Link').innerHTML),
  authorsList :Handlebars.compile(document.querySelector('#template-Authors-List').innerHTML),
}

const opt = {
  articleSelector : '.post',
  titleSelector : '.post-title',
  titleListSelector : '.titles',
  articleTagsSelector : '.post-tags .list',
  articleAuthorSelector : '.post-author',
  tagListSelector : '.tags.list',
  cloudClassCount : 5,
  cloudClassPrefix : 'tag-size-',
  authorListSelector : '.authors.list',
};


const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event: ', event);

    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
      }
      /*[DONE] add class 'active' to the clicked link */
      console.log('clickedElement:', clickedElement);
      console.log('clickedElement witch plus: ' + clickedElement);
      clickedElement.classList.add('active');

      /*[DONE] remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('article');

      for(let activeArticle of activeArticles){
          activeArticle.classList.remove('active');
      }

      /*[DONE] get 'href' attribute from the clicked link */
      const articleSelector = clickedElement.getAttribute('href');
      console.log('articleSelector: ', articleSelector);

      /* [DONE]find the correct article using the selector (value of 'href' attribute) */
      const targetArticle = document.querySelector(articleSelector);
      console.log('targetArticle: ', targetArticle);

      /* [DONE]add class 'active' to the correct article */
      targetArticle.classList.add('active');
}


function generateTitleLinks(customSelector = ''){
  console.log('customSelector: ', customSelector);

  /* remove contents of titleList */
  const  titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = ''; /*Error*/
  console.log('titleList: ', titleList);
  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  console.log('articles; ',articles);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId: ', articleId );
    /* find the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
    console.log('articleTitle: ',articleTitle);
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('linkHTML: ', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
    console.log('let html:  ', html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log('links: ', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = { max:0, min:999999};
  for(let tag in tags){
    console.log(tag + ' is used '+ tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params
}

function calculateTagClass (count, params){
  const normalizedCount = count -params.min;
  const normalizedMax = params.max - params.min;
  const precentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( precentage * (opt.cloudClassCount - 1) + 1);
  return opt.cloudClassPrefix + classNumber;
}

function generateTags(){
  //create a new variable allTags with an empty arrays ->object
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const  ArticleTagSelector = article.querySelector(opt.articleTagsSelector);
    console.log('ArticleTagSelector: ', ArticleTagSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray:  ',articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log('tag: ', tag);
      /* generate HTML of the link */
       const linkHTMLData = {tag: tag};
       const linkHTML = templates.tagLink(linkHTMLData);
      console.log('linkHTML: ', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('let html:  ', html);
      //check if this link is not already in allTags
      if (!allTags.hasOwnProperty(tag)){// ! -negacja
        //add genareated code to allTags arrays ->object
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    ArticleTagSelector.innerHTML = html;
  /* END LOOP: for every article: */
  }
  //find list of tags in right column
  const tagList = document.querySelector('.tags');
  //add html rom allTags to tagList
  //create variable for all links HTML condimentum
  const tagsParams =calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);
  //let allTagsHTML = ' ';
  const allTagsData = {tags: []};
  //start loop: for each tag in allTagsHTML
  for(let tag in allTags){
    //generate code of a link and add it to allTagsHTML
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  //end loop for each tag in allTags
  }
  //add html from allTagsHTML to tagList
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData:  ',allTagsData);
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:  ',clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log('href: ', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags:  ', activeTags);
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
  console.log('activeTag: ', activeTag);
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks: ', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    console.log('tagLink: ', tagLink);
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const articleLinks = document. querySelectorAll ('a[href^="#tags"]');
  console.log('articleLinks: ', articleLinks);
  /* START LOOP: for each link */
  for (let articleLink of articleLinks){
    /* add tagClickHandler as event listener for that link */
    articleLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  //create a new variable allTags with empty object
  let allAuthors = {};
  //find all articles
  const articles = document.querySelectorAll(opt.articleSelector);
  //start loop: for every article
  for(let article of articles){
    //find author wrppers
    const articleAuthorSelector = article.querySelector(opt.articleAuthorSelector);
    console.log('articleAuthorSelector: ', articleAuthorSelector);
    //make html variable with empty string
    let html = '';
    //get author from data-author
    const articleAuthor = article.getAttribute('data-author');
    console.log('atricleAuthor: ', articleAuthor);
    //generate HTML of the links
    const linkHTMLData = {articleAuthor: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    //add generated code to html variable
    html = html + linkHTML
    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors.hasOwnProperty(articleAuthor)){// ! -negacja
        //add genareated code to allTags arrays ->object
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
    //insert HTML of the authors into the articles
    articleAuthorSelector.innerHTML = html;
  //end loop for every article
  }
  //find list of authors in right column
const authorList = document.querySelector('.authors');
//create variable for all links HTML condimentum
const tagsParams =calculateTagsParams(allAuthors);
console.log('tagsParams: ', tagsParams);
const allTagsData = {tags: []};
//start loop: for each author in allAuthors
for(let author in allAuthors){
  //generate code of a link and add it to allAuthorsHTML
  allTagsData.tags.push({
    authorName: author,
    numberOfArticles: allAuthors[author]
  })
//end loop for each tag in allTags
}
//add html from allAuthorsHTML to tagList
authorList.innerHTML = templates.authorsList(allTagsData);
}

generateAuthors();

function authorClickHandler(event){
  //prevent default action for this addEventListener
  event.preventDefault();
  //make new constatn namen "clickElement" and give it the value of "this"
  const clickElement = this;
  // make a new constatn "href" and read the attribute "href" of the clicled element
  const href = clickElement.getAttribute('href');
  //make new constatn "author" and extract author from the "href" constatn
  const author = href.replace('#author-', '');
  console.log('author: ', author);
  //find all author links with class active
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]')
  //start loop for each active author link
  for(let activeAuthor of activeAuthors){
  console.log('activeAuthor: ', activeAuthor);
    //remove class active
    activeAuthor.classList.remove('active');
  //end loop for each active author link
  }
  //find all author links with "href" attribute equal to the "href" constant
  const authorLinks = document.querySelectorAll('a[href^="' + href +'"]');
  console.log('authorLinks: ', authorLinks);
  //start loop for each found author link
  for(let authorLink of authorLinks){
  console.log('authorLink: ', authorLink);
      //add class active
      authorLink.classList.add('active');
  //end loop for each found author link
}
  //execute function "generateAuthors" with article selector as argument
generateTitleLinks ('[data-author="'+ author +'"]');
}

function addClickListenersToAuthors(){
  //find all links to Authors
  const articleLinks = document. querySelectorAll ('a[href^="#author"]');
  console.log('articleLinks:  ', articleLinks);
  //start loop for each link
  for (let articleLink of articleLinks){
    //add tagClickHandler as event listener for that link
    articleLink.addEventListener('click', authorClickHandler);
  //end loop for each link
  }
}

addClickListenersToAuthors();
