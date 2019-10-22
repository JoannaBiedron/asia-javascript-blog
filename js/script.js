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

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
/*console.log('optArticleSelector', optArticleSelector);
console.log('optTitleSelector',optTitleSelector);
console.log('optTitleListSelector', optTitleListSelector);*/

function generateTitleLinks(){

  /* remove contents of titleList */
  /*const  titleList = document.querySelector(optTitleListSelector).innerHTML= '';
  console.log('titleList: ', titleList);*/

  const  titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList: ', titleList);



  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
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
