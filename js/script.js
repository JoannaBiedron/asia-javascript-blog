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
}


generateTitleLinks();
const links = document.querySelectorAll('.titles a');
console.log('links: ', links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
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
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    ArticleTagSelector.innerHTML = html;
  /* END LOOP: for every article: */
  }
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

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
