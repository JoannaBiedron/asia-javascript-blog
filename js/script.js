'use strict'
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/



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



const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagListSelector = '.tags.list';
//console.log('optArticleAuthorSelector: ', optArticleAuthorSelector);
/*console.log('optArticleSelector', optArticleSelector);
console.log('optTitleSelector',optTitleSelector);
console.log('optTitleListSelector', optTitleListSelector);*/

function generateTitleLinks(customSelector = ''){
  console.log('customSelector: ', customSelector);

  /* remove contents of titleList */
  /*const  titleList = document.querySelector(optTitleListSelector).innerHTML= '';
  console.log('titleList: ', titleList);*/

  const  titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ''; /*Error*/
  console.log('titleList: ', titleList);



  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles; ',articles);

  let html = '';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId: ', articleId );

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle: ',articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle +'</span></a></li>';
    console.log('linkHTML: ', linkHTML);

    /* insert link into titleList */
    /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/
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


function generateTags(){
  //create a new variable allTags with an empty arrays ->object
  //let allTags = [];
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const  ArticleTagSelector = article.querySelector(optArticleTagsSelector);
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
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>  ';
      console.log('linkHTML: ', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('let html:  ', html);
      //check if this link is not already in allTags
       //if(allTags.indexOf(linkHTML) == -1){
      if (!allTags.hasOwnProperty(tag)){// ! -negacja
        //add genareated code to allTags arrays ->object
        //allTags.push(linkHTML);
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
  //tagList.innerHTML = allTags.join(' ');
console.log('allTags:', allTags);
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
  const articleLinks = document. querySelectorAll ('.post-tags a');
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
  //find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  //start loop: for every article
  for(let article of articles){
    //find author wrppers
    const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);
    console.log('articleAuthorSelector: ', articleAuthorSelector);
    //make html variable with empty string
    let html = '';
    //get author from data-author
    const articleAuthor = article.getAttribute('data-author');
    console.log('atricleAuthor: ', articleAuthor);
    //generate HTML of the links
  //  const linkHTML = '<p class="post-author">' + articleAuthor +'</p>'
    const linkHTML = '<a href="#author-' + articleAuthor +'"> ' +articleAuthor + '</a>';
    //add generated code to html variable
    html = html + linkHTML
    //insert HTML of the authors into the articles
    articleAuthorSelector.innerHTML = html
  //end loop for every article
  }
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
