function LoadTopBar(thisSite){
    console.log('topBarセット')
    var bar = document.getElementById('topBar');

    var elementLists = [
        {name: 'メイン',link: '/'},
        {name: '説明',link: '/explain'},
        {name: '見つける', link: '/find'},
        {name: '探す', link: '/search'},
        {name: '応募', link: '/oubo'},
        {name: '投票', link: '/vote'},
        {name: 'ランキング', link: '/rank'}
    ]
    
    for (var i = 0;i < elementLists.length;i ++){
        var newElement = document.createElement('a')
        newElement.href = elementLists[i].link
        newElement.innerText = elementLists[i].name
        newElement.style.width = (100 / elementLists.length) + '%'
        
        newElement.classList.add('top-bar-link')
        if(thisSite == elementLists[i].name){
            newElement.classList.add('bar-light')
        }
        bar.appendChild(newElement)
    }
}
